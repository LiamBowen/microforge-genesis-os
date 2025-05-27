
const DashboardPreview = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 h-80 flex justify-center items-end">
      <div className="w-full max-w-6xl h-64 rounded-t-lg bg-dark-card p-6 border border-gray-800 opacity-0 animate-fade-in-up delay-300 overflow-hidden">
        <div className="mb-4 flex items-center">
          <div className="w-3 h-3 rounded-full bg-neon-orange mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-neon-lime mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-neon-cyan"></div>
          <div className="text-xs text-gray-500 ml-2">MicroForge OS — Live Dashboard</div>
        </div>
        
        {/* Dashboard Preview */}
        <div className="grid grid-cols-4 gap-4 h-full">
          {/* Stats Cards */}
          <div className="col-span-4 grid grid-cols-4 gap-2 h-16">
            <div className="bg-dark rounded p-2 border border-gray-800">
              <div className="text-xs text-gray-400">Active Machines</div>
              <div className="text-lg font-bold text-neon-cyan">3</div>
            </div>
            <div className="bg-dark rounded p-2 border border-gray-800">
              <div className="text-xs text-gray-400">Jobs Queued</div>
              <div className="text-lg font-bold text-neon-lime">6</div>
            </div>
            <div className="bg-dark rounded p-2 border border-gray-800">
              <div className="text-xs text-gray-400">Completed</div>
              <div className="text-lg font-bold text-neon-orange">14</div>
            </div>
            <div className="bg-dark rounded p-2 border border-gray-800">
              <div className="text-xs text-gray-400">Alerts</div>
              <div className="text-lg font-bold text-red-400">1</div>
            </div>
          </div>
          
          {/* Machine Status Table */}
          <div className="col-span-4 bg-dark rounded border border-gray-800 p-3">
            <div className="text-sm font-medium text-gray-300 mb-2">Live Machine Status</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400">🖨️ ForgeBot-01</span>
                <span className="text-green-400">Running • 72%</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400">⚙️ CNC-Master</span>
                <span className="text-gray-500">Idle</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-400">🔬 LaserCutter-X</span>
                <span className="text-red-400">Error</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
