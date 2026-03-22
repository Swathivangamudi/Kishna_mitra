export default function PestDetection() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>🐛 Pest & Disease Detection</h1>
      <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Upload a clear photo of the affected leaf or crop to get an instant AI diagnosis.
      </p>

      <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', borderStyle: 'dashed', borderWidth: '2px', marginBottom: '2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📸</div>
        <h3 style={{ marginBottom: '1rem' }}>Tap to capture or upload an image</h3>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>Supports JPG, PNG formats.</p>
        <button>Select Image</button>
      </div>

      <div className="card" style={{ display: 'block' }}>
        <h2 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           <span style={{ color: 'white', background: 'var(--error)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>Diagnosis Found</span>
           Late Blight (Potato/Tomato)
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <h4 style={{ color: 'var(--warning)', marginBottom: '0.5rem' }}>Cause</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Fungal pathogen <i>Phytophthora infestans</i> spreading rapidly in damp conditions.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Organic Treatment</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Spray Neem oil extract (5ml/L) or Copper-based fungicides. Remove infected leaves immediately.</p>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <h4 style={{ color: 'var(--error)', marginBottom: '0.5rem' }}>Chemical Treatment / Expert Advice</h4>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Application of Chlorothalonil or Mancozeb formulations. Ensure 1-week gap before harvest.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
