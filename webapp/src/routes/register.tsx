import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      // After registration, navigate to the login page or any confirmation screen
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-blue-200 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl p-8">
        <div className="text-center mb-6">
          <img
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Ecofren Logo"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-4 text-2xl font-bold text-green-800">
            Create your Account
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Join Ecofren and start your eco-conscious journey!
          </p>
        </div>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring focus:ring-green-400"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring focus:ring-green-400"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring focus:ring-green-400"
              />
            </div>
          </div>
          {error && (
            <div className="text-center text-red-600 text-sm">
              {error}
            </div>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded-md font-semibold shadow-md transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-green-600 hover:text-green-500">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}
