import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaHome, FaPlus, FaClipboardList, FaEdit, FaTrashAlt } from 'react-icons/fa';
import CreateEntity from './components/CreateEntity';
import CreateEntry from './components/CreateEntry';
import ReadEntries from './components/ReadEntries';
import UpdateEntry from './components/UpdateEntry';
import DeleteEntry from './components/DeleteEntry';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white shadow-lg">
          <h1 className="text-4xl font-bold tracking-wider animate-pulse text-center">Headless CMS</h1>
          <nav className="mt-4 flex justify-center space-x-6">
            <NavLink to="/" text="Home" icon={<FaHome />} />
            <NavLink to="/create-entity" text="Create Entity" icon={<FaPlus />} />
            <NavLink to="/create-entry" text="Create Entry" icon={<FaClipboardList />} />
            <NavLink to="/read-entries" text="Read Entries" icon={<FaClipboardList />} />
            <NavLink to="/update-entry" text="Update Entry" icon={<FaEdit />} />
            <NavLink to="/delete-entry" text="Delete Entry" icon={<FaTrashAlt />} />
          </nav>
        </header>
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-entity" element={<CreateEntity />} />
            <Route path="/create-entry" element={<CreateEntry />} />
            <Route path="/read-entries" element={<ReadEntries />} />
            <Route path="/update-entry" element={<UpdateEntry />} />
            <Route path="/delete-entry" element={<DeleteEntry />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Home = () => (
  <div className="text-center mt-20">
    <h2 className="text-3xl text-gray-700 font-semibold mb-4">Welcome to the Headless CMS</h2>
    <p className="text-lg text-gray-600">Select an option from the navigation to get started.</p>
  </div>
);

const NavLink = ({ to, text, icon }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 text-lg font-medium hover:text-yellow-300 transition-colors duration-300"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default App;
