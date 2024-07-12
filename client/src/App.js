import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [mac, setMac] = useState('');
  const [ip, setIp] = useState('');
  const [enabled, setEnabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (enabled) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wake`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ mac, ip })
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
        } else {
          alert(data.error);
        }
      } catch (error) {
        alert('Failed to send WOL packet');
      }
    } else {
      alert('Enable WOL to send the packet');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="bg-white shadow w-full py-6 mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">Wake-on-LAN</h1>
      </header>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-11/12 md:w-1/2 lg:w-1/3">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">MAC Address:</label>
          <input
            type="text"
            value={mac}
            onChange={(e) => setMac(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">IP Address:</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Enable WOL:</label>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="h-6 w-6"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send WOL Packet
        </button>
      </form>
    </div>
  );
}

export default App;
