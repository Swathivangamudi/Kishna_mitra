export default function Donate() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="gradient-text">🌱 Fund a Farmer Initiative</h1>
        <p className="text-muted" style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          Support farmers affected by severe weather, crop failure, or debt by contributing directly to verified individuals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Case 1 */}
        <div className="card">
          <div style={{ background: '#f5f5f5', height: '150px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
             👨‍🌾
          </div>
          <h3>Ramu Y. - Crop Loss Recovery</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            Lost 2 acres of ready-to-harvest chilli crops due to unexpected flooding in Guntur. Asking for support to buy seeds for the next season.
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <span>Raised: <strong>₹12,400</strong></span>
              <span>Goal: <strong>₹25,000</strong></span>
            </div>
            <div style={{ background: 'var(--border)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ background: 'var(--success)', width: '50%', height: '100%' }}></div>
            </div>
          </div>
          <button style={{ width: '100%' }}>Donate Now</button>
        </div>

        {/* Case 2 */}
        <div className="card">
          <div style={{ background: '#f5f5f5', height: '150px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
             👩‍🌾
          </div>
          <h3>Sita V. - Drip Irrigation System</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            Attempting to switch to dryland farming techniques in a drought-prone area. Needs funds to install a basic drip irrigation system.
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <span>Raised: <strong>₹35,000</strong></span>
              <span>Goal: <strong>₹40,000</strong></span>
            </div>
            <div style={{ background: 'var(--border)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ background: 'var(--success)', width: '87%', height: '100%' }}></div>
            </div>
          </div>
          <button style={{ width: '100%' }}>Donate Now</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: '3rem', background: 'var(--primary-light)', padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--primary-dark)' }}>Are you a farmer in need?</h3>
        <p style={{ margin: '1rem 0' }}>Register to claim relief funds. Admin verification requires Aadhar and land records.</p>
        <button className="btn-secondary">Apply for Relief</button>
      </div>
    </div>
  );
}
