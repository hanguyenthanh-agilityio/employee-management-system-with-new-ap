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
  <div className="w-full">
    <div className="flex justify-between items-center text-base sm:text-lg md:text-xl text-cyanBlue mb-1.5">
      <span>{type}</span>
      <span>{total} day(s)</span>
    </div>

    <div
      className="w-full h-5 sm:h-6 md:h-7 bg-veryLightGray rounded"
      role="progressbar"
      aria-label={`Progress for ${type}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={total}
    >
      <div
        className="h-full rounded transition-all duration-300"
        style={{
          width: `${total}%`,
          backgroundColor: color,
        }}
      />
    </div>
  </div>
);

export default ProgressBar;
