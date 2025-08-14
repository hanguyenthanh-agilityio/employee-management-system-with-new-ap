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
}: ProgressBarProps) => {
  const clampedTotal = Math.min(Math.max(total, 0), 100);

  return (
    <div className="w-full">
      {/* Label row */}
      <div className="flex justify-between items-center text-base sm:text-lg md:text-xl font-medium text-cyanBlue mb-2">
        <span>{type}</span>
        <span>{total} day(s)</span>
      </div>

      {/* Progress bar container */}
      <div
        className="relative w-full h-4 sm:h-5 md:h-6 bg-veryLightGray rounded-full overflow-hidden"
        role="progressbar"
        aria-label={`Progress for ${type}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clampedTotal}
      >
        {/* Progress fill */}
        <div
          className="absolute inset-0 h-full transition-all duration-300"
          style={{
            width: `${clampedTotal}%`,
            backgroundColor: color,
            borderRadius: 'inherit',
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
