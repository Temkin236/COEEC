import React from 'react';
import Hero from '../components/Hero';
import { LATEST_NEWS } from '../constants';
import { Calendar, Tag, User, ArrowRight } from 'lucide-react';

const News: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Hero
        title="News & Events"
        subtitle="Stay updated with the latest happenings, research breakthroughs, and community stories."
        image="https://picsum.photos/1920/600?random=105"
        breadcrumbs={[{ label: 'News' }]}
        parentSection="Media Center"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {LATEST_NEWS.map((news) => (
              <div key={news.id} className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                 <div className="h-60 overflow-hidden relative">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4">
                       <span className="bg-white/90 backdrop-blur-md text-primary text-xs font-bold px-3 py-1.5 rounded shadow-sm">
                          {news.category}
                       </span>
                    </div>
                 </div>
                 
                 <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 border-b border-gray-100 pb-4">
                       <div className="flex items-center gap-1">
                          <Calendar size={14} /> {news.date}
                       </div>
                       <div className="flex items-center gap-1">
                          <User size={14} /> Admin
                       </div>
                    </div>
                    
                    <h3 className="text-xl font-bold font-serif text-gray-900 mb-4 group-hover:text-primary transition-colors">
                       {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                       {news.excerpt}
                    </p>
                    
                    <a href="#" className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary mt-auto">
                       Read Full Story <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                 </div>
              </div>
            ))}
            
            {/* Mock Additional News Items to fill grid */}
            {[4, 5, 6].map((i) => (
               <div key={i} className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                 <div className="h-60 overflow-hidden relative">
                    <img 
                      src={`https://picsum.photos/800/600?random=${20+i}`} 
                      alt="News" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4">
                       <span className="bg-white/90 backdrop-blur-md text-primary text-xs font-bold px-3 py-1.5 rounded shadow-sm">
                          Campus Life
                       </span>
                    </div>
                 </div>
                 <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 border-b border-gray-100 pb-4">
                       <div className="flex items-center gap-1">
                          <Calendar size={14} /> Sept {10+i}, 2025
                       </div>
                    </div>
                    <h3 className="text-xl font-bold font-serif text-gray-900 mb-4 group-hover:text-primary transition-colors">
                       Annual Innovation Hackathon Winners Announced
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                       Students from the CSE department took home the grand prize for their automated irrigation system powered by AI.
                    </p>
                    <a href="#" className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary mt-auto">
                       Read Full Story <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                 </div>
              </div>
            ))}
         </div>

         {/* Pagination */}
         <div className="flex justify-center mt-20">
            <nav className="flex items-center gap-2">
               <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors disabled:opacity-50">
                  &larr;
               </button>
               <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold shadow-md">1</button>
               <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">2</button>
               <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">3</button>
               <span className="text-gray-400 px-2">...</span>
               <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors">
                  &rarr;
               </button>
            </nav>
         </div>
      </div>
    </div>
  );
};

export default News;