import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Disc3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isSignUp) {
        await signUp(email, password);
        toast.success('Cuenta creada exitosamente!');
      } else {
        await signIn(email, password);
        navigate('/');
      }
    } catch (error) {
      toast.error(isSignUp ? 'Error al crear la cuenta' : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          {loading ? (
            <Skeleton circle height={48} width={48} className="mx-auto" />
          ) : (
            <Disc3 className="mx-auto h-12 w-12 text-indigo-600" />
          )}
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {loading ? <Skeleton width={200} /> : 'Vinyl Collection'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {loading ? <Skeleton width={150} /> : (isSignUp ? 'Crea tu cuenta' : 'Inicia sesión para gestionar tus vinilos')}
          </p>
        </div>
        {loading ? (
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Skeleton height={40} />
              </div>
              <div>
                <Skeleton height={40} />
              </div>
            </div>
            <div>
              <Skeleton height={40} />
            </div>
            <div className="text-center">
              <Skeleton width={100} />
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Procesando...' : (isSignUp ? 'Crear cuenta' : 'Iniciar sesión')}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}