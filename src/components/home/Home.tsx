import React from 'react';
import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await doSignOut();
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;