import React, { useState } from 'react';
import axios from 'axios';

const ReadEntries = () => {
  const [entityName, setEntityName] = useState('');
  const [entries, setEntries] = useState([]);
  const [columns, setColumns] = useState([]);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`http://localhost:3100/${entityName}`);
      setEntries(response.data);

      if (response.data.length > 0) {
        setColumns(Object.keys(response.data[0]));
      }
    } catch (error) {
      alert('Error fetching entries: ' + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Read Entries</h2>
      <input
        type="text"
        value={entityName}
        onChange={(e) => setEntityName(e.target.value)}
        placeholder="Entity Name"
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={fetchEntries}
        className="w-full p-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Fetch Entries
      </button>
      {entries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="px-4 py-2 border-b-2 border-gray-300 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-100 transition duration-300">
                  {columns.map((column) => (
                    <td key={column} className="px-4 py-2 border-b border-gray-300">
                      {entry[column]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No entries found.</p>
      )}
    </div>
  );
};

export default ReadEntries;
