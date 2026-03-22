import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3>🌿 Kisan Mitra</h3>
          <p>Empowering farmers with AI-driven insights for sustainable agriculture.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/crop-recommendation">Crop Advisor</a></li>
            <li><a href="/weather">Weather Alerts</a></li>
            <li><a href="/market">Market Prices</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact & Support</h4>
          <p>Toll Free: 1800-120-1011</p>
          <p>Email: support@kisanmitra.in</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Kisan Mitra. All rights reserved.</p>
      </div>
    </footer>
  );
}
