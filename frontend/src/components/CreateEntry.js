import React, { useState } from 'react';
import axios from 'axios';

const CreateEntry = () => {
  const [entityName, setEntityName] = useState('');
  const [entryData, setEntryData] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedEntryData = JSON.parse(entryData);
    try {
      const response = await axios.post(`http://localhost:3100/${entityName}`, parsedEntryData);
      alert(response.data);
    } catch (error) {
      alert('Error creating entry: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Create Entry</h2>
      <input
        type="text"
        value={entityName}
        onChange={(e) => setEntityName(e.target.value)}
        placeholder="Entity Name"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <textarea
        value={entryData}
        onChange={(e) => setEntryData(e.target.value)}
        placeholder="Entry Data (JSON format)"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Create Entry
      </button>
    </form>
  );
};

export default CreateEntry;
