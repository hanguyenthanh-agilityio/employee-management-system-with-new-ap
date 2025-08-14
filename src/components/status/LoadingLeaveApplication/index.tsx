const LoadingLeaveApplication = () => (
  <div className="p-6 md:p-8">
    {/* Leave History Table */}
    <div className="mt-10 p-4">
      <LeaveHistorySkeleton />
    </div>
  </div>
);

export default LoadingLeaveApplication;

export const SectionTitleSkeleton = () => (
  <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse" />
);

export const LeaveCardSkeleton = () => (
  <div className="h-32 w-48 rounded-xl bg-white shadow animate-pulse p-4 flex flex-col items-center justify-center space-y-2">
    <div className="h-10 w-10 bg-gray-300 rounded-full" />
    <div className="h-4 w-24 bg-gray-200 rounded" />
    <div className="h-8 w-20 bg-yellow-400 rounded-lg" />
  </div>
);

export const LeaveHistorySkeleton = () => (
  <div className="space-y-4">
    <div className="h-6 w-32 bg-gray-300 rounded animate-pulse" />
    <div
      className="overflow-x-auto"
      role="region"
      aria-label="Scrollable table"
      tabIndex={0}
    >
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            {Array.from({ length: 7 }).map((_, idx) => (
              <th key={idx} className="p-2 text-left">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 3 }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {Array.from({ length: 7 }).map((_, colIdx) => (
                <td key={colIdx} className="p-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
