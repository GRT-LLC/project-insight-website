import { useState } from "react"
import { Sparkles, DollarSign, Bell, Users, Check, MapPin, Twitter } from 'lucide-react'

interface WaitlistPageProps {
    navigate: (page: string) => void;
  }

const [submitted, setSubmitted] = useState(false);
const [position, setPosition] = useState(1);
  
const travelInterests = ['Adventure Travel', 'Beach & Relaxation', 'Cultural Experiences', 'Food & Culinary', 'Business Travel', 'Family Vacations', 'Solo Travel', 'Luxury Travel'];

type TravelInterest =
  | 'Adventure Travel'
  | 'Beach & Relaxation'
  | 'Cultural Experiences'
  | 'Food & Culinary'
  | 'Business Travel'
  | 'Family Vacations'
  | 'Solo Travel'
  | 'Luxury Travel';

interface WaitlistFormData {
  email: string;
  name: string;
  travelFrequency: string;
  interests: TravelInterest[];
}

const [formData, setFormData] = useState<WaitlistFormData>({
  email: '',
  name: '',
  travelFrequency: '',
  interests: [],
});

const handleInterestToggle = (interest: TravelInterest) => {
  setFormData((prev) => ({
    ...prev,
    interests: prev.interests.includes(interest)
      ? prev.interests.filter((i) => i !== interest)
      : [...prev.interests, interest],
  }));
};

const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
    console.log('Waitlist signup:', formData);
    setPosition(Math.floor(Math.random() * 5000) + 1000);
    setSubmitted(true);
};

export const WaitlistPage = ({ navigate }: WaitlistPageProps) => {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {submitted ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">You're on the List!</h1>
              <p className="text-xl text-gray-600 mb-8">Thanks for joining the JarvisTravel waitlist, {formData.name}!</p>
              
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <div className="text-6xl font-bold mb-2">#{position.toLocaleString()}</div>
                <div className="text-blue-100">Your position in line</div>
              </div>
  
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5"><span className="text-sm font-bold text-blue-600">1</span></div><span className="text-gray-600">We'll send you a confirmation email shortly</span></li>
                  <li className="flex items-start"><div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5"><span className="text-sm font-bold text-blue-600">2</span></div><span className="text-gray-600">You'll receive early access when we launch</span></li>
                  <li className="flex items-start"><div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5"><span className="text-sm font-bold text-blue-600">3</span></div><span className="text-gray-600">Get 30% off your first year as a waitlist member</span></li>
                </ul>
              </div>
  
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigate('home')} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">Back to Home</button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center"><Twitter className="w-5 h-5 mr-2" />Share on Twitter</button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2">
                <div className="sticky top-24">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <span className="ml-3 text-2xl font-bold text-gray-900">JarvisTravel</span>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">Join the Waitlist</h1>
                  <p className="text-gray-600 mb-8">Be among the first to experience AI-powered travel planning when we launch.</p>
  
                  <div className="space-y-4">
                    {[
                      { icon: Sparkles, text: 'Early access to all features' },
                      { icon: DollarSign, text: '30% off your first year' },
                      { icon: Bell, text: 'Exclusive updates & tips' },
                      { icon: Users, text: 'Join 10,000+ travelers' }
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <benefit.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
  
              <div className="md:col-span-3">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
  
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
  
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">How often do you travel?</label>
                      <select value={formData.travelFrequency} onChange={(e) => setFormData({...formData, travelFrequency: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="">Select frequency</option>
                        <option value="rarely">Rarely (1-2 times/year)</option>
                        <option value="occasionally">Occasionally (3-5 times/year)</option>
                        <option value="frequently">Frequently (6-10 times/year)</option>
                        <option value="very-frequently">Very Frequently (11+ times/year)</option>
                      </select>
                    </div>
  
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">What types of travel interest you? (Select all that apply)</label>
                      <div className="grid grid-cols-2 gap-3">
                        {travelInterests.map((interest) => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => handleInterestToggle(interest as TravelInterest)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              formData.interests.includes(interest as TravelInterest) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >{interest}</button>
                        ))}
                      </div>
                    </div>
  
                    <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">Join the Waitlist</button>
  
                    <p className="text-center text-sm text-gray-500">
                      By joining, you agree to our{' '}
                      <button type="button" onClick={() => navigate('privacy')} className="text-blue-600 hover:text-blue-800">Privacy Policy</button>
                      {' '}and{' '}
                      <button type="button" onClick={() => navigate('terms')} className="text-blue-600 hover:text-blue-800">Terms of Service</button>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  