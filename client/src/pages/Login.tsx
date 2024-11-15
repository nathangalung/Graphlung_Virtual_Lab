import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome to Graphlung Virtual Lab
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => {
              try {
                navigate('/signin');
              } catch (error) {
                console.error("Navigation to Sign In failed:", error);
              }
            }}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md 
                     shadow-sm text-lg font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              try {
                navigate('/signup');
              } catch (error) {
                console.error("Navigation to Sign Up failed:", error);
              }
            }}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md 
                     shadow-sm text-lg font-medium text-white bg-purple-800 hover:bg-purple-900"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};


export default Login;