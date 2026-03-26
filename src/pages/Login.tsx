import React, { useState } from 'react';
import { loginWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, ShieldAlert } from 'lucide-react';

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await loginWithGoogle();
      if (result.user.email === 'frederico.arantes@gmail.com') {
        navigate('/admin');
      } else {
        setError('Acesso restrito apenas ao administrador.');
      }
    } catch (err) {
      setError('Erro ao realizar login. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-8"
      >
        <div className="w-20 h-20 bg-ink/5 rounded-full flex items-center justify-center mx-auto">
          <LogIn size={32} className="text-ink" />
        </div>
        
        <div className="space-y-2">
          <h1 className="serif text-3xl font-light">Área Restrita</h1>
          <p className="text-ink/60 text-sm">Acesse para gerenciar suas obras e conteúdos.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs flex items-center space-x-3">
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-ink text-paper py-4 rounded-full text-xs uppercase tracking-widest hover:bg-accent transition-all flex items-center justify-center space-x-4 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-paper/30 border-t-paper rounded-full animate-spin" />
          ) : (
            <>
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              <span>Entrar com Google</span>
            </>
          )}
        </button>

        <p className="text-[10px] uppercase tracking-widest text-ink/30">
          Apenas usuários autorizados
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
