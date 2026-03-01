import data from '../public/data.json';

const statusColor: Record<string, string> = {
  active: 'bg-green-500',
  idle: 'bg-gray-600',
  busy: 'bg-yellow-500',
  error: 'bg-red-500',
};

const taskStatusColor: Record<string, string> = {
  'in-progress': 'text-yellow-400 bg-yellow-400/10',
  'pending': 'text-blue-400 bg-blue-400/10',
  'not-started': 'text-gray-400 bg-gray-400/10',
  'done': 'text-green-400 bg-green-400/10',
  'backlog': 'text-purple-400 bg-purple-400/10',
};

const priorityColor: Record<string, string> = {
  high: 'text-red-400',
  medium: 'text-yellow-400',
  low: 'text-gray-400',
};

export default function MissionControl() {
  const budgetPct = (data.budget.spent / data.budget.total) * 100;
  const lastUpdated = new Date(data.lastUpdated).toLocaleString('en-IN', { timeZone: 'Asia/Calcutta' });

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white font-mono p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-widest text-cyan-400">🧠 MARVIS MISSION CONTROL</h1>
          <p className="text-gray-500 text-xs mt-1">Autonomous Marketing & Sales Unit — JC Operations</p>
        </div>
        <div className="text-right text-xs text-gray-500">
          <div className="text-green-400 font-bold">● ONLINE</div>
          <div>Updated: {lastUpdated} IST</div>
        </div>
      </div>

      {/* Budget Bar */}
      <div className="mb-8 bg-gray-900 rounded-lg p-4 border border-gray-800">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400 tracking-wider">BUDGET TRACKER</span>
          <span className="text-xs font-bold text-green-400">${data.budget.spent} / ${data.budget.total} used</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${budgetPct || 1}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">${data.budget.total - data.budget.spent} remaining</div>
      </div>

      {/* Agents Grid */}
      <div className="mb-8">
        <h2 className="text-xs tracking-widest text-gray-400 mb-4">AGENT ROSTER</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {data.agents.map((agent) => (
            <div key={agent.id} className="bg-gray-900 border border-gray-800 rounded-lg p-3 hover:border-cyan-800 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{agent.emoji}</span>
                <span className={`w-2 h-2 rounded-full ${statusColor[agent.status] || 'bg-gray-600'}`} title={agent.status} />
              </div>
              <div className="text-sm font-bold text-white">{agent.name}</div>
              <div className="text-xs text-gray-400">{agent.role}</div>
              <div className="text-xs text-gray-600 mt-1">{agent.model}</div>
              <div className={`text-xs mt-1 capitalize ${agent.status === 'active' ? 'text-green-400' : 'text-gray-600'}`}>
                {agent.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <div>
          <h2 className="text-xs tracking-widest text-gray-400 mb-4">ACTIVE TASKS</h2>
          <div className="space-y-2">
            {data.tasks.map((task) => (
              <div key={task.id} className="bg-gray-900 border border-gray-800 rounded-lg p-3 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{task.title}</div>
                  <div className="flex gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${taskStatusColor[task.status] || 'text-gray-400 bg-gray-400/10'}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                    <span className={`text-xs ${priorityColor[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-xs tracking-widest text-gray-400 mb-4">ACTIVITY FEED</h2>
          <div className="space-y-2">
            {data.activity.map((event, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400">
                      {new Date(event.time).toLocaleString('en-IN', { timeZone: 'Asia/Calcutta', dateStyle: 'short', timeStyle: 'short' })}
                      {' — '}<span className="text-cyan-400">{event.agent}</span>
                    </div>
                    <div className="text-sm text-white mt-0.5">{event.action}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
