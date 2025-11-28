
import React from 'react';
import { ArrowRight, Calendar, ArrowUpRight, PlusCircle, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LATEST_NEWS, IMPACT_STATS, QUICK_LINKS, UPCOMING_EVENTS, PARTNERS, DEPARTMENTS } from '../constants';
import * as LucideIcons from 'lucide-react';

// Dynamic Icon Component
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = (LucideIcons as any)[name];
  return LucideIcon ? <LucideIcon className={className} /> : null;
};

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Unique Hero Section with Curve */}
      <section className="relative h-[600px] md:h-[700px] flex items-center bg-primary">
        <div className="absolute inset-0 z-0">
           <img 
            src="https://picsum.photos/1920/1080?random=100" 
            alt="University Building" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
        </div>

        {/* Decorative Curve SVG */}
        <div className="absolute top-0 right-0 h-full w-1/2 hidden lg:block z-10 pointer-events-none">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full text-white fill-current opacity-10">
              <path d="M0 0 C 30 50 50 100 100 100 V 0 Z" />
           </svg>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full pt-16">
          <div className="max-w-2xl text-white">
            <div className="w-20 h-1 bg-secondary mb-6"></div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              SEEK WISDOM, <br/>
              ELEVATE YOUR INTELLECT
            </h1>
            <p className="text-lg text-blue-100 mb-10 leading-relaxed max-w-xl">
              COEEC provides an exceptional educational experience that prepares students for successful completion, employability, and job creation in the digital age.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-white text-primary font-bold px-8 py-3.5 rounded hover:bg-secondary hover:text-primary transition-colors flex items-center gap-2">
                Portal <ArrowUpRight size={18} />
              </Link>
              <Link to="/departments" className="border border-white text-white font-bold px-8 py-3.5 rounded hover:bg-white hover:text-primary transition-colors flex items-center gap-2">
                Study at COEEC <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact in Numbers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
               <p className="text-gray-500 text-sm font-medium mb-2">Statistics</p>
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Our Impact in Numbers</h2>
               <div className="w-16 h-1 bg-gradient-to-r from-secondary to-primary mt-4"></div>
            </div>
            <Link to="/about" className="hidden md:flex items-center text-primary font-bold hover:text-secondary transition-colors text-sm">
               View all <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {IMPACT_STATS.map((stat, index) => (
              <div key={index} className={`p-8 border border-gray-100 rounded-lg text-center hover:shadow-xl transition-shadow duration-300 group ${index === 0 ? 'bg-primary text-white border-none' : 'bg-white'}`}>
                <div className={`mx-auto w-12 h-12 mb-6 flex items-center justify-center rounded-full ${index === 0 ? 'bg-white/20' : 'bg-gray-100 text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors'}`}>
                  <Icon name={stat.icon} className="w-6 h-6" />
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${index === 0 ? 'text-white' : 'text-primary'}`}>{stat.value}</h3>
                <p className={`font-bold text-sm mb-3 uppercase tracking-wide ${index === 0 ? 'text-blue-100' : 'text-gray-900'}`}>{stat.label}</p>
                <p className={`text-xs leading-relaxed ${index === 0 ? 'text-blue-200' : 'text-gray-500'}`}>{stat.description}</p>
                
                {index === 0 && (
                  <Link to="/students" className="mt-6 w-full bg-white text-primary font-bold py-2 rounded text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-1">
                    View List <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Strip */}
      <section className="bg-primary text-white py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
             <div className="py-4 pr-8 font-serif text-sm italic text-gray-400 border-b md:border-b-0 md:border-r border-gray-700 w-full md:w-auto text-center md:text-left">
               QUICK LINKS :
             </div>
             <div className="flex flex-wrap justify-center md:justify-start flex-1">
               {QUICK_LINKS.map((link, idx) => (
                 <Link key={idx} to={link.url.startsWith('#') ? '#' : link.url} className="px-6 py-5 text-xs font-bold hover:bg-secondary hover:text-primary transition-colors border-r border-gray-700 last:border-r-0 flex items-center gap-2">
                   {link.label} <ArrowUpRight size={12} className="opacity-50" />
                 </Link>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Campus Life Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://picsum.photos/1920/1080?random=101" alt="Campus Life" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white max-w-sm p-8 rounded-lg shadow-2xl transform translate-y-0 lg:translate-y-8">
            <span className="bg-secondary text-primary text-xs font-bold px-3 py-1 uppercase tracking-wide mb-4 inline-block">Every Campus</span>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Events and Activities</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Our students engage in events, activities, and clubs year-round across all campuses. From holiday celebrations to club involvement and voluntary work, we offer plenty of opportunities to socialize.
            </p>
            <Link to="/news" className="text-primary font-bold text-sm flex items-center hover:text-secondary transition-colors">
              View Gallery <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none hidden lg:block">
             <h2 className="text-6xl font-serif font-bold text-white tracking-tight drop-shadow-md">CAMPUS LIFE</h2>
             <button className="mt-8 pointer-events-auto">
               <PlusCircle size={48} className="text-white hover:text-secondary transition-colors" />
             </button>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gray-500 text-sm font-medium mb-2">Latest News</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">What's New</h2>
            <div className="w-16 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Featured Article (Left) */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg mb-6">
                <img src={LATEST_NEWS[0].image} alt={LATEST_NEWS[0].title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                <Link to={`/news/${LATEST_NEWS[0].id}`}>{LATEST_NEWS[0].title}</Link>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">{LATEST_NEWS[0].excerpt}</p>
              <div className="text-sm text-gray-400">{LATEST_NEWS[0].date}</div>
            </div>

            {/* Side Articles (Right) */}
            <div className="space-y-8">
              {LATEST_NEWS.slice(1).map((news) => (
                <div key={news.id} className="flex gap-6 group cursor-pointer border-b border-gray-200 pb-8 last:border-0 last:pb-0">
                  <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded-md">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                       <Link to={`/news/${news.id}`}>{news.title}</Link>
                    </h4>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-2">{news.excerpt}</p>
                    <span className="text-xs text-gray-400">{news.date}</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <Link to="/news" className="bg-primary text-white font-bold px-6 py-3 rounded text-sm hover:bg-blue-800 transition-colors inline-flex items-center gap-2">
                  VIEW MORE NEWS <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Departments/Campuses */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-12">
               <p className="text-blue-300 text-sm font-medium mb-2">Campuses</p>
               <h2 className="text-3xl font-serif font-bold text-white mb-4">Explore our Departments</h2>
               <div className="w-16 h-1 bg-secondary"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div>
                  <h3 className="text-xl font-bold text-secondary uppercase tracking-widest mb-4">SEFERE SELAM CAMPUS</h3>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    Sefere Selam Campus is a hub of research and medical training centers offering qualifications in several domains.
                    Home to our main computing laboratories and the central library.
                  </p>
                  <Link to="/departments" className="bg-white text-primary font-bold px-6 py-3 rounded text-sm hover:bg-secondary hover:text-primary transition-colors inline-flex items-center gap-2">
                    Explore this Campus <ArrowUpRight size={16} />
                  </Link>
               </div>
               <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg overflow-hidden h-64 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                       <img src={`https://picsum.photos/300/500?random=${120+i}`} alt="Campus" className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-12">
              <div>
                 <p className="text-gray-500 text-sm font-medium mb-2">AAU in motion</p>
                 <h2 className="text-3xl font-serif font-bold text-gray-900 mt-1">Upcoming Events</h2>
                 <div className="w-16 h-1 bg-secondary mt-4"></div>
              </div>
              <Link to="/news" className="flex items-center text-sm font-bold text-gray-800 hover:text-primary transition-colors">
                View all <ArrowUpRight size={16} className="ml-1" />
              </Link>
           </div>

           <div className="space-y-4">
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.id} className="group flex items-center bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-lg p-6 rounded-lg transition-all duration-300 cursor-pointer">
                   <div className="bg-primary text-white p-4 rounded text-center min-w-[80px] group-hover:bg-secondary group-hover:text-primary transition-colors">
                      <span className="block text-sm font-medium uppercase">{event.month}</span>
                      <span className="block text-3xl font-bold">{event.day}</span>
                   </div>
                   <div className="ml-8 flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                         <Clock size={14} className="mr-2" />
                         {event.time}
                      </div>
                   </div>
                   <div className="hidden md:block">
                      <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 group-hover:border-primary group-hover:text-primary transition-colors">
                         <ArrowRight size={20} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-100 py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-serif text-gray-600 mb-2 uppercase tracking-widest">Featured Partners</h2>
            <p className="text-gray-500 text-sm mb-12">If you are interested in becoming a partner, please feel free to contact us.</p>
            
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
               {PARTNERS.map((partner, idx) => (
                  <div key={idx} className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center p-4 shadow-sm hover:scale-110 transition-transform">
                     <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" />
                  </div>
               ))}
            </div>

            <div className="mt-16 flex justify-between items-center max-w-2xl mx-auto text-center">
               <button className="text-gray-400 hover:text-primary"><ChevronLeft size={24}/></button>
               <div>
                  <h4 className="font-bold text-gray-900">Africa Special NEP (RSAS)</h4>
                  <p className="text-xs text-gray-500 mt-1">Empowering teachers and families with disability children, joint studies, and research and training activities.</p>
               </div>
               <button className="text-gray-400 hover:text-primary"><ChevronRight size={24}/></button>
            </div>
            
            <div className="mt-8">
               <Link to="/contact" className="text-xs font-bold text-primary flex items-center justify-center hover:text-secondary">
                  View all <ArrowUpRight size={12} className="ml-1" />
               </Link>
            </div>
         </div>
      </section>

      {/* Subscribe Section */}
      <section className="bg-white py-16 border-t border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
               <div className="bg-white p-2 border border-gray-100 rounded shadow-sm">
                  {/* Mock Emblem */}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Emblem_of_Ethiopia.svg/1200px-Emblem_of_Ethiopia.svg.png" className="w-16 h-16 object-contain opacity-50" alt="Emblem"/>
               </div>
               <h3 className="text-xl font-bold font-serif text-gray-800 uppercase tracking-wide">Subscribe to our newsletter.</h3>
            </div>
            
            <form className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
               <input type="email" placeholder="Enter your email" className="px-4 py-3 border border-gray-300 rounded w-full md:w-80 focus:outline-none focus:border-primary" />
               <button className="bg-primary text-white font-bold px-6 py-3 rounded hover:bg-blue-800 transition-colors">Subscribe</button>
            </form>
         </div>
      </section>
    </div>
  );
};

export default Home;
