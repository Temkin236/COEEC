
import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, GraduationCap, Search, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  const toggleMobileDropdown = (label: string) => {
    if (activeMobileDropdown === label) {
      setActiveMobileDropdown(null);
    } else {
      setActiveMobileDropdown(label);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 py-2 px-4 text-xs md:text-sm text-gray-600 hidden md:block">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <div className="flex gap-4 items-center">
             <div className="flex items-center gap-2">
                <img src="/astu-logo.jpg" alt="Flag" className="h-4 w-auto"/>
                <span className="font-semibold text-primary">Adama Science and Technology University</span>
             </div>
             <span className="text-gray-300">|</span>
             <span className="font-serif italic text-gray-500">Since 1993</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
              <Globe size={14} />
              <span>English</span>
              <ChevronDown size={12} />
            </div>
            <nav className="flex gap-4">
               <a href="#" className="hover:text-primary transition-colors">Latest</a>
               <a href="#" className="hover:text-primary transition-colors">About</a>
               <a href="#" className="hover:text-primary transition-colors">Admission</a>
               <a href="#" className="hover:text-primary transition-colors">Offices</a>
            </nav>
            <button className="text-gray-500 hover:text-primary">
               <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo Area */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-4 group">
              <div className="bg-primary text-white p-2.5 rounded-lg shadow-md group-hover:bg-secondary group-hover:text-primary transition-colors">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl leading-none text-primary font-serif tracking-tight">COEEC</span>
                <span className="text-xs text-gray-500 font-medium tracking-widest uppercase mt-1">College of Electrical Engineering</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-1">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                
                if (item.children) {
                  return (
                    <div key={item.label} className="relative group">
                      <button
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-200 rounded-md focus:outline-none ${
                          isActive ? 'text-primary bg-blue-50' : 'text-gray-600 hover:text-primary hover:bg-gray-50 group-hover:text-primary group-hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute left-0 mt-0 w-64 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50 overflow-hidden">
                        <div className="py-2">
                          {item.children.map((child, idx) => (
                            <Link
                              key={idx}
                              to={child.path}
                              className="block px-6 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-primary transition-colors border-b border-gray-50 last:border-0"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-200 rounded-md ${
                        isActive ? 'text-primary bg-blue-50' : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-primary focus:outline-none p-2"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full z-50 max-h-[80vh] overflow-y-auto">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {NAV_ITEMS.map((item) => {
                 const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                 const isDropdownOpen = activeMobileDropdown === item.label;

                 if (item.children) {
                   return (
                     <div key={item.label}>
                       <button 
                         onClick={() => toggleMobileDropdown(item.label)}
                         className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-base font-bold uppercase tracking-wide ${
                           isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                         }`}
                       >
                         {item.label}
                         <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                       </button>
                       
                       {isDropdownOpen && (
                         <div className="pl-4 space-y-1 mt-1 border-l-2 border-gray-100 ml-4">
                            {item.children.map((child, idx) => (
                              <Link
                                key={idx}
                                to={child.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-600 hover:text-primary"
                              >
                                {child.label}
                              </Link>
                            ))}
                         </div>
                       )}
                     </div>
                   );
                 }
                 return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-base font-bold uppercase tracking-wide ${
                        isActive ? 'bg-primary text-white shadow-md' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                 )
              })}
              <div className="pt-4 border-t border-gray-100 mt-4 flex flex-col gap-2">
                 <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary">Student Portal</a>
                 <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary">Staff Email</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-16 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="bg-white/10 p-2 rounded-lg">
                    <GraduationCap className="h-8 w-8 text-secondary" />
                 </div>
                 <div className="flex flex-col">
                    <span className="font-bold text-xl leading-none font-serif">COEEC</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-widest mt-1">Adama Science And Technology University</span>
                 </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Dedicated to advancing technology and innovation through rigorous academic programs and cutting-edge research in Ethiopia.
              </p>
              <div className="flex gap-4">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all"><Facebook size={18} /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all"><Twitter size={18} /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all"><Linkedin size={18} /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all"><Youtube size={18} /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-secondary hover:text-primary transition-all"><Instagram size={18} /></a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold font-serif mb-6 border-l-4 border-secondary pl-3">Essentials</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/contact" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Contact Us</Link></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Media Gallery</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Emergency Services</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Archive</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold font-serif mb-6 border-l-4 border-secondary pl-3">Resources</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/news" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Events</Link></li>
                <li><Link to="/downloads" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Documents</Link></li>
                <li><Link to="/research" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Publications</Link></li>
                <li><Link to="/academics" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Programs A-Z</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold font-serif mb-6 border-l-4 border-secondary pl-3">Quick Links</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Portal</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-transform inline-block">E-Learning</a></li>
                <li><Link to="/students" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Campus Life</Link></li>
                <li><Link to="/staff" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Staff</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Adama Science and Technology University. All rights reserved.
             </div>
             <div className="flex gap-6 text-xs text-gray-400">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Use</a>
                <a href="#" className="hover:text-white">Accessibility</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
