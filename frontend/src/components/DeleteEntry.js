import React, { useState } from 'react';
import axios from 'axios';

const DeleteEntry = () => {
  const [entityName, setEntityName] = useState('');
  const [entryId, setEntryId] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3100/${entityName}/${entryId}`);
      alert(response.data.message || 'Entry deleted successfully');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('No entry found with the given ID.');
      } else {
        alert('Error deleting entry: ' + error.message);
      }
    }
  
  };

  return (
    <div>
      <h2>Delete Entry</h2>
      <input
        type="text"
        value={entityName}
        onChange={(e) => setEntityName(e.target.value)}
        placeholder="Entity Name"
        required
      />
      <input
        type="text"
        value={entryId}
        onChange={(e) => setEntryId(e.target.value)}
        placeholder="Entry ID"
        required
      />
      <button onClick={handleDelete}>Delete Entry</button>
    </div>
  );
};

export default DeleteEntry;
