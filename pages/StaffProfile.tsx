
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { STAFF_MEMBERS } from '../constants';
import { Mail, MapPin, Linkedin, Twitter, Download, Calendar, BookOpen, Briefcase, GraduationCap, ChevronRight, Home } from 'lucide-react';

const StaffProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const staff = STAFF_MEMBERS.find(s => s.id === Number(id));

  if (!staff) {
    return <Navigate to="/staff" replace />;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* Profile Header / Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          
           {/* Breadcrumbs */}
           <div className="flex items-center text-xs text-gray-500 mb-8 font-medium">
              <Link to="/" className="hover:text-primary flex items-center gap-1"><Home size={14}/> Home</Link>
              <ChevronRight size={14} className="mx-2 opacity-50"/>
              <Link to="/staff" className="hover:text-primary">Staff Directory</Link>
              <ChevronRight size={14} className="mx-2 opacity-50"/>
              <span className="text-gray-900">{staff.name}</span>
           </div>

           <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              {/* Avatar */}
              <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl border-4 border-white relative bg-gray-200">
                 <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" />
              </div>

              {/* Info */}
              <div className="flex-grow">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                       <span className="bg-blue-100 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">{staff.academicRank}</span>
                       <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2">{staff.name}</h1>
                       <p className="text-gray-500 text-lg">{staff.title}</p>
                    </div>
                    
                    <div className="flex gap-3">
                       {staff.resumeUrl && (
                          <a href={staff.resumeUrl} className="flex items-center gap-2 bg-primary text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors shadow-sm text-sm">
                             <Download size={16} /> Download CV
                          </a>
                       )}
                       <a href={`mailto:${staff.email}`} className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 font-bold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm">
                          <Mail size={16} /> Contact
                       </a>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mt-6 border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-3">
                       <Briefcase className="text-secondary" size={18} />
                       <div>
                          <p className="text-xs text-gray-400 uppercase">Role</p>
                          <p className="font-medium text-gray-900">{staff.role}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <GraduationCap className="text-secondary" size={18} />
                       <div>
                          <p className="text-xs text-gray-400 uppercase">Department</p>
                          <p className="font-medium text-gray-900">{staff.department}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <Mail className="text-secondary" size={18} />
                       <div>
                          <p className="text-xs text-gray-400 uppercase">Email</p>
                          <p className="font-medium text-gray-900">{staff.email}</p>
                       </div>
                    </div>
                    {staff.office && (
                       <div className="flex items-center gap-3">
                          <MapPin className="text-secondary" size={18} />
                          <div>
                             <p className="text-xs text-gray-400 uppercase">Office</p>
                             <p className="font-medium text-gray-900">{staff.office}</p>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column (Main Info) */}
            <div className="lg:col-span-2 space-y-12">
               
               {/* Bio */}
               <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <div className="w-1 h-6 bg-secondary rounded-full"></div>
                     About
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                     {staff.bio}
                  </p>
               </section>

               {/* Experience & Education */}
               <section>
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                     <div className="w-1 h-6 bg-secondary rounded-full"></div>
                     Experience & Education
                  </h2>
                  
                  <div className="space-y-8 relative pl-6 border-l-2 border-gray-200">
                     {/* Experience */}
                     {staff.experience.map((exp, idx) => (
                        <div key={idx} className="relative">
                           <div className="absolute -left-[31px] bg-white border-2 border-primary w-4 h-4 rounded-full"></div>
                           <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                           <p className="text-primary text-sm font-medium mb-1">{exp.organization} • {exp.period}</p>
                           <p className="text-gray-600 text-sm">{exp.description}</p>
                        </div>
                     ))}
                     
                     {/* Education */}
                     {staff.education.map((edu, idx) => (
                        <div key={idx} className="relative">
                           <div className="absolute -left-[31px] bg-white border-2 border-gray-400 w-4 h-4 rounded-full"></div>
                           <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                           <p className="text-gray-500 text-sm font-medium mb-1">{edu.institution} • {edu.year}</p>
                        </div>
                     ))}
                  </div>
               </section>

               {/* Research */}
               {staff.publications.length > 0 && (
                  <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                     <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <div className="w-1 h-6 bg-secondary rounded-full"></div>
                        Selected Publications
                     </h2>
                     <div className="space-y-4">
                        {staff.publications.map((pub, idx) => (
                           <div key={idx} className="flex gap-4 items-start group">
                              <BookOpen className="text-gray-300 mt-1 flex-shrink-0 group-hover:text-primary transition-colors" size={20} />
                              <div>
                                 <h4 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-primary transition-colors cursor-pointer">
                                    {pub.title}
                                 </h4>
                                 <p className="text-xs text-gray-500 mt-1 italic">{pub.journal}, {pub.year}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </section>
               )}
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8">
               
               {/* Expertise */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                     {staff.researchAreas.map((area, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">
                           {area}
                        </span>
                     ))}
                  </div>
               </div>

               {/* Social Links */}
               {staff.socialLinks && (
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                     <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Connect</h3>
                     <div className="space-y-3">
                        {staff.socialLinks.linkedin && (
                           <a href={staff.socialLinks.linkedin} className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors p-2 hover:bg-gray-50 rounded">
                              <Linkedin size={18} /> LinkedIn Profile
                           </a>
                        )}
                        {staff.socialLinks.googleScholar && (
                           <a href={staff.socialLinks.googleScholar} className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors p-2 hover:bg-gray-50 rounded">
                              <GraduationCap size={18} /> Google Scholar
                           </a>
                        )}
                        {staff.socialLinks.twitter && (
                           <a href={staff.socialLinks.twitter} className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors p-2 hover:bg-gray-50 rounded">
                              <Twitter size={18} /> Twitter
                           </a>
                        )}
                     </div>
                  </div>
               )}

               {/* Upcoming Sessions / Events */}
               {staff.events.length > 0 && (
                  <div className="bg-gradient-to-br from-primary to-blue-900 text-white p-6 rounded-2xl shadow-lg">
                     <h3 className="font-bold mb-4 text-sm uppercase tracking-wide opacity-80 flex items-center gap-2">
                        <Calendar size={14} /> Upcoming Sessions
                     </h3>
                     <div className="space-y-4">
                        {staff.events.map((event, idx) => (
                           <div key={idx} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                              <div className="flex justify-between items-start mb-1">
                                 <span className="text-xs font-bold text-secondary bg-secondary/20 px-2 py-0.5 rounded">{event.role}</span>
                                 <span className="text-xs text-blue-200">{event.date}</span>
                              </div>
                              <h4 className="font-bold text-sm mb-1">{event.title}</h4>
                              <p className="text-xs text-blue-100 leading-tight opacity-80">{event.description}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default StaffProfile;
