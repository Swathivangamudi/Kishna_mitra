export default function IrrigationGuidance() {
  return (
    <div className="page-layout">
      <div className="form-section card">
        <h1>💧 Smart Irrigation</h1>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Generate a weekly watering schedule based on weather forecasts and crop stage.
        </p>

        <form className="crop-form">
          <div className="form-group">
            <label>Crop Type</label>
            <select>
              <option>Cotton</option>
              <option>Chilli</option>
              <option>Rice</option>
              <option>Maize</option>
            </select>
          </div>

          <div className="form-group">
            <label>Growth Stage</label>
            <select>
              <option>Seedling Stage</option>
              <option>Vegetative Stage</option>
              <option>Flowering Stage</option>
              <option>Fruiting/Maturity</option>
            </select>
          </div>

          <div className="form-group">
            <label>Soil Moisture (if known)</label>
            <select>
              <option>Dry</option>
              <option>Moderate</option>
              <option>Wet</option>
            </select>
          </div>

          <button type="button" style={{ width: '100%', marginTop: '1rem' }}>Generate Schedule</button>
        </form>
      </div>

      <div className="results-section">
        <h2 style={{ marginBottom: '1.5rem' }}>Weekly Schedule</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--primary-light)' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem' }}>Today</strong>
              <span className="text-muted">High temp (32°C). Soil is dry.</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>2 Hours</span>
              <br/><span className="text-muted" style={{ fontSize: '0.8rem' }}>Evening</span>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem' }}>Tomorrow</strong>
              <span className="text-muted">Cloudy. Rain expected (60%).</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: 'var(--text-muted)' }}>Skip</span>
              <br/><span className="text-muted" style={{ fontSize: '0.8rem' }}>Save water</span>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem' }}>Wednesday</strong>
              <span className="text-muted">Clear skies (30°C).</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>1 Hour</span>
              <br/><span className="text-muted" style={{ fontSize: '0.8rem' }}>Morning</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
