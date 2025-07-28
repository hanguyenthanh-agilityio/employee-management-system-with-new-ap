interface TableProps {
  headers: string[];
  rows: (string | number)[][];
}

const Table = ({ headers, rows }: TableProps) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[500px] text-left text-cyanBlue border-separate border-spacing-y-3 text-sm sm:text-base">
      <thead className="bg-[#E3EDF9] h-[60px]">
        <tr>
          {headers.map((head, index) => (
            <th
              key={index}
              scope="col"
              className="px-4 py-3 font-semibold text-cyanBlue whitespace-nowrap"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr
            key={idx}
            className="bg-[#E3EDF9] border-b border-white rounded-[10px] h-[60px]"
          >
            {row.map((cell, index) => (
              <td key={index} className="px-4 py-3 whitespace-nowrap">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
