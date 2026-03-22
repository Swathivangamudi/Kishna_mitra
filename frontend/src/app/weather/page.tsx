export default function WeatherAlerts() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 className="gradient-text" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>🌤️ Local Weather & Alerts</h1>
      <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Current weather for <strong>Guntur, Andhra Pradesh</strong> (Updated 10 mins ago)
      </p>

      {/* Critical Alerts */}
      <div style={{ background: 'var(--error)', color: 'white', padding: '1rem 1.5rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px rgba(229, 115, 115, 0.3)' }}>
        <span style={{ fontSize: '2rem' }}>⚠️</span>
        <div>
          <h3 style={{ margin: 0, color: 'white' }}>Heavy Rainfall Warning</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>Expected heavy showers (40mm) in the next 12 hours. Delay pesticide spraying.</p>
        </div>
      </div>

      {/* Current Weather */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem' }}>⛈️</div>
          <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>26°C</h2>
          <p className="text-muted">High 30° / Low 24°</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><strong>💧 Humidity:</strong> 85%</div>
          <div><strong>💨 Wind:</strong> 15 km/h (SE)</div>
          <div><strong>☔ Precipitation:</strong> 70% chance</div>
        </div>
      </div>

      {/* 7 Day Forecast */}
      <h3 style={{ marginBottom: '1rem' }}>7-Day Forecast</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {[
          { day: 'Today', icon: '⛈️', desc: 'Thunderstorms', temp: '26°C / 24°C' },
          { day: 'Tomorrow', icon: '🌧️', desc: 'Scattered Showers', temp: '28°C / 23°C' },
          { day: 'Wednesday', icon: '⛅', desc: 'Partly Cloudy', temp: '31°C / 24°C' },
          { day: 'Thursday', icon: '☀️', desc: 'Sunny', temp: '33°C / 25°C' },
          { day: 'Friday', icon: '☀️', desc: 'Sunny', temp: '34°C / 25°C' },
        ].map((w, i) => (
          <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
            <div style={{ width: '100px' }}><strong>{w.day}</strong></div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{w.icon}</span>
              <span className="text-muted">{w.desc}</span>
            </div>
            <div><strong>{w.temp}</strong></div>
          </div>
        ))}
      </div>
    </div>
  );
}
