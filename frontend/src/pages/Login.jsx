import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiArrowRight, 
  FiChevronLeft
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      toast.success('Welcome back to Storyo!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to log in. Please check your credentials.');
      setError('Invalid email or password.');
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      toast.success('Logged in with Google!');
      navigate('/dashboard');
    } catch (err) {
      console.error("Google Login Error:", err);
      toast.error(err.message || 'Failed to log in with Google.');
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#fffbf0]">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="canyon-bg" />
        <div className="overlay-warm" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#333333]/60 hover:text-teal-600 transition-colors mb-8 group">
          <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Storyo
        </Link>

        <div className="glass-card p-10 bg-white/80 border-white">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#333333] rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
              <FiLock size={32} />
            </div>
            <h2 className="text-3xl serif text-[#333333]">Welcome Back</h2>
            <p className="text-[#333333]/60 mt-2 font-medium italic">Ready for another adventure?</p>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-600 p-4 rounded-2xl mb-6 text-sm border border-red-500/20 flex items-center gap-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#333333]/70 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333333]/30" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#333333]/10 focus:border-teal-500 rounded-2xl py-3.5 pl-12 pr-4 text-[#333333] placeholder-[#333333]/20 focus:outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-sm font-bold text-[#333333]/70">Password</label>
                <Link to="/forgot-password" hidden className="text-xs text-teal-600 hover:text-teal-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333333]/30" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#333333]/10 focus:border-teal-500 rounded-2xl py-3.5 pl-12 pr-12 text-[#333333] placeholder-[#333333]/20 focus:outline-none transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#333333]/30 hover:text-[#333333]"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full btn-teal py-4 mt-2 text-lg"
            >
              {loading ? "Signing in..." : "Sign In to Storyo"}
              {!loading && <FiArrowRight className="inline ml-2" />}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#333333]/10"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
              <span className="bg-white px-4 text-[#333333]/30 font-bold">Or sign in with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border-2 border-[#333333]/10 text-[#333333] font-bold py-3.5 rounded-2xl hover:bg-[#fffbf0] transition-all flex items-center justify-center gap-3"
          >
            <FcGoogle size={20} />
            Google
          </button>
        </div>

        <p className="text-center text-[#333333]/40 mt-8 font-bold">
          New to Storyo?{" "}
          <Link to="/signup" className="text-teal-600 hover:text-teal-700 transition-colors">
            Create an Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
