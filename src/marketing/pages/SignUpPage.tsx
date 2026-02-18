import { useState, Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TravelStyle {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

interface Budget {
  id: string;
  name: string;
  range: string;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  travelStyle: string;
  budget: string;
}

const TRAVEL_STYLES: TravelStyle[] = [
  { id: 'adventure', name: 'Adventure', icon: '🏔️', desc: 'Hiking, outdoor activities' },
  { id: 'cultural', name: 'Cultural', icon: '🏛️', desc: 'Museums, history, art' },
  { id: 'relaxation', name: 'Relaxation', icon: '🏖️', desc: 'Beaches, spas, downtime' },
  { id: 'foodie', name: 'Foodie', icon: '🍽️', desc: 'Culinary experiences' },
];

const BUDGETS: Budget[] = [
  { id: 'budget', name: 'Budget', range: '$50-100/day' },
  { id: 'mid', name: 'Mid-Range', range: '$100-250/day' },
  { id: 'luxury', name: 'Luxury', range: '$250+/day' },
];

export function SignUpPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    travelStyle: '',
    budget: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validateStep = (): boolean => {
    setError('');
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('All fields are required');
        return false;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    if (step === 2 && (!formData.firstName || !formData.lastName)) {
      setError('Please enter your name');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        login({ email: formData.email, name: formData.firstName });
      }
    }
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center cursor-pointer mb-8"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold text-white">JarvisTravel</span>
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            {[1, 2, 3].map((s) => (
              <Fragment key={s}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    s <= step ? 'bg-sky-500 text-white' : 'bg-white/20 text-white/50'
                  }`}
                >
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 rounded-full ${
                      s < step ? 'bg-sky-500' : 'bg-white/20'
                    }`}
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
          {error && (
            <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 mb-6">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
              <p className="text-white/60 mb-6">Start your journey with JarvisTravel</p>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all pr-12"
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-white mb-2">Tell Us About You</h2>
              <p className="text-white/60 mb-6">Help us personalize your experience</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">Travel Style</label>
                <div className="grid grid-cols-2 gap-3">
                  {TRAVEL_STYLES.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => updateFormData('travelStyle', style.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.travelStyle === style.id
                          ? 'bg-sky-500/30 border-sky-500'
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-2xl mb-1">{style.icon}</div>
                      <div className="text-white font-medium">{style.name}</div>
                      <div className="text-white/50 text-xs">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-white mb-2">Almost Done!</h2>
              <p className="text-white/60 mb-6">What's your typical travel budget?</p>

              <div className="space-y-3">
                {BUDGETS.map((budget) => (
                  <button
                    key={budget.id}
                    type="button"
                    onClick={() => updateFormData('budget', budget.id)}
                    className={`w-full p-4 rounded-xl border flex justify-between items-center transition-all ${
                      formData.budget === budget.id
                        ? 'bg-sky-500/30 border-sky-500'
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-white font-medium">{budget.name}</span>
                    <span className="text-white/60">{budget.range}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 text-center">
                <p className="text-white/50 text-sm">
                  By creating an account, you agree to our{' '}
                  <Link
                    to="/terms"
                    className="text-sky-400 hover:text-sky-300"
                  >
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link
                    to="/privacy"
                    className="text-sky-400 hover:text-sky-300"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          )}

          <div className="flex space-x-3 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className={`${
                step > 1 ? 'flex-1' : 'w-full'
              } py-4 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-sky-500/25 transition-all`}
            >
              {step === 3 ? 'Create Account' : 'Continue'}
            </button>
          </div>

          {step === 1 && (
            <div className="mt-6 text-center text-white/60">
              Already have an account?{' '}
              <Link
                to="/signin"
                className="text-sky-400 hover:text-sky-300 font-medium"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
