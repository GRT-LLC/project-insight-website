import { Shield, Check, ArrowRight } from 'lucide-react';

export function DataSecurityPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Data, Your Control
          </h1>
          <p className="text-xl text-gray-600">
            We take your privacy and data security seriously
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Security</h2>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">256-bit Encryption</h3>
                      <p className="text-gray-600">All data is encrypted both in transit and at rest using bank-level encryption standards</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">PCI DSS Compliant</h3>
                      <p className="text-gray-600">Our payment processing meets the highest industry security standards</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Regular Security Audits</h3>
                      <p className="text-gray-600">Third-party security experts regularly audit our systems</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Privacy</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What We Collect</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Account information</li>
                    <li>• Travel preferences</li>
                    <li>• Trip history</li>
                    <li>• Payment information (encrypted)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What We Don't Do</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Sell your data to third parties</li>
                    <li>• Share data without consent</li>
                    <li>• Store unencrypted payment details</li>
                    <li>• Track you across other sites</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Rights</h2>
              <div className="bg-blue-50 rounded-xl p-8">
                <p className="text-gray-700 mb-4">You have complete control over your data:</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Request a copy of all your data</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Delete your account and all associated data</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Opt-out of marketing communications</span>
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Update your information at any time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
