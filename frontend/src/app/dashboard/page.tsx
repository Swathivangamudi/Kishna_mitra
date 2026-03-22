import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <h1 className="gradient-text">Farmer Dashboard</h1>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Welcome back! Here is your farm&apos;s overview.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="card">
          <h3>🌦️ Today&apos;s Weather</h3>
          <p className="text-muted">Sunny, 28°C</p>
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--primary-light)', borderRadius: '8px', color: 'var(--primary-dark)' }}>
            <strong>Alert:</strong> No severe weather expected today. Good time for irrigation.
          </div>
        </div>

        <div className="card">
          <h3>💧 Irrigation Schedule</h3>
          <p className="text-muted">Current Crop: Wheat (Vegetative Stage)</p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', color: 'var(--text-main)' }}>
            <li>Today: 2 hours (Evening)</li>
            <li>Tomorrow: No watering needed</li>
            <li>Wednesday: 1.5 hours (Morning)</li>
          </ul>
        </div>

        <div className="card">
          <h3>📈 Current Market Prices</h3>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Wheat</span>
              <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>₹2,200/qtl ▲</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Rice</span>
              <span style={{ color: 'var(--error)', fontWeight: 'bold' }}>₹2,800/qtl ▼</span>
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Quick Actions</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/pest-detection"><button>📸 Detect Disease</button></Link>
        <Link href="/fertilizer"><button style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)' }}>Calculate Fertilizer</button></Link>
        <Link href="/market"><button style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)' }}>View Market Trends</button></Link>
      </div>
    </div>
  );
}
