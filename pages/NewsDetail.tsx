
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { LATEST_NEWS } from '../constants';
import { Calendar, User, ArrowLeft, Share2, Printer, Facebook, Twitter, Linkedin, Home, ChevronRight } from 'lucide-react';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const news = LATEST_NEWS.find(n => n.id === Number(id));

  if (!news) {
    return <Navigate to="/news" replace />;
  }

  // Get other news for sidebar (excluding current)
  const relatedNews = LATEST_NEWS.filter(n => n.id !== news.id).slice(0, 3);

  return (
    <div className="bg-white min-h-screen">
      
      {/* Immersive Header */}
      <div className="relative h-[400px] md:h-[500px] bg-gray-900">
         <img 
           src={news.image} 
           alt={news.title} 
           className="absolute inset-0 w-full h-full object-cover opacity-50"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
         
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
            <div className="flex items-center text-xs text-gray-300 mb-6 font-medium">
               <Link to="/" className="hover:text-white flex items-center gap-1"><Home size={14}/> Home</Link>
               <ChevronRight size={14} className="mx-2 opacity-50"/>
               <Link to="/news" className="hover:text-white">News</Link>
               <ChevronRight size={14} className="mx-2 opacity-50"/>
               <span className="text-secondary line-clamp-1">{news.title}</span>
            </div>

            <span className="bg-secondary text-primary text-xs font-bold px-3 py-1 rounded w-fit uppercase tracking-wide mb-4">
               {news.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight max-w-4xl shadow-black drop-shadow-lg">
               {news.title}
            </h1>
            
            <div className="flex items-center gap-6 text-sm text-gray-200">
               <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {news.date}
               </div>
               {news.author && (
                  <div className="flex items-center gap-2">
                     <User size={16} />
                     By {news.author}
                  </div>
               )}
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Main Content */}
            <article className="lg:w-2/3">
               <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
                  <p className="font-bold text-xl text-gray-900 mb-8 border-l-4 border-secondary pl-4 leading-normal italic">
                     {news.excerpt}
                  </p>
                  
                  {/* Render HTML content safely - simulating rich text */}
                  {news.content ? (
                     <div dangerouslySetInnerHTML={{ __html: news.content }} />
                  ) : (
                     <>
                        <p>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                           Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                     </>
                  )}
               </div>

               <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex gap-2">
                     <span className="text-sm font-bold text-gray-500 mr-2">Share:</span>
                     <button className="bg-gray-100 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"><Facebook size={18} /></button>
                     <button className="bg-gray-100 p-2 rounded-full hover:bg-blue-400 hover:text-white transition-colors"><Twitter size={18} /></button>
                     <button className="bg-gray-100 p-2 rounded-full hover:bg-blue-700 hover:text-white transition-colors"><Linkedin size={18} /></button>
                  </div>
                  <div className="flex gap-4">
                     <button className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary">
                        <Printer size={16} /> Print
                     </button>
                     <Link to="/news" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary">
                        <ArrowLeft size={16} /> Back to News
                     </Link>
                  </div>
               </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-10">
               
               {/* Search (Mock) */}
               <div className="relative">
                  <input type="text" placeholder="Search news..." className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
                  <div className="absolute right-3 top-3.5 text-gray-400">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </div>
               </div>

               {/* Related News */}
               <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-bold font-serif text-gray-900 mb-6 pb-2 border-b border-gray-200">Related News</h3>
                  <div className="space-y-6">
                     {relatedNews.map(item => (
                        <div key={item.id} className="group flex gap-4">
                           <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                           </div>
                           <div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">{item.date}</div>
                              <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                                 <Link to={`/news/${item.id}`}>{item.title}</Link>
                              </h4>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Categories */}
               <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold font-serif text-gray-900 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                     {['Research', 'Campus Life', 'Events', 'Faculty', 'Partnership'].map(cat => (
                        <span key={cat} className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-full hover:bg-secondary hover:text-primary cursor-pointer transition-colors">
                           {cat}
                        </span>
                     ))}
                  </div>
               </div>
            </aside>
         </div>
      </div>
    </div>
  );
};

export default NewsDetail;
