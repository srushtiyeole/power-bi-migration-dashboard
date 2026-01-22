import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [migrationData, setMigrationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/api/data')
        .then((res) => res.json())
        .then((data) => {
          setMigrationData(data);
          setFilteredData(data);
          setLastUpdated(new Date().toLocaleTimeString());
          setLoading(false);
        })
        .catch((err) => console.error("Error:", err));
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = migrationData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (statusFilter !== "All") {
      result = result.filter((item) => item.status === statusFilter);
    }
    setFilteredData(result);
  }, [searchTerm, statusFilter, migrationData]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("M Query copied!");
  };

  const exportToCSV = () => {
    const headers = "Type,Name,Status,Server,Database\n";
    const rows = filteredData.map(i => `${i.type},${i.name},${i.status},${i.server},${i.db}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'migration_report.csv';
    a.click();
  };

  if (loading) return <div className={`h-screen flex items-center justify-center font-bold ${isDarkMode ? 'bg-[#0f172a] text-white' : 'bg-gray-100 text-black'}`}>Loading Dashboard...</div>;

  return (
    <div className={`h-screen flex flex-col p-6 transition-colors duration-300 font-sans ${isDarkMode ? 'bg-[#0f172a] text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* HEADER SECTION - Screenshot Style */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Power BI <span className="text-blue-500">Migration Tracker</span>
          </h1>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-500'} text-xs font-bold uppercase tracking-widest mt-1`}>
            LAST SYNC: {lastUpdated}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`px-4 py-2 rounded-lg font-bold text-xs shadow-md transition-all ${isDarkMode ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-white'}`}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button onClick={exportToCSV} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg transition-all">
            📊 Export CSV
          </button>
          <div className={`${isDarkMode ? 'bg-[#1e293b] border-white/10' : 'bg-white border-gray-200'} px-6 py-2 rounded-xl border text-center min-w-[100px]`}>
            <p className="text-slate-500 text-[10px] font-black uppercase mb-1 tracking-tighter">Assets</p>
            <p className="text-2xl font-black">{filteredData.length}</p>
          </div>
        </div>
      </div>

      {/* SEARCH & FILTERS - Optimized Width */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search by Name, Server, or Database..." 
            className={`w-full pl-12 pr-4 py-3 rounded-xl font-bold text-sm outline-none shadow-sm border ${isDarkMode ? 'bg-white text-black border-transparent' : 'bg-white text-gray-900 border-gray-300'}`}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-3 text-gray-400 text-xl">🔍</span>
        </div>
        
        <select 
          className={`px-4 py-2 rounded-xl border font-bold text-sm outline-none cursor-pointer shadow-sm ${isDarkMode ? 'bg-[#1e293b] text-white border-slate-700' : 'bg-white text-gray-900 border-gray-300'}`}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* TABLE SECTION - Proper Sizing */}
      <div className={`flex-1 rounded-2xl border overflow-hidden shadow-2xl transition-colors ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className="overflow-y-auto h-full">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className={`${isDarkMode ? 'bg-[#334155] text-slate-300' : 'bg-gray-100 text-gray-600'} text-[11px] font-bold uppercase tracking-wider sticky top-0 z-10`}>
              <tr>
                <th className="p-4 w-[6%] border-b border-white/5">Type</th>
                <th className="p-4 w-[16%] border-b border-white/5">Asset Name</th>
                <th className="p-4 w-[10%] border-b border-white/5 text-center">Status</th>
                <th className="p-4 w-[14%] border-b border-white/5">Before / After</th>
                <th className="p-4 w-[12%] border-b border-white/5">Server</th>
                <th className="p-4 w-[12%] border-b border-white/5">Database</th>
                <th className="p-4 border-b border-white/5">M Query</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDarkMode ? 'divide-slate-700/50' : 'divide-gray-100'}`}>
              {filteredData.map((item, index) => (
                <tr key={index} className={`transition-all group ${isDarkMode ? 'hover:bg-slate-700/40' : 'hover:bg-blue-50/50'}`}>
                  <td className={`p-4 font-bold text-[11px] ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>{item.type}</td>
                  <td className="p-4">
                    <div className="font-bold text-blue-500 text-[14px]">{item.name}</div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase mt-1">ENV: {item.env}</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wide border ${
                      item.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                      item.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                      'bg-orange-500/10 text-orange-500 border-orange-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className={`text-[11px] opacity-40 font-bold line-through ${isDarkMode ? 'text-sky-300' : 'text-gray-500'}`}>{item.before}</div>
                    <div className="text-blue-500 font-black text-[12px]">↓ {item.after}</div>
                  </td>
                  <td className={`p-4 font-mono text-[11px] truncate ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>{item.server}</td>
                  <td className={`p-4 font-mono text-[11px] truncate ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>{item.db}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-2.5 rounded-lg text-[10px] font-mono flex-1 truncate border transition-all ${
                        isDarkMode ? 'bg-black/30 text-slate-500 border-white/5' : 'bg-gray-50 text-gray-500 border-gray-200'
                      } cursor-help`}>
                        {item.query}
                      </div>
                      <button onClick={() => copyToClipboard(item.query)} className={`opacity-0 group-hover:opacity-100 p-1.5 rounded-md transition-all shadow-sm ${isDarkMode ? 'bg-slate-700 hover:bg-blue-600' : 'bg-gray-200 hover:bg-blue-500 hover:text-white'}`}>📋</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;