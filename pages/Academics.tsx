
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { FileText, Download, Bell, BookOpen, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCalendarEvents } from '../services/api';

const Academics: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Hero
        title="Academics"
        subtitle="Rigorous programs designed to challenge and inspire the next generation of engineers."
        image="https://picsum.photos/1920/600?random=45"
        breadcrumbs={[{ label: 'Academics' }]}
        parentSection="Teaching & Learning"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
           <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-primary/20 transition-colors group">
              <BookOpen className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Undergraduate</h3>
              <p className="text-gray-600 mb-4">Bachelor's degrees in Computer Science, Electrical Engineering, and Power Systems.</p>
              <Link to="/departments" className="text-primary font-bold text-sm hover:underline">View Programs &rarr;</Link>
           </div>
           <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-primary/20 transition-colors group">
              <FileText className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Graduate</h3>
              <p className="text-gray-600 mb-4">Advanced MSc and PhD programs focused on research and specialization.</p>
              <Link to="/departments" className="text-primary font-bold text-sm hover:underline">View Programs &rarr;</Link>
           </div>
           <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-primary/20 transition-colors group">
              <Download className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Resources</h3>
              <p className="text-gray-600 mb-4">Access course catalogs, student handbooks, and academic policies.</p>
              <Link to="/downloads" className="text-primary font-bold text-sm hover:underline">Go to Download Center &rarr;</Link>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Academic Calendar */}
           <div className="lg:col-span-2">
              <div className="flex items-end justify-between mb-8">
                 <div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">Academic Calendar</h2>
                    <p className="text-gray-500 mt-2">Semester I, 2025/2026 Academic Year</p>
                 </div>
                 <button className="text-primary font-bold text-sm hover:bg-gray-50 px-4 py-2 rounded transition-colors">
                    Download PDF
                 </button>
              </div>

                 <CalendarTable />
           </div>

           {/* Announcements Sidebar */}
           <div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-secondary">
                 <div className="flex items-center gap-2 mb-6">
                    <Bell className="text-secondary" size={24} />
                    <h3 className="text-xl font-bold text-gray-900">Announcements</h3>
                 </div>
                 <div className="space-y-6">
                    {[
                       { title: "Exam Schedule Change", date: "2 hours ago", desc: "The mid-term exam for ECE302 has been rescheduled to Nov 12." },
                       { title: "Library Hours Extended", date: "1 day ago", desc: "During exam week, the main library will remain open until midnight." },
                       { title: "Scholarship Deadline", date: "3 days ago", desc: "Applications for the DAAD scholarship are due by Friday." },
                    ].map((ann, idx) => (
                       <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                          <h4 className="font-bold text-gray-900 text-sm hover:text-primary cursor-pointer transition-colors">{ann.title}</h4>
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1 mb-2">
                             <Clock size={12} /> {ann.date}
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{ann.desc}</p>
                       </div>
                    ))}
                 </div>
                 <button className="w-full mt-6 py-2 border border-primary text-primary font-bold text-sm rounded hover:bg-primary hover:text-white transition-colors">
                    View All Archives
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Academics;

const CalendarTable: React.FC = () => {
   const [items, setItems] = useState<Array<any>>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      let mounted = true;
      getCalendarEvents(true).then(data => {
         if (!mounted) return;
         setItems(Array.isArray(data) ? data : []);
         setLoading(false);
      }).catch(() => setLoading(false));
      return () => { mounted = false; };
   }, []);

   if (loading) {
      return (
         <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
         </div>
      );
   }

   if (!items || items.length === 0) {
      return (
         <div className="p-12 text-center text-gray-500 bg-white border border-gray-200 rounded-lg">
            <p className="text-lg font-bold">No academic calendar entries available.</p>
            <p className="text-sm">Check back later or contact the academic office.</p>
         </div>
      );
   }

   return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
         <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
               <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date / Period</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
               </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
               {items.map((it, idx) => (
                  <tr key={it.id || idx} className="hover:bg-gray-50 transition-colors">
                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{it.academicYear || it.semester || it.date || '—'}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{it.title || it.description || '—'}</td>
                     <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                           (it.state === 'PUBLISHED' || it.state === 'ACTIVE' || it.state === 'COMPLETED') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                           {it.state || 'DRAFT'}
                        </span>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
