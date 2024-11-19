import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Context';

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.username.includes('@')) {
      setError('Username cannot contain @');
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Submitting form:', formData); // Debugging log
      const message = await register(formData);
      console.log('Registration successful:', message); // Debugging log
      setError('');
      setTimeout(() => navigate('/signin'), 1500);
    } catch (err: any) {
      console.error('Registration failed error:', err.response || err); // Debugging log
      const errorMessage =
        typeof err.response?.data?.error === 'string'
          ? err.response.data.error
          : 'Registration failed';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-[5%]">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-red-600 text-center">
              {typeof error === 'string' ? error : 'An unexpected error occurred'}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent 
                        rounded-md shadow-sm text-sm font-medium text-white 
                        ${isSubmitting ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'}`}
            >
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/signin')}
              className="text-sm text-purple-600 hover:text-purple-500"
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;