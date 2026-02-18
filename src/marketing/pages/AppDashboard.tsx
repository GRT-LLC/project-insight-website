import { MapPin } from 'lucide-react';
import { useMarketingRouter } from '../router/RouterContext';

export function AppDashboard() {
  const { logout, user } = useMarketingRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-sm p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to JarvisTravel, {user?.name}!
          </h1>
          <p className="text-gray-600 mb-8">
            Your dashboard is ready. This is where your full app would render.
          </p>

          <div className="inline-block bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-amber-800 mb-2">🔌 Integration Point</h3>
            <p className="text-amber-700 text-sm">
              Replace this component with your full app dashboard.
              <br />
              See the integration guide for details.
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
