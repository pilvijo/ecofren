import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/');
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
            Welcome to Ecofren
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring focus:ring-green-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-green-500 focus:ring focus:ring-green-400"
              />
            </div>
              <div className="text-sm mt-2 ">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Forgot password?
                </a>
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
              {loading ? 'Loading...' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="/register" className="font-medium text-green-600 hover:text-green-500">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
