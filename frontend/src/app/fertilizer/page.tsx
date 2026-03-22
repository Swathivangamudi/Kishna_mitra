export default function FertilizerOptimizer() {
  return (
    <div className="page-layout">
      <div className="form-section card">
        <h1>🧪 Fertilizer Optimizer</h1>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Calculate exact soil nutrient requirements to boost yield and save costs.
        </p>

        <form className="crop-form">
          <div className="form-group">
            <label>Crop Type</label>
            <select><option>Rice (Paddy)</option><option>Wheat</option></select>
          </div>

          <div className="form-group">
            <label>Farm Area (Acres)</label>
            <input type="number" defaultValue={2} />
          </div>

          <div className="form-group">
            <label>Visible Symptoms (Optional)</label>
            <select>
              <option>None (Regular Schedule)</option>
              <option>Yellowing of older leaves (N deficiency)</option>
              <option>Purple edges (P deficiency)</option>
            </select>
          </div>

          <button type="button" style={{ width: '100%', marginTop: '1rem' }}>Calculate NPK</button>
        </form>
      </div>

      <div className="results-section">
        <div className="card" style={{ background: 'var(--primary-light)', borderColor: 'var(--primary)' }}>
          <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Recommendations (per Acre)</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <strong style={{ fontSize: '1.5rem', display: 'block', color: '#1976D2' }}>40kg</strong>
              <span className="text-muted">Nitrogen (N)</span>
            </div>
            <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <strong style={{ fontSize: '1.5rem', display: 'block', color: '#E64A19' }}>20kg</strong>
              <span className="text-muted">Phosphorus (P)</span>
            </div>
            <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <strong style={{ fontSize: '1.5rem', display: 'block', color: '#AFB42B' }}>20kg</strong>
              <span className="text-muted">Potassium (K)</span>
            </div>
          </div>

          <div className="card" style={{ background: 'white' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Application Guide</h4>
            <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1.2rem', lineHeight: '1.8' }}>
              <li><strong>Basal Dose:</strong> Apply full P & K and half N during field preparation.</li>
              <li><strong>Top Dressing:</strong> Apply remaining N at panicle initiation stage (approx. 45-50 days).</li>
            </ul>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: 'var(--error)', background: '#FFEBEE', padding: '0.5rem', borderRadius: '4px' }}>
              ⚠️ <span>Avoid overuse of Urea (N) as it increases susceptibility to pests like leaf folder.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
