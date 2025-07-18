import {
  addDays,
  differenceInDays,
  isBefore,
  parseISO,
  startOfDay,
} from 'date-fns';
import { z } from 'zod';

export const leaveApplicationSchema = z
  .object({
    users_permissions_user: z.number().optional(),
    employeeName: z.string().optional(),
    type: z.string().min(1, 'Leave type is required'),
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in yyyy-mm-dd format'),
    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in yyyy-mm-dd format'),
    durations: z.coerce.number().min(1, 'Duration must be at least 1'),
    resumptionDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        'Resumption date must be in yyyy-mm-dd format',
      ),
    reason: z.string().min(1, 'Reason is required'),
    document: z.any().optional(),
  })
  .refine(
    (data) => {
      const today = startOfDay(new Date());
      const start = startOfDay(parseISO(data.startDate));
      const end = startOfDay(parseISO(data.endDate));

      return !isBefore(start, today) && !isBefore(end, today);
    },
    {
      message: 'Start and end dates must be today or in the future',
      path: ['startDate'],
    },
  )
  .refine(
    (data) => {
      const start = parseISO(data.startDate);
      const end = parseISO(data.endDate);

      return !isBefore(end, start);
    },
    {
      message: 'End date must be greater than or equal to start date',
      path: ['endDate'],
    },
  )
  .refine(
    (data) => {
      const start = parseISO(data.startDate);
      const end = parseISO(data.endDate);
      const expected = differenceInDays(end, start) + 1;
      return expected === data.durations;
    },
    {
      message: 'Duration must match the date range',
      path: ['durations'],
    },
  )
  .refine(
    (data) => {
      const end = parseISO(data.endDate);
      const resumption = parseISO(data.resumptionDate);
      return +resumption === +addDays(end, 1);
    },
    {
      message: 'Resumption date must be the day after end date',
      path: ['resumptionDate'],
    },
  );

export type LeaveApplicationInput = z.infer<typeof leaveApplicationSchema>;
