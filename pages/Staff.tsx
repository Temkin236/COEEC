import React, { useState } from 'react';
import { STAFF_MEMBERS } from '../constants';
import { Search, Mail, BookOpen } from 'lucide-react';

const Staff: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStaff = STAFF_MEMBERS.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.researchAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Faculty & Staff Directory</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the dedicated professors, researchers, and administrative staff powering COEEC.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-16 relative">
          <input 
            type="text" 
            placeholder="Search by name, department, or research area..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        </div>

        {/* Staff Grid */}
        {filteredStaff.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredStaff.map(member => (
              <div key={member.id} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                <div className="h-64 overflow-hidden relative">
                   <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <a href={`mailto:${member.email}`} className="text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-primary transition-colors">
                        View Profile
                      </a>
                   </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-xs text-gray-500 mb-4 uppercase tracking-wide border-b border-gray-100 pb-3">
                    {member.department}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-gray-600">
                       <BookOpen size={14} className="mt-0.5 text-secondary shrink-0" />
                       <span>{member.researchAreas.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                       <Mail size={14} className="text-secondary shrink-0" />
                       <span className="truncate">{member.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg">
             <p className="text-lg">No staff members found matching your search.</p>
             <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-primary font-semibold hover:underline"
             >
               Clear filters
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Staff;