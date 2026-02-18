
interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

interface Value {
  title: string;
  desc: string;
}

const TEAM: TeamMember[] = [
  { name: 'Alex Rivera', role: 'CEO & Founder', bio: 'Former Google PM. 50+ countries visited.' },
  {
    name: 'Dr. Sarah Kim',
    role: 'Chief Science Officer',
    bio: 'PhD in Sleep Medicine. Created Fatigue Index™.',
  },
  {
    name: 'James Chen',
    role: 'CTO',
    bio: 'Ex-Airbnb engineer. Built booking systems at scale.',
  },
];

const VALUES: Value[] = [
  {
    title: 'Traveler First',
    desc: 'Every feature starts with "How does this make travel better?"',
  },
  {
    title: 'Science-Backed',
    desc: 'Our Fatigue Index™ is based on peer-reviewed sleep research.',
  },
  {
    title: 'Privacy Respected',
    desc: 'Your data is yours. We never sell it, period.',
  },
];

export function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-br from-slate-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Mission</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe travel should energize you, not exhaust you. JarvisTravel was born from
              frustration with jet-lagged first days and over-packed itineraries. We're building the
              AI travel assistant we always wished we had.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {TEAM.map((member, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sky-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-12 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {VALUES.map((value, i) => (
                <div key={i} className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
