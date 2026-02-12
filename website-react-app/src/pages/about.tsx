import { Zap, Sparkles, Shield, Globe } from 'lucide-react';

interface AboutPageProps {
  navigate: (page: string) => void;
}

export const AboutPage = ({ }: AboutPageProps) => {
    return (
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About JarvisTravel</h1>
            <p className="text-xl text-gray-600">We're on a mission to make travel planning effortless and enjoyable for everyone</p>
          </div>
        </section>
  
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">JarvisTravel was born from a simple frustration: planning trips shouldn't be stressful. Our founders, avid travelers themselves, spent countless hours juggling spreadsheets, bookmark folders, and messaging apps trying to coordinate trips with friends and family.</p>
              <p className="text-gray-600 mb-6">In 2023, we set out to build the travel companion we wished existed - an intelligent assistant that could handle everything from inspiration to booking to on-trip guidance. Using cutting-edge AI technology, we created Jarvis: your personal travel assistant.</p>
  
              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Our Mission</h2>
              <p className="text-gray-600 mb-6">To democratize luxury travel planning by making personalized, intelligent travel assistance accessible to everyone, regardless of budget or experience level.</p>
  
              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Simplicity', desc: 'Travel planning should be effortless', icon: Zap },
                  { title: 'Intelligence', desc: 'AI that truly understands your needs', icon: Sparkles },
                  { title: 'Privacy', desc: 'Your data is yours and yours alone', icon: Shield },
                  { title: 'Accessibility', desc: 'Great travel experiences for everyone', icon: Globe }
                ].map((value, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <value.icon className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.desc}</p>
                  </div>
                ))}
              </div>
  
              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">The Team</h2>
              <p className="text-gray-600 mb-6">We're a diverse team of travelers, engineers, designers, and dreamers united by our passion for exploration. Based across multiple time zones, we understand the challenges of travel firsthand.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }