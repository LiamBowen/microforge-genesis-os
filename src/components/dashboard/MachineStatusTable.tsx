
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MachineStatusTable = () => {
  const machineStatus = [
    ["🖨️", "ForgeBot-01", "3D Printer", "Running", "72%", "Housing Shell - v2"],
    ["⚙️", "CNC-Master", "CNC Router", "Idle", "–", "–"],
    ["🔬", "LaserCutter-X", "Laser Cutter", "Error", "–", "Alignment Fault"],
  ];

  return (
    <Card className="bg-dark-card border-gray-800">
      <CardHeader>
        <CardTitle>Live Machine Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="p-3 font-medium text-gray-300">Icon</th>
                <th className="p-3 font-medium text-gray-300">Machine</th>
                <th className="p-3 font-medium text-gray-300">Type</th>
                <th className="p-3 font-medium text-gray-300">Status</th>
                <th className="p-3 font-medium text-gray-300">Progress</th>
                <th className="p-3 font-medium text-gray-300">Current Job</th>
              </tr>
            </thead>
            <tbody>
              {machineStatus.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="border-b border-gray-800 last:border-0"
                >
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className={`p-3 ${
                        cellIndex === 3 
                          ? cell === "Running" 
                            ? "text-green-400" 
                            : cell === "Error" 
                              ? "text-red-400" 
                              : ""
                          : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MachineStatusTable;
