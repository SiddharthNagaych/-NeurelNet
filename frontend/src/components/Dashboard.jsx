import React, { useState } from 'react';
import DataIngestion from './DataIngestion';
import DataTransformation from './DataTransformation';
import AutoTrainModel from './AutoTrainModel';
import FreezeLearning from './FreezeLearning';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('ingestion');
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex-1 p-6">
      <button 
        onClick={handleSignOut} 
        className="fixed top-4 right-4 p-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
      >
        Sign Out
      </button>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab('ingestion')}
          className={`px-4 py-2 rounded-l-lg ${activeTab === 'ingestion' ? 'bg-yellow-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}
        >
          Data Ingestion
        </button>
        <button
          onClick={() => setActiveTab('transformation')}
          className={`px-4 py-2 ${activeTab === 'transformation' ? 'bg-yellow-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}
        >
          Data Transformation
        </button>
        <button
          onClick={() => setActiveTab('training')}
          className={`px-4 py-2 ${activeTab === 'training' ? 'bg-yellow-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}
        >
          Auto Train ML Model
        </button>
        <button
          onClick={() => setActiveTab('freezing')}
          className={`px-4 py-2 rounded-r-lg ${activeTab === 'freezing' ? 'bg-yellow-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}
        >
          Freeze Learning
        </button>
      </div>
      {activeTab === 'ingestion' && <DataIngestion />}
      {activeTab === 'transformation' && <DataTransformation />}
      {activeTab === 'training' && <AutoTrainModel />}
      {activeTab === 'freezing' && <FreezeLearning />}
    </div>
  );
};

export default Dashboard;
