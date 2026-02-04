
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { getDownloads } from '../services/api';
import { FileText, Download, Search, File, FileCode, Shield } from 'lucide-react';

const Downloads: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDownloads().then(data => {
      setFiles(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

   const categories = ['All', ...Array.from(new Set(files.map((f: any) => (f && f.category) ? f.category : 'Uncategorized')))];

   const filteredFiles = files.filter(file => {
      if (!file) return false;
      const matchesCategory = filter === 'All' || (file.category === filter);
      const fileName = (file.name || file.title || '').toString();
      const matchesSearch = fileName.toLowerCase().includes((searchTerm || '').toLowerCase());
      return matchesCategory && matchesSearch;
   });

  const getIcon = (type?: string) => {
     const t = (type || '').toString().toLowerCase();
     if (t.includes('pdf')) return <FileText className="text-red-500" size={24} />;
     if (t.includes('doc') || t.includes('word')) return <FileCode className="text-blue-500" size={24} />;
     return <File className="text-gray-500" size={24} />;
  };

  return (
    <div className="bg-white min-h-screen">
      <Hero
        title="Download Center"
        subtitle="Access official forms, policy documents, and templates for students and staff."
        image="https://picsum.photos/1920/600?random=110"
        breadcrumbs={[{ label: 'Resources', path: '#' }, { label: 'Downloads' }]}
        parentSection="Resources"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
           {/* Tabs */}
           <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setFilter(cat)}
                   className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                      filter === cat 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                   }`}
                 >
                    {cat}
                 </button>
              ))}
           </div>

           {/* Search */}
           <div className="relative w-full md:w-80">
              <input 
                 type="text" 
                 placeholder="Search files..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
           </div>
        </div>

        {/* File List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
           {filteredFiles.length > 0 ? (
             <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                   <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">File Name</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Updated</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                   </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                   {filteredFiles.map((file, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                         <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                               <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                                  {getIcon(file.type)}
                               </div>
                               <div className="ml-4">
                                  <div className="text-sm font-bold text-gray-900">{file.name}</div>
                                  <div className="text-xs text-gray-500 md:hidden">{file.category} • {file.size}</div>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700">
                               {file.category}
                            </span>
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                            {file.date}
                         </td>
                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary hover:text-secondary font-bold inline-flex items-center gap-2 transition-colors">
                               Download <Download size={16} />
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
           ) : (
             <div className="p-12 text-center text-gray-500">
                <Shield size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg">No documents found.</p>
                <p className="text-sm">Try adjusting your search or filter.</p>
             </div>
           )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloads;
