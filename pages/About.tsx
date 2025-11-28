import React from 'react';
import { Target, Eye, History, Quote, Users, CheckCircle, GraduationCap, Building, Globe, Award, BookOpen } from 'lucide-react';
import Hero from '../components/Hero';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      <Hero 
        title="About the College"
        subtitle="Pioneering engineering education and innovation in Ethiopia since 1993."
        image="https://picsum.photos/1920/600?random=20"
        breadcrumbs={[{ label: 'About Us' }]}
        parentSection="Who We Are"
      />

      {/* Dean's Message - Asymmetric Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 relative">
             <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
               <img 
                 src="https://picsum.photos/600/700?random=30" 
                 alt="Dean Dr. Berhanu Bulcha" 
                 className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                  <h3 className="text-2xl font-serif font-bold">Dr. Berhanu Bulcha</h3>
                  <p className="text-blue-200 font-medium tracking-wide uppercase text-sm">Dean, COEEC</p>
               </div>
             </div>
             {/* Decorative Elements */}
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary rounded-tl-3xl -z-0"></div>
             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-br-3xl -z-0"></div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
             <div>
                <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Leadership</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Building the Future of Engineering</h2>
             </div>
             
             <div className="relative pl-8 border-l-4 border-secondary/50">
                <Quote className="absolute -top-2 left-8 text-primary/10 w-16 h-16 transform -scale-x-100" />
                <p className="text-xl md:text-2xl font-serif text-gray-700 italic leading-relaxed relative z-10">
                   "We are not just teaching engineering; we are cultivating the mindset of innovation that will drive Ethiopia's digital transformation. Our students are the architects of tomorrow."
                </p>
             </div>

             <div className="prose text-gray-600 leading-relaxed">
                <p>
                  Welcome to the College of Electrical Engineering and Computing (COEEC). For over three decades, we have been at the forefront of technological advancement in the region. 
                  Our curriculum balances rigorous theoretical foundations with hands-on practical experience, ensuring our graduates are industry-ready from day one.
                </p>
                <p>
                  I invite you to explore our vibrant community, where cutting-edge research meets social impact.
                </p>
             </div>
             
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Signature" className="h-12 opacity-50 mt-4" />
          </div>
        </div>
      </section>

      {/* Strategic Pillars - Bento Grid */}
      <section className="bg-gray-50 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-serif font-bold text-gray-900">Our Strategic Pillars</h2>
               <p className="text-gray-500 mt-4 max-w-2xl mx-auto">The core principles that guide our academic and operational excellence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
               {/* Mission - Large Block */}
               <div className="md:col-span-2 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>
                  <Target className="w-12 h-12 text-primary mb-6 relative z-10" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">Our Mission</h3>
                  <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                     To produce competent, innovative, and ethical professionals in electrical engineering and computing through quality education, 
                     problem-solving research, and community-oriented services that contribute to the sustainable development of the nation.
                  </p>
               </div>

               {/* Vision - Tall Block */}
               <div className="bg-primary text-white p-10 rounded-2xl shadow-lg shadow-primary/20 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-900 to-black opacity-50"></div>
                  <Eye className="w-12 h-12 text-secondary mb-6 relative z-10" />
                  <div className="relative z-10">
                     <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                     <p className="text-blue-100 leading-relaxed">
                        To be a premier center of excellence in applied engineering and computing in East Africa by 2030, recognized for high-quality graduates and impactful innovations.
                     </p>
                  </div>
               </div>

               {/* Core Values - 3 Small Blocks */}
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-secondary/50 transition-colors">
                  <Award className="w-8 h-8 text-secondary mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">Excellence</h4>
                  <p className="text-sm text-gray-500">Striving for the highest standards in teaching and research.</p>
               </div>
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-secondary/50 transition-colors">
                  <Users className="w-8 h-8 text-secondary mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">Inclusivity</h4>
                  <p className="text-sm text-gray-500">Fostering a diverse and welcoming academic environment.</p>
               </div>
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-secondary/50 transition-colors">
                  <CheckCircle className="w-8 h-8 text-secondary mb-4" />
                  <h4 className="font-bold text-gray-900 mb-2">Integrity</h4>
                  <p className="text-sm text-gray-500">Upholding honesty, ethics, and accountability in all actions.</p>
               </div>
            </div>
         </div>
      </section>

      {/* History - Vertical Timeline */}
      <section className="py-24 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-16">
               <div className="md:w-1/3">
                  <div className="sticky top-24">
                     <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Our Journey</span>
                     <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Three Decades of Growth</h2>
                     <p className="text-gray-600 mb-8">
                        From a small department to a leading college, our history is defined by resilience, expansion, and a relentless pursuit of academic quality.
                     </p>
                     <img src="https://picsum.photos/400/300?random=35" className="rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500" alt="Old Campus" />
                  </div>
               </div>

               <div className="md:w-2/3 relative">
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>
                  
                  <div className="space-y-12">
                     {[
                        { year: '1993', title: 'Foundation', desc: 'Established as the Department of Electrical Engineering under Nazareth Technical College.' },
                        { year: '2006', title: 'University Status', desc: 'Upgraded to Adama University, expanding programs to include Computer Science.' },
                        { year: '2011', title: 'Center of Excellence', desc: 'Designated as a Science and Technology University (ASTU) by the Ministry of Education.' },
                        { year: '2018', title: 'New Complex', desc: 'Inauguration of the dedicated COEEC building with state-of-the-art laboratories.' },
                        { year: '2023', title: 'PhD Programs', desc: 'Launched PhD programs in Power Engineering and Software Engineering.' },
                     ].map((item, idx) => (
                        <div key={idx} className="relative flex gap-8 group">
                           <div className="flex-shrink-0 w-16 h-16 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center font-bold text-primary shadow-sm z-10 group-hover:border-secondary transition-colors">
                              {item.year}
                           </div>
                           <div className="pt-2 pb-8">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-gray-50 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-serif font-bold text-gray-900">Administration</h2>
               <div className="w-16 h-1 bg-secondary mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  { name: 'Dr. Berhanu Bulcha', role: 'Dean', img: 30 },
                  { name: 'Dr. Sarah Ahmed', role: 'Vice Dean, Academics', img: 7 },
                  { name: 'Mr. Dawit Tadesse', role: 'Vice Dean, Research', img: 8 },
                  { name: 'Ms. Tigist Alemu', role: 'Head, Administration', img: 9 },
               ].map((person, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group">
                     <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-gray-50 group-hover:border-primary/20 transition-colors">
                        <img src={`https://picsum.photos/300/300?random=${person.img}`} alt={person.name} className="w-full h-full object-cover" />
                     </div>
                     <h3 className="text-lg font-bold text-gray-900 mb-1">{person.name}</h3>
                     <p className="text-primary text-sm font-medium uppercase tracking-wide">{person.role}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-primary py-16 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
               {[
                  { label: 'Academic Programs', val: '12', icon: BookOpen },
                  { label: 'Faculty Members', val: '150+', icon: Users },
                  { label: 'Research Papers', val: '5k+', icon: Globe },
                  { label: 'Active Labs', val: '18', icon: Building },
               ].map((stat, idx) => (
                  <div key={idx} className="text-center px-4">
                     <stat.icon className="w-8 h-8 mx-auto mb-4 text-secondary opacity-80" />
                     <div className="text-4xl font-bold mb-2">{stat.val}</div>
                     <div className="text-xs md:text-sm text-blue-200 uppercase tracking-widest">{stat.label}</div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;