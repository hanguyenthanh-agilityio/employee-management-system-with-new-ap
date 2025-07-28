interface LeaveCardProps {
  title: string;
  days: number;
  onClick?: () => void;
}

const LeaveCard = ({ title, days, onClick }: LeaveCardProps) => {
  const handleOnkeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };
  return (
    <div
      data-testid="leave-card"
      role="button"
      tabIndex={0}
      className="min-w-[250px] sm:min-w-[280px] md:min-w-[350px] bg-blue-900 text-white rounded-xl p-4 flex items-center gap-4 shadow transition hover:scale-105 hover:z-10 cursor-pointer"
      onClick={onClick}
      onKeyDown={handleOnkeyDown}
    >
      <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full bg-white text-blue-900 text-4xl font-bold flex items-center justify-center shrink-0">
        {days}
      </div>
      <div className="flex flex-col flex-1">
        <div className="text-base md:text-lg font-medium truncate pb-2 text-center truncate w-[140px]">
          {title}
        </div>
        <span className="!bg-[#FFC20E] text-[#000] hover:bg-yellow text-sm md:text-base font-bold justify-center px-1 md:px-6 py-1 rounded-full bg-yellow-400 text-black text-center">
          Apply
        </span>
      </div>
    </div>
  );
};

export default LeaveCard;
