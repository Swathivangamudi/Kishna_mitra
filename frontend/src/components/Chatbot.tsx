'use client';
import { useState } from 'react';
import './Chatbot.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="chatbot-fab" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        💬
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Kisan Assistant</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="chatbot-messages">
            <div className="message bot">
              Hello! How can I help you with your farm today? 🌾
            </div>
          </div>
          <div className="chatbot-input">
            <input type="text" placeholder="Ask in your language..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
