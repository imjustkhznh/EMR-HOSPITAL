// Skeleton loading UI for patients list
export default function PatientsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-10 w-64 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="px-6 py-4">
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
