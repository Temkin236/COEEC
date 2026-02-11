
import React, { useState, useEffect } from 'react';
import { getDepartments } from '../services/api';
import { Department } from '../types';
import { ChevronRight, Layers, Users, BookOpen, Microscope, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDepartments().then(data => {
      setDepartments(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

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
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : departments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch auto-rows-fr">
          {departments.map((dept, index) => (
            <div key={dept.id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
              
              {/* Card Image */}
              <Link to={`/departments/${dept.id}`} className="block h-36 md:h-48 lg:h-56 relative overflow-hidden">
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
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                  <Link to={`/departments/${dept.id}`}>
                    {dept.name}
                  </Link>
                </h2>
                <div className="text-gray-600 mb-3 leading-relaxed text-sm">
                  <p
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                    className="mb-2"
                  >
                    {dept.description}
                  </p>
                  <Link to={`/departments/${dept.id}`} className="text-xs font-semibold text-primary hover:underline">
                    Read more
                  </Link>
                </div>
                
                {/* Programs Tags */}
                {dept.programs && Array.isArray(dept.programs) && dept.programs.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Key Programs</h4>
                  <div className="flex flex-wrap gap-2">
                    {dept.programs.slice(0, 3).map((program, idx) => {
                      const programName = typeof program === 'string' ? program : (program as any).title || (program as any).name || (program as any).code || 'Program';
                      const shortName = (programName || '').toString().split(' ').slice(0, 2).join(' ');
                      return (
                        <span key={`prog-${idx}-${shortName}`} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100">
                          {shortName}...
                        </span>
                      );
                    })}
                  </div>
                </div>
                )}

                {/* Footer */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <Users size={14} />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] font-bold text-gray-400 uppercase">Head</span>
                         <span className="text-xs font-bold text-gray-800">
                           {typeof dept.head === 'string' 
                             ? dept.head 
                             : dept.head && typeof dept.head === 'object' && 'name' in dept.head
                               ? (dept.head as any).name
                               : 'N/A'}
                         </span>
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
        ) : (
          <p className="text-center text-gray-500 py-10">No departments available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Departments;
