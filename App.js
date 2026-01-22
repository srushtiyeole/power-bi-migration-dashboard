import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './migration-ui/src/App.css';

function App() {
  const [migrationData, setMigrationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/migration-stats')
      .then(res => { setMigrationData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={centerStyle}>
      <div style={loaderWrapper}>
        <div style={spinner}></div>
        <p style={{marginTop: '20px', fontSize: '1.1rem', color: '#64748b'}}>🔄 Initializing Migration Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div style={dashboardLayout}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={logoSection}>
          <div style={logoIcon}>🚀</div>
          <h2 style={{color: '#fff', fontSize: '1.3rem', margin: 0, fontWeight: '700'}}>Fabric Migrator</h2>
        </div>
        <div style={navItemActive}>
          <span style={{marginRight: '10px'}}>📊</span>
          Dashboard
        </div>
        <div style={navItem}>
          <span style={{marginRight: '10px'}}>📁</span>
          Projects
        </div>
        <div style={navItem}>
          <span style={{marginRight: '10px'}}>⚙️</span>
          Settings
        </div>
        <div style={sidebarFooter}>
          <div style={userBadge}>
            <div style={avatar}>U</div>
            <div>
              <div style={{fontSize: '0.9rem', fontWeight: '600', color: '#fff'}}>User Admin</div>
              <div style={{fontSize: '0.75rem', color: '#94a3b8'}}>admin@company.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={mainContent}>
        <header style={headerStyle}>
          <div>
            <h1 style={{margin: 0, fontSize: '2rem', color: '#0f172a', fontWeight: '700'}}>Migration Overview</h1>
            <p style={{color: '#64748b', marginTop: '5px'}}>Tracking PBIP migration from Databricks to Fabric</p>
          </div>
          <button style={btnStyle} onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
            <span style={{marginRight: '8px'}}>+</span>
            New Migration
          </button>
        </header>

        {/* Stats Cards */}
        <div style={statsRow}>
          <div style={statCard}>
            <div style={statIcon}>📄</div>
            <div>
              <div style={statLabel}>Total Files</div>
              <div style={statValue}>{migrationData.length}</div>
            </div>
          </div>
          <div style={{...statCard, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
            <div style={{...statIcon, backgroundColor: 'rgba(255,255,255,0.2)'}}>✓</div>
            <div>
              <div style={{...statLabel, color: '#fff'}}>Status</div>
              <div style={{...statValue, color: '#fff'}}>Active</div>
            </div>
          </div>
          <div style={statCard}>
            <div style={statIcon}>⚡</div>
            <div>
              <div style={statLabel}>Engine</div>
              <div style={statValue}>Python 3.9</div>
            </div>
          </div>
          <div style={statCard}>
            <div style={statIcon}>📊</div>
            <div>
              <div style={statLabel}>Success Rate</div>
              <div style={statValue}>98.5%</div>
            </div>
          </div>
        </div>

        {/* Modern Table Card */}
        <div style={tableCard}>
          <div style={tableHeader}>
            <h3 style={{margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#0f172a'}}>Migration Files</h3>
            <div style={searchBox}>
              <span style={{color: '#94a3b8'}}>🔍</span>
              <input type="text" placeholder="Search files..." style={searchInput} />
            </div>
          </div>
          <table style={modernTable}>
            <thead>
              <tr style={tableHeaderRow}>
                <th style={thStyle}>#</th>
                <th style={thStyle}>FILE NAME</th>
                <th style={thStyle}>TARGET CLOUD</th>
                <th style={thStyle}>PROGRESS</th>
              </tr>
            </thead>
            <tbody>
              {migrationData.map((item, index) => (
                <tr 
                  key={item.id} 
                  style={trStyle}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={tdStyle}>
                    <div style={indexBadge}>{String(index + 1).padStart(2, '0')}</div>
                  </td>
                  <td style={{...tdStyle, color: '#0f172a', fontWeight: '600'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <div style={fileIcon}>📋</div>
                      {item.file}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={badgeStyle}>
                      <span style={{marginRight: '6px'}}>☁️</span>
                      {item.target}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={statusWrapper}>
                      <span style={statusDot}></span>
                      <span>{item.status}</span>
                      <div style={progressBar}>
                        <div style={progressFill}></div>
                      </div>
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

// --- Enhanced Styles ---
const dashboardLayout = { display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9', fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" };

const sidebarStyle = { 
  width: '260px', 
  background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', 
  padding: '30px 20px', 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '15px',
  boxShadow: '4px 0 24px rgba(0,0,0,0.12)'
};

const logoSection = { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' };
const logoIcon = { fontSize: '2rem' };

const navItemActive = { 
  color: '#fff', 
  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
  padding: '12px 16px', 
  borderRadius: '10px', 
  cursor: 'pointer',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
};

const navItem = { 
  color: '#94a3b8', 
  padding: '12px 16px', 
  borderRadius: '10px', 
  cursor: 'pointer',
  fontWeight: '500',
  transition: 'all 0.3s ease'
};

const sidebarFooter = { marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' };
const userBadge = { display: 'flex', alignItems: 'center', gap: '12px' };
const avatar = { width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' };

const mainContent = { flex: 1, padding: '40px', overflowY: 'auto' };

const headerStyle = { 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  marginBottom: '35px',
  animation: 'fadeInDown 0.6s ease'
};

const btnStyle = { 
  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
  color: 'white', 
  border: 'none', 
  padding: '12px 24px', 
  borderRadius: '10px', 
  cursor: 'pointer', 
  fontWeight: '600',
  fontSize: '0.95rem',
  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  transition: 'all 0.3s ease'
};

const statsRow = { display: 'flex', gap: '20px', marginBottom: '35px' };

const statCard = { 
  backgroundColor: 'white', 
  padding: '24px', 
  borderRadius: '16px', 
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)', 
  flex: 1,
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid #e2e8f0'
};

const statIcon = { 
  width: '50px', 
  height: '50px', 
  borderRadius: '12px', 
  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  fontSize: '1.5rem' 
};

const statLabel = { fontSize: '0.8rem', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' };
const statValue = { fontSize: '1.8rem', fontWeight: '700', color: '#0f172a', marginTop: '4px' };

const tableCard = { 
  backgroundColor: 'white', 
  borderRadius: '16px', 
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)', 
  overflow: 'hidden',
  border: '1px solid #e2e8f0'
};

const tableHeader = { 
  padding: '20px 24px', 
  borderBottom: '1px solid #e2e8f0', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center' 
};

const searchBox = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '10px', 
  backgroundColor: '#f8fafc', 
  padding: '8px 16px', 
  borderRadius: '8px',
  border: '1px solid #e2e8f0'
};

const searchInput = { 
  border: 'none', 
  backgroundColor: 'transparent', 
  outline: 'none', 
  fontSize: '0.9rem',
  width: '200px'
};

const modernTable = { width: '100%', borderCollapse: 'collapse' };
const tableHeaderRow = { backgroundColor: '#f8fafc', textAlign: 'left' };
const thStyle = { padding: '16px 24px', color: '#475569', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' };

const trStyle = { 
  borderBottom: '1px solid #f1f5f9',
  transition: 'all 0.2s ease',
  cursor: 'pointer'
};

const tdStyle = { padding: '18px 24px', color: '#64748b', fontSize: '0.9rem' };

const indexBadge = { 
  backgroundColor: '#f1f5f9', 
  color: '#64748b', 
  padding: '4px 10px', 
  borderRadius: '6px', 
  fontSize: '0.8rem', 
  fontWeight: '700',
  display: 'inline-block'
};

const fileIcon = { 
  width: '32px', 
  height: '32px', 
  borderRadius: '8px', 
  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center' 
};

const badgeStyle = { 
  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', 
  color: '#1e40af', 
  padding: '6px 14px', 
  borderRadius: '8px', 
  fontSize: '0.8rem', 
  fontWeight: '600',
  display: 'inline-flex',
  alignItems: 'center'
};

const statusWrapper = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '10px', 
  color: '#10b981', 
  fontWeight: '600' 
};

const statusDot = { 
  width: '10px', 
  height: '10px', 
  backgroundColor: '#10b981', 
  borderRadius: '50%',
  boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)',
  animation: 'pulse 2s infinite'
};

const progressBar = { 
  width: '80px', 
  height: '6px', 
  backgroundColor: '#e2e8f0', 
  borderRadius: '3px', 
  overflow: 'hidden',
  marginLeft: 'auto'
};

const progressFill = { 
  width: '75%', 
  height: '100%', 
  background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', 
  borderRadius: '3px',
  animation: 'shimmer 2s infinite'
};

const centerStyle = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  height: '100vh', 
  backgroundColor: '#f1f5f9'
};

const loaderWrapper = { textAlign: 'center' };

const spinner = {
  width: '50px',
  height: '50px',
  border: '4px solid #e2e8f0',
  borderTop: '4px solid #3b82f6',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '0 auto'
};

export default App;