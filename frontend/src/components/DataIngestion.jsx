import React, { useState } from 'react';
import axios from 'axios';

function DataIngestion() {
  const [file, setFile] = useState(null);
  const [dataDim, setDataDim] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleIngest = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5001/data/ingest', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });
      alert('File ingested successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error ingesting file', error);
      alert('Error ingesting file. Please check the console for more details.');
    }
  };

  const handleRun = async () => {
    try {
      const response = await axios.get('http://localhost:5001/data/dimensions', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setDataDim(response.data);
    } catch (error) {
      console.error('Error fetching data dimensions', error);
      alert('Error fetching data dimensions. Please check the console for more details.');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl mb-4">Data Ingestion</h2>
      <input
        type="file"
        accept=".csv, .xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleIngest}
        className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Ingest
      </button>
      <button
        onClick={handleRun}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get Data Dimensions
      </button>
      {dataDim && (
        <div className="mt-4">
          <p>Rows: {dataDim.rows}</p>
          <p>Columns: {dataDim.columns}</p>
        </div>
      )}
    </div>
  );
}

export default DataIngestion;
