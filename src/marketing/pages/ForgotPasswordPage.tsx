import { useState } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { useMarketingRouter } from '../router/RouterContext';

export function ForgotPasswordPage() {
  const { navigate } = useMarketingRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 7) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleSubmit = () => {
    setError('');
    if (step === 1 && email) {
      setStep(2);
    } else if (step === 2 && code.every((c) => c)) {
      setStep(3);
    } else if (step === 3) {
      if (newPassword.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      navigate('signin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <button
            type="button"
            onClick={() => navigate('home')}
            className="inline-flex items-center cursor-pointer mb-8"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold text-white">JarvisTravel</span>
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          {error && (
            <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 mb-6">
              <AlertCircle className="w-5 h-5 mr-3" />
              {error}
            </div>
          )}

          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
              <p className="text-white/60 mb-6">Enter your email and we'll send you a reset code</p>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Enter Reset Code</h2>
              <p className="text-white/60 mb-6">We sent an 8-digit code to {email}</p>
              <div className="flex justify-between space-x-2">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    id={`code-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    className="w-10 h-12 text-center bg-white/10 border border-white/20 rounded-lg text-white text-xl font-bold focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                ))}
              </div>
              <button
                type="button"
                className="mt-4 text-sky-400 text-sm hover:text-sky-300"
              >
                Resend code
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">Create New Password</h2>
              <p className="text-white/60 mb-6">Enter your new password below</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    placeholder="Min. 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-6 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-sky-500/25 transition-all"
          >
            {step === 1 ? 'Send Reset Code' : step === 2 ? 'Verify Code' : 'Reset Password'}
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('signin')}
              className="text-white/60 hover:text-white/80"
            >
              ← Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
