import React, { useState } from 'react';
import axios from 'axios';

function AutoTrainModel() {
  const [trainPercent, setTrainPercent] = useState('');
  const [testPercent, setTestPercent] = useState('');
  const [hyperparameters, setHyperparameters] = useState({
    criterion: '',
    maxDepth: '',
    nEstimators: '',
  });

  const handleTrain = async () => {
    try {
      await axios.post('http://localhost:5000/model/train', {
        trainPercent,
        testPercent,
        hyperparameters
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Model trained successfully!');
    } catch (error) {
      console.error('Error training model', error);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl mb-4">Auto Train ML Model</h2>
      <div className="mb-4">
        <label className="block mb-2">Train Percentage</label>
        <input
          type="number"
          value={trainPercent}
          onChange={(e) => setTrainPercent(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Test Percentage</label>
        <input
          type="number"
          value={testPercent}
          onChange={(e) => setTestPercent(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Criterion</label>
        <input
          type="text"
          value={hyperparameters.criterion}
          onChange={(e) => setHyperparameters({ ...hyperparameters, criterion: e.target.value })}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Max Depth</label>
        <input
          type="number"
          value={hyperparameters.maxDepth}
          onChange={(e) => setHyperparameters({ ...hyperparameters, maxDepth: e.target.value })}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Number of Estimators</label>
        <input
          type="number"
          value={hyperparameters.nEstimators}
          onChange={(e) => setHyperparameters({ ...hyperparameters, nEstimators: e.target.value })}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded"
        />
      </div>
      <button
        onClick={handleTrain}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Train Model
      </button>
    </div>
  );
}

export default AutoTrainModel;
