import React, { useState } from 'react';
import axios from 'axios';

function DataTransformation() {
  const [featuresToRemove, setFeaturesToRemove] = useState('');
  const [conversion, setConversion] = useState(false);

  const handleTransform = async () => {
    try {
      await axios.post('http://localhost:5000/data/transformation', { features: featuresToRemove }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Data transformed successfully!');
    } catch (error) {
      console.error('Error transforming data', error);
    }
  };

  const handleConversion = async () => {
    try {
      await axios.post('http://localhost:5000/data/convert', { conversion }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Data conversion successful!');
    } catch (error) {
      console.error('Error converting data', error);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl mb-4">Data Transformation</h2>
      <div className="mb-4">
        <label className="block mb-2">Features to Remove</label>
        <input
          type="text"
          value={featuresToRemove}
          onChange={(e) => setFeaturesToRemove(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        />
      </div>
      <button
        onClick={handleTransform}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Remove Features
      </button>
      <button
        onClick={handleConversion}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Convert to Numbers
      </button>
    </div>
  );
}

export default DataTransformation;
