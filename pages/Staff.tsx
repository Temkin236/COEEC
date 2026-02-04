
import React, { useState, useEffect } from 'react';
import { getStaff } from '../services/api';
import { StaffMember } from '../types';
import Hero from '../components/Hero';
import { Search, ArrowRight, Briefcase, GraduationCap, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Staff: React.FC = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterRank, setFilterRank] = useState('All');

  useEffect(() => {
    getStaff().then(data => {
      setStaffMembers(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Extract department names from staff members (handle both string and object formats)
  const departments = ['All', ...Array.from(new Set(
    staffMembers.map(s => {
      if (typeof s.department === 'string') return s.department;
      if (s.department && typeof s.department === 'object' && 'name' in s.department) {
        return (s.department as any).name;
      }
      return null;
    }).filter(Boolean)
  ))];
  
  const ranks = ['All', 'Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Administrator'];

  const filteredStaff = staffMembers.filter(staff => {
    // Get department name (handle both string and object)
    const deptName = typeof staff.department === 'string' 
      ? staff.department 
      : staff.department && typeof staff.department === 'object' && 'name' in staff.department
        ? (staff.department as any).name
        : '';
    
    const matchesSearch = (staff.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                          (staff.role?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (staff.researchAreas || []).some(area => (area?.toLowerCase() || '').includes(searchTerm.toLowerCase()));
    const matchesDept = filterDept === 'All' || deptName === filterDept;
    const matchesRank = filterRank === 'All' || staff.academicRank === filterRank;
    return matchesSearch && matchesDept && matchesRank;
  });

  return (
    <div className="bg-white min-h-screen">
      <Hero 
        title="Faculty & Staff Directory" 
        subtitle="Meet the world-class educators, researchers, and administrators driving excellence at COEEC."
        image="https://picsum.photos/1920/600?random=15"
        breadcrumbs={[{ label: 'About', path: '/about' }, { label: 'Staff' }]}
        parentSection="Our People"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Advanced Filter Bar */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-12">
           <div className="flex flex-col lg:flex-row gap-6 items-center">
              
              {/* Search */}
              <div className="relative w-full lg:w-96 flex-shrink-0">
                 <input 
                   type="text" 
                   placeholder="Search by name, role, or expertise..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-medium"
                 />
                 <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>

              {/* Dropdowns */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                 <div className="relative w-full">
                    <span className="absolute -top-2 left-2 bg-white px-1 text-xs font-bold text-gray-500">Department</span>
                    <select 
                      value={filterDept}
                      onChange={(e) => setFilterDept(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-primary cursor-pointer text-sm text-gray-700"
                    >
                      {departments.map((dept, idx) => (
                        <option key={`dept-${idx}-${dept}`} value={dept}>{dept}</option>
                      ))}
                    </select>
                 </div>

                 <div className="relative w-full">
                    <span className="absolute -top-2 left-2 bg-white px-1 text-xs font-bold text-gray-500">Academic Rank</span>
                    <select 
                      value={filterRank}
                      onChange={(e) => setFilterRank(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-primary cursor-pointer text-sm text-gray-700"
                    >
                      {ranks.map(rank => (
                        <option key={rank} value={rank}>{rank}</option>
                      ))}
                    </select>
                 </div>
              </div>
              
              <div className="hidden lg:block h-10 w-px bg-gray-200"></div>

              <div className="text-sm text-gray-500 whitespace-nowrap">
                 Showing <strong>{filteredStaff.length}</strong> results
              </div>
           </div>
        </div>

        {/* Staff Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredStaff.length > 0 ? (
            filteredStaff.map((staff) => (
              <div key={staff.id} className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Image Section */}
                <div className="h-64 overflow-hidden relative bg-gray-100">
                   {staff.image ? (
                     <img src={staff.image} alt={staff.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <User size={64} />
                     </div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <Link to={`/staff/${staff.id}`} className="bg-white text-primary font-bold py-2 px-4 rounded-full text-sm text-center shadow-lg hover:bg-secondary hover:text-primary transition-colors flex items-center justify-center gap-2">
                         View Full Profile <ArrowRight size={14} />
                      </Link>
                   </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                     <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">{staff.academicRank}</p>
                     <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                       <Link to={`/staff/${staff.id}`}>{staff.name}</Link>
                     </h3>
                     <p className="text-sm text-gray-500 mt-1">{staff.title}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                     <div className="flex items-start gap-2 text-xs text-gray-600">
                        <Briefcase size={14} className="mt-0.5 text-gray-400" />
                        <span>{staff.role}</span>
                     </div>
                     <div className="flex items-start gap-2 text-xs text-gray-600">
                        <GraduationCap size={14} className="mt-0.5 text-gray-400" />
                        <span>
                          {typeof staff.department === 'string' 
                            ? staff.department 
                            : staff.department && typeof staff.department === 'object' && 'name' in staff.department
                              ? (staff.department as any).name
                              : 'N/A'}
                        </span>
                     </div>
                  </div>

                  {staff.researchAreas && staff.researchAreas.length > 0 && (
                     <div className="mt-auto pt-4 border-t border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Expertise</p>
                        <div className="flex flex-wrap gap-1">
                           {staff.researchAreas.slice(0, 2).map((area, idx) => (
                              <span key={idx} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-1 rounded-md font-medium">
                                 {area}
                              </span>
                           ))}
                           {staff.researchAreas.length > 2 && (
                              <span className="text-[10px] text-gray-400 py-1 pl-1">+ {staff.researchAreas.length - 2} more</span>
                           )}
                        </div>
                     </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
               <User size={48} className="mx-auto mb-4 text-gray-300" />
               <p className="text-lg font-medium text-gray-900">No staff members found.</p>
               <p className="text-sm">Try adjusting your filters or search terms.</p>
               <button 
                  onClick={() => {setSearchTerm(''); setFilterDept('All'); setFilterRank('All');}}
                  className="mt-4 text-primary font-bold text-sm hover:underline"
               >
                  Clear all filters
               </button>
            </div>
          )}
        </div>        )}      </div>
    </div>
  );
};

export default Staff;
