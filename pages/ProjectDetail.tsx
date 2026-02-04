
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getResearchProjectById } from '../services/api';
import { ResearchProject } from '../types';
import { Home, ChevronRight, Calendar, User, CheckCircle2, Users, DollarSign } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ResearchProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getResearchProjectById(id).then(data => {
        setProject(data);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
       {/* Hero */}
       <div className="relative h-[300px] md:h-[400px] bg-primary">
         <img 
           src={project.image} 
           alt={project.title} 
           className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
         
         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <div className="flex items-center text-xs text-blue-200 mb-4 font-medium">
               <Link to="/" className="hover:text-white flex items-center gap-1"><Home size={14}/> Home</Link>
               <ChevronRight size={14} className="mx-2 opacity-50"/>
               <Link to="/research" className="hover:text-white">Research</Link>
               <ChevronRight size={14} className="mx-2 opacity-50"/>
               <span className="text-secondary">Project Details</span>
            </div>
            
            <div className={`inline-flex px-3 py-1 rounded text-xs font-bold uppercase tracking-wide w-fit mb-4 ${
               project.status === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
               {project.status}
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white max-w-4xl leading-tight">
               {project.title}
            </h1>
         </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             
             {/* Main Content */}
             <div className="lg:col-span-2 space-y-12">
                <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                   <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Project Overview</h2>
                   <div className="prose prose-blue text-gray-700 leading-relaxed">
                      {project.content ? (
                         <div dangerouslySetInnerHTML={{ __html: project.content }} />
                      ) : (
                         <p>{project.description}</p>
                      )}
                   </div>
                </section>

                {project.objectives && (
                   <section>
                      <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Key Objectives</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {project.objectives.map((obj, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-lg border-l-4 border-secondary shadow-sm flex items-start gap-3">
                               <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                               <span className="text-gray-700 font-medium">{obj}</span>
                            </div>
                         ))}
                      </div>
                   </section>
                )}
             </div>

             {/* Sidebar Info */}
             <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                   <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Project Details</h3>
                   
                   <div className="space-y-6">
                      <div className="flex items-start gap-4">
                         <div className="bg-blue-50 p-2 rounded text-primary"><Users size={20} /></div>
                         <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Principal Investigator</p>
                            <p className="font-medium text-gray-900">{project.lead}</p>
                         </div>
                      </div>

                      {project.duration && (
                         <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-2 rounded text-primary"><Calendar size={20} /></div>
                            <div>
                               <p className="text-xs text-gray-500 font-bold uppercase">Duration</p>
                               <p className="font-medium text-gray-900">{project.duration}</p>
                            </div>
                         </div>
                      )}

                      {project.fundingSource && (
                         <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-2 rounded text-primary"><DollarSign size={20} /></div>
                            <div>
                               <p className="text-xs text-gray-500 font-bold uppercase">Funding Source</p>
                               <p className="font-medium text-gray-900">{project.fundingSource}</p>
                            </div>
                         </div>
                      )}
                      
                      {project.partners && project.partners.length > 0 && (
                         <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-2 rounded text-primary"><Briefcase size={20} /></div>
                            <div>
                               <p className="text-xs text-gray-500 font-bold uppercase">Partners</p>
                               <ul className="list-disc list-inside text-sm text-gray-900 mt-1">
                                  {project.partners.map((partner, i) => {
                                     const pname = typeof partner === 'string' ? partner : (partner && (partner.name || partner.title || partner.org || partner.company)) || 'Partner';
                                     return <li key={i}>{pname}</li>;
                                  })}
                               </ul>
                            </div>
                         </div>
                      )}
                   </div>
                </div>

                <div className="bg-secondary/10 p-6 rounded-xl border border-secondary/20">
                   <h4 className="font-bold text-gray-900 mb-2">Interested in collaborating?</h4>
                   <p className="text-sm text-gray-600 mb-4">We are always open to new partnerships and research opportunities.</p>
                   <Link to="/contact" className="block w-full text-center bg-primary text-white font-bold py-3 rounded hover:bg-blue-800 transition-colors">
                      Contact Research Office
                   </Link>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ProjectDetail;
