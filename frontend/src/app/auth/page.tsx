'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '3rem 2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Welcome to Kisan Mitra</h2>
        <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {step === 1 ? 'Login with your mobile number' : 'Enter the OTP sent to your phone'}
        </p>

        {step === 1 ? (
          <form onSubmit={handleSendOTP}>
            <div className="form-group">
              <label>Phone Number</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" value="+91" disabled style={{ width: '60px', textAlign: 'center', background: '#f5f5f5' }} />
                <input type="tel" placeholder="Enter 10-digit number" required pattern="[0-9]{10}" />
              </div>
            </div>
            <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <div className="form-group">
              <label>One Time Password (OTP)</label>
              <input type="text" placeholder="----" required minLength={4} maxLength={6} style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }} />
            </div>
            <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Verify & Login</button>
            <button 
              type="button" 
              onClick={() => setStep(1)} 
              style={{ width: '100%', marginTop: '1rem', background: 'transparent', color: 'var(--primary-dark)', boxShadow: 'none' }}
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
