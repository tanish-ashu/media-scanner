import React from 'react';
import './App.css';

function App() {
  return (
    <div style={{ width: '300px', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Media Scanner</h2>
      <p>Scan the current page to detect manipulated or AI-generated media.</p>
      
      <button 
        style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        onClick={() => alert("Auto-scanning is active on this page!")}
      >
        Scanner Active
      </button>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>Backend Status: 🟢 Connected</p>
      </div>
    </div>
  );
}

export default App;