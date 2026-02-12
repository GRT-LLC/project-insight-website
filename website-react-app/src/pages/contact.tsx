import { useState } from 'react';
import { Mail, Check, ArrowRight} from 'lucide-react';

interface ContactPageProps {
  navigate: (page: string) => void;
}

export const ContactPage = ({ navigate }: ContactPageProps) => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
  
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('Contact form submission:', formData);
      setSubmitted(true);
    };
  
    return (
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-xl text-gray-600">Have questions? We'd love to hear from you.</p>
          </div>
        </section>
  
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                      <select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="waitlist">Waitlist Questions</option>
                        <option value="partnership">Partnership Opportunities</option>
                        <option value="press">Press & Media</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                      <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" required />
                    </div>
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">Send Message</button>
                  </form>
                )}
              </div>
  
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Other Ways to Reach Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4"><Mail className="w-6 h-6 text-blue-600" /></div>
                      <div><div className="font-medium text-gray-900">Email</div><a href="mailto:hello@jarvistravel.com" className="text-blue-600 hover:text-blue-800">hello@jarvistravel.com</a></div>
                    </div>
                  </div>
                </div>
  
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Looking for Support?</h4>
                  <p className="text-gray-600 mb-4">Check out our FAQ section for quick answers to common questions.</p>
                  <button onClick={() => navigate('pricing')} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">Visit FAQ<ArrowRight className="w-4 h-4 ml-1" /></button>
                </div>
  
                <div className="bg-gray-900 text-white rounded-2xl p-8">
                  <h4 className="font-semibold mb-4">For Press & Media</h4>
                  <p className="text-gray-300 mb-4">For press inquiries, interviews, or media resources, please contact our media team.</p>
                  <a href="mailto:press@jarvistravel.com" className="text-blue-400 hover:text-blue-300 font-medium">press@jarvistravel.com</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }