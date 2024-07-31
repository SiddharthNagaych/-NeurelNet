import React, { useState } from 'react';
import axios from 'axios';

function FreezeLearning() {
  const [modelType, setModelType] = useState('');
  const [filePath, setFilePath] = useState('');

  const handleExport = async () => {
    try {
      await axios.post('http://localhost:5000/model/freeze', { modelType, filePath }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Model frozen successfully!');
    } catch (error) {
      console.error('Error freezing model', error);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl mb-4">Freeze Learning</h2>
      <div className="mb-4">
        <label className="block mb-2">Model Type</label>
        <input
          type="text"
          value={modelType}
          onChange={(e) => setModelType(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">File Path</label>
        <input
          type="text"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        />
      </div>
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Export Model
      </button>
    </div>
  );
}

export default FreezeLearning;

