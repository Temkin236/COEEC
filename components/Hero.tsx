
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
  label: string;
  path?: string;
}

interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  breadcrumbs: Breadcrumb[];
  parentSection?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, image, breadcrumbs, parentSection }) => {
  return (
    <div className="relative h-[350px] md:h-[450px] bg-primary">
        <img 
          src={image} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
           {/* Breadcrumbs */}
           <div className="flex items-center text-xs md:text-sm text-blue-200 mb-4 font-medium">
              <Link to="/" className="hover:text-white flex items-center gap-1"><Home size={14}/> Home</Link>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <ChevronRight size={14} className="mx-2 opacity-50"/>
                  {crumb.path ? (
                    <Link to={crumb.path} className="hover:text-white">{crumb.label}</Link>
                  ) : (
                    <span className="text-secondary">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
           </div>

           {parentSection && (
             <span className="text-secondary font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block animate-fade-in-up">
               {parentSection}
             </span>
           )}

           <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight max-w-4xl animate-fade-in-up delay-100">
             {title}
           </h1>

           {subtitle && (
             <p className="text-blue-100 text-lg max-w-2xl animate-fade-in-up delay-200">
               {subtitle}
             </p>
           )}
        </div>
      </div>
  );
};

export default Hero;
