import React from 'react';
import { Target, Eye, History, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-gray-100 py-12 md:py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">About the College</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the history, mission, and vision driving the College of Electrical Engineering and Computing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Dean's Message */}
        <div className="flex flex-col md:flex-row gap-12 items-start mb-24">
          <div className="md:w-1/3 relative">
            <img 
              src="https://picsum.photos/400/500?random=30" 
              alt="Dean of COEEC" 
              className="rounded-lg shadow-lg w-full object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-secondary p-6 rounded-lg shadow-md hidden md:block">
              <p className="font-serif font-bold text-primary text-xl">Dr. Berhanu Bulcha</p>
              <p className="text-sm font-medium text-gray-800">Dean, COEEC</p>
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Message from the Dean</h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>
                Welcome to the College of Electrical Engineering and Computing (COEEC) at Adama Science and Technology University. 
                It is my distinct privilege to lead this vibrant academic community committed to excellence in engineering education and research.
              </p>
              <p>
                Our college stands at the forefront of digital transformation in Ethiopia. Through our rigorous academic programs 
                in Computer Science, Electrical Engineering, and Electronics, we prepare our students not just for the jobs of today, 
                but for the challenges of tomorrow.
              </p>
              <p>
                We believe in a hands-on approach to learning, fostering a culture of innovation where theory meets practice. 
                I invite you to explore our website, learn about our faculty's groundbreaking research, and discover the opportunities awaiting you here.
              </p>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Signature" className="h-12 opacity-70 mt-4" />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-full shadow-sm mb-6">
              <Target className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To produce competent and innovative professionals in electrical engineering and computing through quality education, 
              demand-driven research, and community service, contributing to the industrial development of the nation.
            </p>
          </div>
          <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-100 flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-full shadow-sm mb-6">
              <Eye className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be a premier center of excellence in applied engineering and computing in East Africa, recognized for high-quality 
              graduates and impactful research outputs by 2030.
            </p>
          </div>
        </div>

        {/* History & Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
             <div className="flex items-center gap-3 mb-4">
                <History className="text-primary w-8 h-8" />
                <h3 className="text-2xl font-bold text-gray-900">Our History</h3>
             </div>
             <p className="text-gray-600 leading-relaxed">
               Established as part of the transformation of ASTU into a dedicated Science and Technology University, 
               COEEC has grown from a small department into a full-fledged college. Over the years, we have expanded our 
               infrastructure, including modern laboratories and smart classrooms, to support the growing demand for engineering education.
             </p>
             <p className="text-gray-600 leading-relaxed">
               Today, we host three major departments and multiple graduate programs, maintaining strong industry linkages 
               with key sectors in Ethiopia's economy.
             </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
             <div className="flex items-center gap-3 mb-6">
                <Award className="text-secondary w-8 h-8" />
                <h3 className="text-xl font-bold text-gray-900">Core Values</h3>
             </div>
             <ul className="space-y-4">
               {['Excellence', 'Innovation', 'Integrity', 'Collaboration', 'Diversity'].map((value) => (
                 <li key={value} className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-primary rounded-full" />
                   <span className="text-gray-700 font-medium">{value}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;