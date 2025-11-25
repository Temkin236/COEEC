import React from 'react';
import { DEPARTMENTS } from '../constants';
import { ChevronRight, Layers } from 'lucide-react';

const Departments: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-bold mb-4">Academic Departments</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            COEEC is organized into specialized departments, each dedicated to specific fields of study and research excellence.
          </p>
        </div>
      </div>

      {/* List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid gap-10">
          {DEPARTMENTS.map((dept, index) => (
            <div key={dept.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow">
              <div className="md:w-2/5 h-64 md:h-auto relative">
                <img src={dept.image} alt={dept.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                <h2 className="absolute bottom-4 left-4 text-white text-xl font-bold md:hidden">{dept.name}</h2>
              </div>
              <div className="p-8 md:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers size={18} className="text-secondary" />
                    <span className="text-sm font-bold text-primary tracking-wide uppercase">Department</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 hidden md:block">{dept.name}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {dept.description}
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="text-sm font-bold text-gray-800 mb-2">Available Programs:</h4>
                    <ul className="space-y-1">
                      {dept.programs.map(program => (
                        <li key={program} className="text-sm text-gray-600 flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                           {program}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                   <div className="text-sm text-gray-500">
                     Head: <span className="font-semibold text-gray-800">{dept.head}</span>
                   </div>
                   <button className="text-primary font-bold text-sm flex items-center hover:text-blue-800 transition-colors">
                     View Details <ChevronRight size={16} />
                   </button>
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