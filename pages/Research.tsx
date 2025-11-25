import React from 'react';
import { RESEARCH_PROJECTS } from '../constants';
import { FlaskConical, Microscope, FileText } from 'lucide-react';

const Research: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Innovation</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Research & Development</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Exploring new frontiers in technology to solve real-world problems. Our labs are hubs of creativity and discovery.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Research Areas / Labs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: <FlaskConical size={32} />, title: "IoT & Embedded Systems", desc: "Smart city solutions and agricultural monitoring." },
            { icon: <Microscope size={32} />, title: "AI & Data Science", desc: "Machine learning applications for local languages and healthcare." },
            { icon: <FileText size={32} />, title: "Power & Energy", desc: "Renewable energy integration and smart grid technologies." }
          ].map((area, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-14 h-14 bg-white rounded-lg shadow-sm flex items-center justify-center text-primary mb-6">
                 {area.icon}
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
               <p className="text-gray-600">{area.desc}</p>
            </div>
          ))}
        </div>

        {/* Projects List */}
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-10 border-l-4 border-secondary pl-4">Featured Projects</h2>
        <div className="space-y-12">
          {RESEARCH_PROJECTS.map((project) => (
            <div key={project.id} className="flex flex-col md:flex-row gap-8 items-center bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="md:w-1/2 h-64 md:h-80 w-full">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-8">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                  project.status === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {project.status}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                   <div className="flex items-center gap-2">
                     <span className="font-semibold text-gray-900">Lead:</span> {project.lead}
                   </div>
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