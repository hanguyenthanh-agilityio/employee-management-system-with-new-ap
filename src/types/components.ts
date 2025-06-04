export type CustomClassType = {
  customClass?: string;
};

export type PageErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type LeaveItem = {
  documentId: string;
  startDate: string;
  endDate: string;
  employeeName: string;
  type: string;
  reason: string;
  durations: number;
  status: string;
  resumptionDate: string;
};

export type LeaveApplication = {
  data: LeaveItem[];
  meta: {
    limit: number;
    page: number;
    totalCount: number;
  };
};

export type CreateLeavePayload = {
  documentId: string;
  startDate: string;
  endDate: string;
  resumptionDate: string;
  employeeName?: string;
  type: string;
  reliefOfficer?: string | null;
  documentPath?: string | null;
  reason: string;
  durations: number;
  reliefOfficerFirstName?: string | null;
  reliefOfficerLastName?: string | null;
  status?: 'Pending' | 'Approved' | 'Rejected';
  recallStatus?: 'Pending' | 'Approved' | 'Rejected';
  recallReason?: string | null;
  recallDate?: string | null;
  isRecalled?: boolean;
  daysRemaining?: number | null;
  createdAt?: string;
  updatedAt?: string;
};
