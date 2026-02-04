
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { getNews } from '../services/api';
import { NewsItem } from '../types';
import { Calendar, User, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews().then(data => {
      setNews(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const featuredNews = news[0];
  const secondaryNews = news.slice(1, 3);
  const otherNews = news.slice(3);

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
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        
        {!loading && news.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No news available at the moment.</p>
          </div>
        )}
        
        {!loading && news.length > 0 && (
        <>
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(300px,auto)] mb-16">
           
           {/* Featured Item (Large) */}
           <div className="lg:col-span-2 lg:row-span-2 group relative rounded-3xl overflow-hidden shadow-md cursor-pointer">
              <img 
                src={featuredNews.image} 
                alt={featuredNews.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 p-8 text-white">
                 <span className="bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3 inline-block">
                   {featuredNews.category}
                 </span>
                 <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight group-hover:text-blue-200 transition-colors">
                    <Link to={`/news/${featuredNews.id}`}>{featuredNews.title}</Link>
                 </h2>
                 <p className="text-gray-300 mb-6 line-clamp-2 text-lg">
                    {featuredNews.excerpt}
                 </p>
                 <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                       <Calendar size={14} /> {featuredNews.date}
                    </div>
                    {featuredNews.author && (
                      <div className="flex items-center gap-1">
                         <User size={14} /> {featuredNews.author}
                      </div>
                    )}
                 </div>
              </div>
           </div>

           {/* Secondary Items */}
           {secondaryNews.length > 0 && secondaryNews.map((news) => (
             <div key={news.id} className="lg:col-span-1 lg:row-span-2 group relative rounded-3xl overflow-hidden shadow-md cursor-pointer bg-gray-100 flex flex-col">
                <div className="h-48 lg:h-1/2 overflow-hidden relative">
                   <img 
                     src={news.image} 
                     alt={news.title} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                   />
                   <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                         {news.category}
                      </span>
                   </div>
                </div>
                <div className="p-6 flex flex-col flex-grow bg-white">
                   <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <Calendar size={12} /> {news.date}
                   </div>
                   <h3 className="text-xl font-bold font-serif text-gray-900 mb-3 line-clamp-3 group-hover:text-primary transition-colors flex-grow">
                      <Link to={`/news/${news.id}`}>{news.title}</Link>
                   </h3>
                   <Link to={`/news/${news.id}`} className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary mt-4">
                      Read more <ArrowRight size={16} className="ml-2" />
                   </Link>
                </div>
             </div>
           ))}
        </div>

        {/* Recent News List */}
        <div className="border-t border-gray-100 pt-16">
           <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">More Updates</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {otherNews.map((news) => (
                <div key={news.id} className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                   <div className="h-52 overflow-hidden relative">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute top-4 left-4">
                         <span className="bg-white/90 backdrop-blur-md text-gray-600 text-xs font-bold px-3 py-1.5 rounded shadow-sm">
                            {news.category}
                         </span>
                      </div>
                   </div>
                   
                   <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                         <div className="flex items-center gap-1">
                            <Calendar size={14} /> {news.date}
                         </div>
                      </div>
                      
                      <h3 className="text-lg font-bold font-serif text-gray-900 mb-3 group-hover:text-primary transition-colors">
                         <Link to={`/news/${news.id}`}>{news.title}</Link>
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                         {news.excerpt}
                      </p>
                      
                      <Link to={`/news/${news.id}`} className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary mt-auto">
                         Read Full Story <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-20">
           <nav className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors disabled:opacity-50">
                 &larr;
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold shadow-md">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">2</button>
              <span className="text-gray-400 px-2">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors">
                 &rarr;
              </button>
           </nav>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default News;