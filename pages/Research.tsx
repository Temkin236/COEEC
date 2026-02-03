
import React, { useState, useEffect } from 'react';
import { RESEARCH_PROJECTS } from '../constants';
import { getResearchProjects } from '../services/api';
import { FlaskConical, Microscope, FileText, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

const Research: React.FC = () => {
  const [projects, setProjects] = useState(RESEARCH_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResearchProjects().then(data => {
      setProjects(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Hero
        title="Research & Innovation"
        subtitle="Exploring new frontiers in technology to solve real-world problems. Our labs are hubs of creativity and discovery."
        image="https://picsum.photos/1920/600?random=88"
        breadcrumbs={[{ label: 'Research' }]}
        parentSection="Innovation"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Research Areas / Labs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: <FlaskConical size={32} />, title: "IoT & Embedded Systems", desc: "Smart city solutions and agricultural monitoring." },
            { icon: <Microscope size={32} />, title: "AI & Data Science", desc: "Machine learning applications for local languages and healthcare." },
            { icon: <FileText size={32} />, title: "Power & Energy", desc: "Renewable energy integration and smart grid technologies." }
          ].map((area, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
               <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6">
                 {area.icon}
               </div>
               <h3 className="text-xl font-bold font-serif text-gray-900 mb-3">{area.title}</h3>
               <p className="text-gray-600 leading-relaxed">{area.desc}</p>
               <Link to="/research" className="inline-flex items-center text-sm font-bold text-primary mt-4 hover:text-secondary">
                  Learn more <ArrowRight size={14} className="ml-1" />
               </Link>
            </div>
          ))}
        </div>

        {/* Projects List */}
        <div className="flex items-center gap-4 mb-10">
           <h2 className="text-3xl font-serif font-bold text-gray-900">Featured Projects</h2>
           <div className="h-px bg-gray-200 flex-grow"></div>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        
        <div className="space-y-12">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col md:flex-row group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                    project.status === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {project.status}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold font-serif text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  <Link to={`/research/${project.id}`}>{project.title}</Link>
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${project.lead}&background=random`} alt={project.lead} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Principal Investigator</p>
                        <p className="text-sm font-medium text-gray-900">{project.lead}</p>
                      </div>
                   </div>
                   <Link to={`/research/${project.id}`} className="text-primary font-bold text-sm flex items-center hover:text-secondary transition-colors">
                     View Case Study <ArrowRight size={16} className="ml-1" />
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

export default Research;
