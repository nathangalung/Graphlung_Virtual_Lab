import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Context';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    identifierType: 'email',
    identifier: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.identifierType, formData.identifier, formData.password);
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Invalid credentials';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-red-600 text-center">{error}</div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sign in with
              </label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.identifierType}
                onChange={(e) => setFormData({ ...formData, identifierType: e.target.value })}
              >
                <option value="email">Email</option>
                <option value="username">Username</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {formData.identifierType === 'email' ? 'Email' : 'Username'}
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/signup')}
              className="text-sm text-purple-600 hover:text-purple-500"
            >
              Don't have an account? Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;