import React from 'react';
import Hero from '../components/Hero';
import { Users, Briefcase, GraduationCap, ArrowUpRight, Calendar } from 'lucide-react';

const Students: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Hero
        title="Student Life"
        subtitle="Empowering students to excel inside and outside the classroom."
        image="https://picsum.photos/1920/600?random=50"
        breadcrumbs={[{ label: 'Students' }]}
        parentSection="Campus Community"
      />

      {/* Intro Stats/Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
             { label: "Student Clubs", count: "15+", icon: Users, link: "#clubs" },
             { label: "Internships", count: "50+", icon: Briefcase, link: "#career" },
             { label: "Alumni Network", count: "3000+", icon: GraduationCap, link: "#alumni" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-lg flex items-center justify-between border-b-4 border-secondary group hover:-translate-y-1 transition-transform">
               <div>
                  <h3 className="text-4xl font-bold text-primary mb-1">{item.count}</h3>
                  <p className="text-gray-600 font-medium">{item.label}</p>
               </div>
               <item.icon size={48} className="text-gray-200 group-hover:text-secondary transition-colors" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-24">
        
        {/* Student Clubs Section */}
        <section id="clubs" className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div>
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Get Involved</span>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Student Clubs & Societies</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                 Join a community of like-minded peers. From the <strong>Tech Innovators Club</strong> to the <strong>Robotics Society</strong>, 
                 COEEC offers vibrant extracurriculars that enhance your technical skills and soft skills alike.
              </p>
              <ul className="space-y-4 mb-8">
                 {['Annual Hackathon Organizers', 'Women in Engineering (WiE)', 'Coding Bootcamps'].map(item => (
                    <li key={item} className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                       <span className="font-medium text-gray-800">{item}</span>
                    </li>
                 ))}
              </ul>
              <button className="bg-primary text-white font-bold px-8 py-3 rounded hover:bg-blue-800 transition-colors">
                 View All Clubs
              </button>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/400/500?random=60" alt="Students 1" className="rounded-lg shadow-md mt-8" />
              <img src="https://picsum.photos/400/500?random=61" alt="Students 2" className="rounded-lg shadow-md" />
           </div>
        </section>

        {/* Career Section */}
        <section id="career" className="bg-gray-50 rounded-2xl p-8 md:p-16">
           <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Career & Development Center</h2>
              <p className="text-gray-600">
                 We bridge the gap between academia and industry. Connect with top employers and secure your future.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                 { title: "Internship Program", desc: "Gain credits while working with industry partners like Ethio Telecom." },
                 { title: "Job Fair 2025", desc: "Meet recruiters from 20+ tech companies this Spring." },
                 { title: "Resume Workshops", desc: "Weekly sessions to refine your CV and interview skills." },
              ].map((item, idx) => (
                 <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.desc}</p>
                    <a href="#" className="text-primary font-bold text-sm flex items-center hover:text-secondary">
                       Learn More <ArrowUpRight size={14} className="ml-1"/>
                    </a>
                 </div>
              ))}
           </div>
        </section>

        {/* Alumni Section */}
        <section id="alumni" className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
               <img src="https://picsum.photos/800/600?random=62" alt="Alumni" className="rounded-xl shadow-lg" />
            </div>
            <div className="md:w-1/2">
               <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Alumni Network</span>
               <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Stay Connected</h2>
               <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Your relationship with COEEC doesn't end at graduation. Join our global alumni network to mentor current students, 
                  network with professionals, and stay updated on university news.
               </p>
               <div className="flex gap-4">
                  <button className="bg-secondary text-primary font-bold px-6 py-3 rounded hover:bg-yellow-400 transition-colors">
                     Update Your Profile
                  </button>
                  <button className="border border-gray-300 text-gray-700 font-bold px-6 py-3 rounded hover:bg-gray-50 transition-colors">
                     Give Back
                  </button>
               </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default Students;