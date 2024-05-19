import React, { useState } from 'react';
import axios from 'axios';

const CreateEntity = () => {
  const [entityName, setEntityName] = useState('');
  const [attributes, setAttributes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedAttributes = JSON.parse(attributes);
    try {
      const response = await axios.post('http://localhost:3100/create-entity', {
        entityName,
        attributes: parsedAttributes
      });
      alert(response.data);
    } catch (error) {
      alert('Error creating entity: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Entity</h2>
      <input
        type="text"
        value={entityName}
        onChange={(e) => setEntityName(e.target.value)}
        placeholder="Entity Name"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <textarea
        value={attributes}
        onChange={(e) => setAttributes(e.target.value)}
        placeholder="Attributes (JSON format)"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Create Entity
      </button>
    </form>
  );
};

export default CreateEntity;
