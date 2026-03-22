export default function MarketPriceTracker() {
  return (
    <div className="page-layout">
      <div className="form-section card">
        <h1>📈 Market Price Tracker</h1>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Check real-time APMC mandi prices to decide the best time to sell your produce.
        </p>

        <form className="crop-form">
          <div className="form-group">
            <label>Crop / Commodity</label>
            <select>
              <option>Cotton</option>
              <option>Wheat</option>
              <option>Chilli (Red)</option>
              <option>Onion</option>
            </select>
          </div>
          <div className="form-group">
            <label>State</label>
            <select><option>Andhra Pradesh</option></select>
          </div>
          <div className="form-group">
            <label>District / Mandi</label>
            <select><option>Guntur</option><option>Kurnool</option></select>
          </div>
          <button type="button" style={{ width: '100%', marginTop: '1rem' }}>Get Prices</button>
        </form>
      </div>

      <div className="results-section">
        <h2 style={{ marginBottom: '1rem' }}>Today&apos;s Prices (Guntur Mandi)</h2>
        <div className="card" style={{ background: 'var(--primary-light)', padding: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <p className="text-muted">Cotton (Medium Staple)</p>
          <h2 style={{ fontSize: '3rem', color: 'var(--primary-dark)', margin: '0.5rem 0' }}>₹7,350 <span style={{ fontSize: '1rem', color: 'var(--text-main)' }}>/ quintal</span></h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
            <div><span className="text-muted">Min:</span> <strong>₹7,100</strong></div>
            <div><span className="text-muted">Max:</span> <strong>₹7,600</strong></div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🤖 AI Insight
          </h3>
          <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>
            Prices have <strong style={{ color: 'var(--success)' }}>increased by 4%</strong> over the last week due to low arrivals. 
            <strong> Recommendation:</strong> Wait out the weekend; prices are expected to stabilize around ₹7,500 next Tuesday.
          </p>
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Nearby Mandis</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '0.5rem' }}>Mandi</th>
              <th style={{ padding: '0.5rem' }}>Avg Price</th>
              <th style={{ padding: '0.5rem' }}>Diff</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 0.5rem' }}>Kurnool</td>
              <td>₹7,420 /qtl</td>
              <td style={{ color: 'var(--success)' }}>+₹70</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 0.5rem' }}>Prakasam</td>
              <td>₹7,200 /qtl</td>
              <td style={{ color: 'var(--error)' }}>-₹150</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
