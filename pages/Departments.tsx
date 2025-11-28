
import React from 'react';
import { DEPARTMENTS } from '../constants';
import { ChevronRight, Layers, Users, BookOpen, Microscope, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const Departments: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Hero
        title="Academic Departments"
        subtitle="Organized into specialized centers of excellence, driving innovation through focused research and rigorous curriculum."
        image="https://picsum.photos/1920/600?random=199"
        breadcrumbs={[{ label: 'Academics', path: '/academics' }, { label: 'Departments' }]}
        parentSection="Our Faculties"
      />

      {/* Intro Stats Section */}
      <div className="relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="p-4">
             <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers size={24} />
             </div>
             <h3 className="text-3xl font-bold text-gray-900">3</h3>
             <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mt-1">Specialized Depts</p>
          </div>
          <div className="p-4">
             <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} />
             </div>
             <h3 className="text-3xl font-bold text-gray-900">12+</h3>
             <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mt-1">Degree Programs</p>
          </div>
          <div className="p-4">
             <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope size={24} />
             </div>
             <h3 className="text-3xl font-bold text-gray-900">18</h3>
             <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mt-1">Research Labs</p>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {DEPARTMENTS.map((dept, index) => (
            <div key={dept.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
              
              {/* Card Image */}
              <Link to={`/departments/${dept.id}`} className="block h-56 relative overflow-hidden">
                <img 
                  src={dept.image} 
                  alt={dept.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute bottom-4 left-4">
                   <span className="bg-white/90 backdrop-blur-md text-primary text-xs font-bold px-3 py-1 rounded shadow-sm uppercase tracking-wide">
                      Department
                   </span>
                </div>
              </Link>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                  <Link to={`/departments/${dept.id}`}>
                    {dept.name}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm flex-grow">
                  {dept.description}
                </p>
                
                {/* Programs Tags */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Key Programs</h4>
                  <div className="flex flex-wrap gap-2">
                    {dept.programs.slice(0, 3).map(program => (
                      <span key={program} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100">
                         {program.split(' ').slice(0, 2).join(' ')}...
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <Users size={14} />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] font-bold text-gray-400 uppercase">Head</span>
                         <span className="text-xs font-bold text-gray-800">{dept.head}</span>
                      </div>
                   </div>
                   
                   <Link 
                     to={`/departments/${dept.id}`} 
                     className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center transform group-hover:scale-110 group-hover:bg-secondary group-hover:text-primary transition-all duration-300 shadow-md"
                   >
                     <ArrowUpRight size={18} />
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departments;
