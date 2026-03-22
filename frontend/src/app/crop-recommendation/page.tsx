import './crop.css';

export default function CropRecommendation() {
  return (
    <div className="page-layout">
      <div className="form-section card">
        <h1>🌾 Crop Recommendation</h1>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Enter your farm details, and our AI will suggest the best crops for maximum yield.
        </p>
        
        <form className="crop-form">
          <div className="form-group">
            <label>Location (State/District)</label>
            <input type="text" placeholder="e.g., Andhra Pradesh, Guntur" />
          </div>
          
          <div className="form-group">
            <label>Soil Type</label>
            <select>
              <option>Black Soil</option>
              <option>Red Soil</option>
              <option>Alluvial Soil</option>
              <option>Laterite Soil</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Season</label>
            <select>
              <option>Kharif (Monsoon)</option>
              <option>Rabi (Winter)</option>
              <option>Zaid (Summer)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Water Availability</label>
            <select>
              <option>High (Canal/River)</option>
              <option>Medium (Borewell/Rain-dependent)</option>
              <option>Low (Dryland)</option>
            </select>
          </div>
          
          <button type="button" style={{ width: '100%', marginTop: '1rem' }}>Get AI Recommendation</button>
        </form>
      </div>

      <div className="results-section">
        <h2 style={{ marginBottom: '1.5rem' }}>AI Suggestions</h2>
        <div className="suggestion-card card">
          <div className="badge">Best Match</div>
          <h3>Cotton (Bt Cotton)</h3>
          <p className="text-muted">Highly suitable for Black Soil in Kharif season with medium water availability.</p>
          <div className="stats">
            <div><span>Expected Yield:</span> <strong>8-10 qtl/acre</strong></div>
            <div><span>Duration:</span> <strong>150-180 days</strong></div>
          </div>
        </div>

        <div className="suggestion-card card">
          <h3>Chilli</h3>
          <p className="text-muted">Good alternative cash crop. Requires slightly more care for pest management.</p>
          <div className="stats">
            <div><span>Expected Yield:</span> <strong>20-25 qtl/acre (Dry)</strong></div>
            <div><span>Duration:</span> <strong>160 days</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
