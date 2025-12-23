const AiAdvisor = ({ data, role }: any) => {
  if (!data) {
    return (
      <div className="p-6 border-2 border-slate-700 rounded-xl bg-slate-900 text-white opacity-50">
        <p className="animate-pulse">Awaiting Signal from Angular Shell...</p>
      </div>
    );
  }

  return (
    <div className="p-6 border-2 border-omni-green rounded-xl bg-slate-900 text-white shadow-2xl transition-all duration-500">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-omni-green">OmniSettle AI Advisor</h2>
        <span className="text-xs bg-omni-blue px-2 py-1 rounded border border-blue-400">Role: {role}</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${data.status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <p className="text-lg font-mono">STATUS: {data.status}</p>
        </div>

        <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-omni-green">
          <p className="text-xs text-slate-400 uppercase mb-2">Gemini 2.0 Thought Trace</p>
          <p className="italic text-slate-200">"{data.aI_Reasoning}"</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400">Calculated Regional Tax</p>
          <p className="text-2xl font-bold text-omni-green">{data.tax} <span className="text-sm font-normal">GBP</span></p>
        </div>
      </div>
    </div>
  );
};

export default AiAdvisor;