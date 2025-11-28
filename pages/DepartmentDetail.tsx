
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { DEPARTMENTS, LATEST_NEWS } from '../constants';
import { Home, ChevronRight, ArrowUpRight, ChevronLeft, Calendar } from 'lucide-react';

const DepartmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const department = DEPARTMENTS.find(d => d.id === id);

  if (!department) {
    return <Navigate to="/departments" replace />;
  }

  // Use general news for now, in a real app this would be filtered by department
  const deptNews = LATEST_NEWS.slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] bg-primary">
        <img 
          src={department.image} 
          alt={department.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
           {/* Breadcrumbs */}
           <div className="flex items-center text-xs md:text-sm text-blue-200 mb-6 font-medium">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home size={14}/> Home</Link>
              <ChevronRight size={14} className="mx-2 opacity-50"/>
              <Link to="/departments" className="hover:text-white">Departments</Link>
              <ChevronRight size={14} className="mx-2 opacity-50"/>
              <span className="text-secondary">{department.name}</span>
           </div>

           <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">Department</span>
           <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight max-w-4xl">
             {department.name}
           </h1>

           <div className="flex gap-4">
             <Link to="/academics" className="bg-white text-primary font-bold px-6 py-3 rounded hover:bg-secondary hover:text-primary transition-colors flex items-center gap-2">
                Explore Programs <ArrowUpRight size={18} />
             </Link>
           </div>
        </div>
      </div>

      {/* Overview Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="mb-4">
             <h2 className="text-2xl font-serif font-bold text-gray-900">Overview</h2>
             <div className="flex gap-2 mt-4">
               <div className="w-8 h-1 bg-secondary"></div>
               <div className="w-16 h-1 bg-primary"></div>
             </div>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
              <div className="lg:col-span-2 text-gray-600 leading-relaxed space-y-4 text-lg">
                 <p>
                   {department.description} The department is committed to providing high-quality education and research opportunities. 
                   Our curriculum is designed to meet the evolving needs of the industry, fostering innovation and critical thinking.
                 </p>
                 <p>
                   We host state-of-the-art laboratories and maintain strong partnerships with leading technology firms. 
                   Students benefit from a blend of theoretical knowledge and practical application, ensuring they are job-ready upon graduation.
                   The department is led by <strong>{department.head}</strong>, a distinguished scholar in the field.
                 </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                 <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Facts</h3>
                 <ul className="space-y-4">
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                       <span className="text-gray-500">Department Head</span>
                       <span className="font-semibold text-gray-900 text-right">{department.head}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                       <span className="text-gray-500">Established</span>
                       <span className="font-semibold text-gray-900">1995</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                       <span className="text-gray-500">Total Students</span>
                       <span className="font-semibold text-gray-900">1,200+</span>
                    </li>
                    <li className="flex justify-between pt-2">
                       <span className="text-gray-500">Faculty Members</span>
                       <span className="font-semibold text-gray-900">45</span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="bg-gray-50 py-20 border-t border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-10 text-center">Academic Programs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {department.programs.map((program, idx) => (
                 <div key={idx} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border-t-4 border-primary">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{program}</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      A comprehensive program designed to equip students with foundational knowledge and advanced skills.
                    </p>
                    <Link to="/academics" className="text-primary font-bold text-sm flex items-center hover:text-secondary transition-colors">
                      View Curriculum <ChevronRight size={16} />
                    </Link>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* News Section */}
      <section className="bg-white py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <span className="text-gray-500 text-sm uppercase tracking-wider">Latest News</span>
               <h2 className="text-3xl font-serif font-bold text-gray-900 mt-2">{department.name} in the News</h2>
               <div className="flex justify-center gap-2 mt-4">
                  <div className="w-8 h-1 bg-secondary"></div>
                  <div className="w-16 h-1 bg-primary"></div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {deptNews.map((news) => (
                 <div key={news.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="h-48 overflow-hidden relative">
                       <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-primary shadow-sm">
                          {news.category}
                       </div>
                    </div>
                    <div className="p-6">
                       <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                          <Calendar size={12} />
                          {news.date}
                       </div>
                       <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          <Link to={`/news/${news.id}`}>{news.title}</Link>
                       </h3>
                       <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                          {news.excerpt}
                       </p>
                       <Link to={`/news/${news.id}`} className="text-primary font-bold text-sm hover:underline">Read more</Link>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default DepartmentDetail;
