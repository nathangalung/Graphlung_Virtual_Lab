import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifierType: 'email' | 'username', identifier: string, password: string) => Promise<void>;
  register: (formData: { email: string; username: string; password: string; confirmPassword: string }) => Promise<string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  axios.defaults.baseURL = 'https://graphlung-virtual-lab.vercel.app';
  axios.defaults.timeout = 5000;

  const login = async (identifierType: 'email' | 'username', identifier: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/login', { identifierType, identifier, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { user, token } = response.data;
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: { email: string; username: string; password: string; confirmPassword: string }) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { message } = response.data;
      return message;
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new Error(error.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading, 
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};