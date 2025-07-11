import colors from '@/themes/colors';

interface ProgressBarProps {
  type: string;
  total: number;
  color?: string;
}

const ProgressBar = ({
  type,
  total,
  color = colors.primary,
}: ProgressBarProps) => (
  <div>
    <div className="flex justify-between items-center text-xl text-cyanBlue mb-2">
      <span>{type}</span>
      <span>{total} day(s)</span>
    </div>
    <div className="w-full bg-veryLightGray h-7 rounded">
      <div
        className="h-7 rounded"
        style={{
          width: `${total}%`,
          backgroundColor: color,
        }}
      />
    </div>
  </div>
);

export default ProgressBar;
