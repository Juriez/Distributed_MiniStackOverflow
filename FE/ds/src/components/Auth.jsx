import PropTypes from 'prop-types';
import { useState } from 'react';

function Auth({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const res = await fetch(`http://localhost/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert('Signup successful');
    } else {
      const errorData = await res.json();
      alert(errorData.message);
    }
  };

  const handleSignIn = async () => {
    const res = await fetch(`http://localhost/user/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
    } else {
      const errorData = await res.json();
      alert(errorData.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">Welcome</h2>

        <input
          type="email"
          placeholder="Email"
          className="block w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignUp}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition duration-300 shadow-md mb-2"
        >
          Sign Up
        </button>
        <button
          onClick={handleSignIn}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg transition duration-300 shadow-md"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

Auth.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Auth;
