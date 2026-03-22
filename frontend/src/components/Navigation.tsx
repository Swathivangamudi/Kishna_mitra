import Link from 'next/link';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link href="/" className="logo">
          🌿 Kisan Mitra
        </Link>
        <div className="nav-links">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/crop-recommendation">Crops</Link>
          <Link href="/irrigation">Water</Link>
          <Link href="/pest-detection">Pests</Link>
          <Link href="/weather">Weather</Link>
          <Link href="/market">Market</Link>
          <Link href="/donate">Donate</Link>
        </div>
        <div className="nav-actions">
          <select className="lang-select">
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
            <option value="hi">हिन्दी</option>
            <option value="ta">தமிழ்</option>
          </select>
          <Link href="/auth">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
