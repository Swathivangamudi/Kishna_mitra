import Link from 'next/link';
import './page.css';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="gradient-text">Smart Farming Assistance Platform</h1>
          <p className="hero-subtitle">
            Empowering small and medium farmers with AI-driven insights, localized weather alerts, and smart crop management.
          </p>
          <div className="hero-actions">
            <Link href="/dashboard">
              <button className="btn-primary">Get Started</button>
            </Link>
            <Link href="/crop-recommendation">
              <button className="btn-secondary">Explore Crops</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {/* We'll use a CSS background or a simple emoji illustration here for the prototype */}
          <div className="illustration">🌱 🚜 🌦️</div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Platform Features</h2>
        <div className="feature-grid">
          <FeatureCard 
            icon="🌾" 
            title="Crop Recommendation" 
            description="AI suggests the best crops based on your soil, season, and water availability."
            link="/crop-recommendation"
          />
          <FeatureCard 
            icon="💧" 
            title="Smart Irrigation" 
            description="Get weekly irrigation schedules tailored to your crop's growth stage."
            link="/irrigation"
          />
          <FeatureCard 
            icon="🐛" 
            title="Pest & Disease Detection" 
            description="Upload a leaf image to instantly diagnose diseases and get treatment plans."
            link="/pest-detection"
          />
          <FeatureCard 
            icon="🧪" 
            title="Fertilizer Optimizer" 
            description="Calculate exact NPK dosages to maximize yield and avoid overuse."
            link="/fertilizer"
          />
          <FeatureCard 
            icon="☀️" 
            title="Weather Alerts" 
            description="Real-time localized forecasts and severe weather warnings."
            link="/weather"
          />
          <FeatureCard 
            icon="📈" 
            title="Market Tracker" 
            description="Track real-time crop prices and trends to sell at the right time."
            link="/market"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: { icon: string, title: string, description: string, link: string }) {
  return (
    <Link href={link} className="card feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p className="text-muted">{description}</p>
    </Link>
  );
}
