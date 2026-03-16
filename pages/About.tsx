import React, { useEffect, useMemo, useState } from 'react';
import { Target, Eye, Quote, Users, CheckCircle, Building, Globe, Award, BookOpen } from 'lucide-react';
import Hero from '../components/Hero';
import { getAbout, getProgramTypes, getStaff, getResearchProjects } from '../services/api';

const About: React.FC = () => {
   const [aboutData, setAboutData] = useState<any>(null);
   const [liveStats, setLiveStats] = useState<{ programs: number; faculty: number; papers: number; labs: number } | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      Promise.allSettled([
         getAbout(),
         getProgramTypes(),
         getStaff(),
         getResearchProjects(),
      ]).then((results) => {
         const aboutResult = results[0];
         if (aboutResult.status === 'fulfilled') {
            const data = aboutResult.value;
            const payload = data && typeof data === 'object' && 'data' in data ? (data as any).data : data;
            setAboutData(payload && typeof payload === 'object' ? payload : null);
         } else {
            setAboutData(null);
         }

         const programs = results[1].status === 'fulfilled' && Array.isArray(results[1].value) ? results[1].value.length : 0;
         const faculty = results[2].status === 'fulfilled' && Array.isArray(results[2].value) ? results[2].value.length : 0;
         const researchItems = results[3].status === 'fulfilled' && Array.isArray(results[3].value) ? results[3].value.length : 0;
         const papers = researchItems;
         const labs = researchItems;

         setLiveStats({ programs, faculty, papers, labs });
      }).finally(() => setLoading(false));
   }, []);

   const pickText = (...values: any[]) => {
      for (const value of values) {
         if (typeof value === 'string' && value.trim()) return value.trim();
      }
      return '';
   };

   const about = useMemo(() => {
      const compactCount = (value: number | undefined) => {
         if (typeof value !== 'number' || Number.isNaN(value)) return '0';
         if (value >= 1000) {
            const rounded = Math.round((value / 1000) * 10) / 10;
            return `${rounded}k+`;
         }
         return `${value}`;
      };

      const fallback = {
         heroTitle: 'About the College',
         heroSubtitle: 'Pioneering engineering education and innovation in Ethiopia since 1993.',
         heroImage: 'https://picsum.photos/1920/600?random=20',
         dean: {
            name: 'Dr. Berhanu Bulcha',
            role: 'Dean, COEEC',
            image: 'https://picsum.photos/600/700?random=30',
            heading: 'Building the Future of Engineering',
            quote: "We are not just teaching engineering; we are cultivating the mindset of innovation that will drive Ethiopia's digital transformation. Our students are the architects of tomorrow.",
            paragraphs: [
               'Welcome to the College of Electrical Engineering and Computing (COEEC). For over three decades, we have been at the forefront of technological advancement in the region. Our curriculum balances rigorous theoretical foundations with hands-on practical experience, ensuring our graduates are industry-ready from day one.',
               'I invite you to explore our vibrant community, where cutting-edge research meets social impact.',
            ],
            signature: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png',
         },
         mission: 'To produce competent, innovative, and ethical professionals in electrical engineering and computing through quality education, problem-solving research, and community-oriented services that contribute to the sustainable development of the nation.',
         vision: 'To be a premier center of excellence in applied engineering and computing in East Africa by 2030, recognized for high-quality graduates and impactful innovations.',
         values: [
            { title: 'Excellence', description: 'Striving for the highest standards in teaching and research.' },
            { title: 'Inclusivity', description: 'Fostering a diverse and welcoming academic environment.' },
            { title: 'Integrity', description: 'Upholding honesty, ethics, and accountability in all actions.' },
         ],
         journeyTitle: 'Three Decades of Growth',
         journeyDescription: 'From a small department to a leading college, our history is defined by resilience, expansion, and a relentless pursuit of academic quality.',
         journeyImage: 'https://picsum.photos/400/300?random=35',
         timeline: [
            { year: '1993', title: 'Foundation', desc: 'Established as the Department of Electrical Engineering under Nazareth Technical College.' },
            { year: '2006', title: 'University Status', desc: 'Upgraded to Adama University, expanding programs to include Computer Science.' },
            { year: '2011', title: 'Center of Excellence', desc: 'Designated as a Science and Technology University (ASTU) by the Ministry of Education.' },
            { year: '2018', title: 'New Complex', desc: 'Inauguration of the dedicated COEEC building with state-of-the-art laboratories.' },
            { year: '2023', title: 'PhD Programs', desc: 'Launched PhD programs in Power Engineering and Software Engineering.' },
         ],
         leadership: [
            { name: 'Dr. Berhanu Bulcha', role: 'Dean', image: 'https://picsum.photos/300/300?random=30' },
            { name: 'Dr. Sarah Ahmed', role: 'Vice Dean, Academics', image: 'https://picsum.photos/300/300?random=7' },
            { name: 'Mr. Dawit Tadesse', role: 'Vice Dean, Research', image: 'https://picsum.photos/300/300?random=8' },
            { name: 'Ms. Tigist Alemu', role: 'Head, Administration', image: 'https://picsum.photos/300/300?random=9' },
         ],
         stats: [
            { label: 'Academic Programs', val: compactCount(liveStats?.programs) },
            { label: 'Faculty Members', val: compactCount(liveStats?.faculty) },
            { label: 'Research Papers', val: compactCount(liveStats?.papers) },
            { label: 'Active Labs', val: compactCount(liveStats?.labs) },
         ],
      };

      const source = aboutData || {};
      const sourceDean = (source.deanMessage || source.dean || source.leadershipMessage || {}) as any;
      const sourceValues = Array.isArray(source.coreValues) ? source.coreValues : (Array.isArray(source.values) ? source.values : []);
      const sourceTimeline = Array.isArray(source.history) ? source.history : (Array.isArray(source.timeline) ? source.timeline : []);
      const sourceLeadership = Array.isArray(source.leadership) ? source.leadership : (Array.isArray(source.administration) ? source.administration : []);
      const sourceStats = Array.isArray(source.stats) ? source.stats : [];
      const sourceImage = source.image && typeof source.image === 'object' ? source.image : null;

      return {
         heroTitle: pickText(source.heroTitle, source.title, fallback.heroTitle),
         heroSubtitle: pickText(source.heroSubtitle, source.subtitle, fallback.heroSubtitle),
         heroImage: pickText(source.heroImage, source.bannerImage, source.image, fallback.heroImage),
         dean: {
            name: pickText(sourceDean.name, source.deanName, fallback.dean.name),
            role: pickText(sourceDean.role, sourceDean.title, source.deanTitle, fallback.dean.role),
            image: pickText(sourceDean.image, sourceDean.photo, source.deanImage, fallback.dean.image),
            heading: pickText(sourceDean.heading, sourceDean.headline, source.leadershipHeading, fallback.dean.heading),
            quote: pickText(sourceDean.quote, source.quote, fallback.dean.quote),
            paragraphs: Array.isArray(sourceDean.paragraphs)
               ? sourceDean.paragraphs.filter((p: any) => typeof p === 'string' && p.trim())
               : [
                     pickText(sourceDean.message, sourceDean.content, fallback.dean.paragraphs[0]),
                     pickText(sourceDean.closing, sourceDean.note, fallback.dean.paragraphs[1]),
                  ].filter(Boolean),
            signature: pickText(sourceDean.signature, source.signature, fallback.dean.signature),
         },
         mission: pickText(source.mission, source.strategicMission, fallback.mission),
         vision: pickText(source.vision, source.strategicVision, fallback.vision),
         values: (sourceValues.length ? sourceValues : fallback.values).map((v: any) => ({
            title: pickText(v.title, v.name, 'Value'),
            description: pickText(v.description, v.desc, ''),
         })),
         journeyTitle: pickText(source.journeyTitle, source.historyTitle, source.subtitle, fallback.journeyTitle),
         journeyDescription: pickText(source.journeyDescription, source.historyDescription, source.historyIntro, source.description, fallback.journeyDescription),
         journeyImage: pickText(source.journeyImage, source.historyImage, source.imageUrl, sourceImage?.url, fallback.journeyImage),
         timeline: (sourceTimeline.length ? sourceTimeline : fallback.timeline)
            .slice()
            .sort((a: any, b: any) => {
               const orderA = typeof a?.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER;
               const orderB = typeof b?.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER;
               if (orderA !== orderB) return orderA - orderB;

               const yearA = Number.parseInt(pickText(a?.year, a?.date, '0'), 10);
               const yearB = Number.parseInt(pickText(b?.year, b?.date, '0'), 10);
               if (!Number.isNaN(yearA) && !Number.isNaN(yearB)) return yearA - yearB;

               return 0;
            })
            .map((item: any) => ({
               year: pickText(item.year, item.date, '----'),
               title: pickText(item.title, item.name, 'Milestone'),
               desc: pickText(item.desc, item.description, ''),
            })),
         leadership: (sourceLeadership.length ? sourceLeadership : fallback.leadership).map((person: any, idx: number) => ({
            name: pickText(person.name, person.fullName, 'Staff'),
            role: pickText(person.role, person.title, 'Administrator'),
            image: pickText(person.image, person.photo, `https://picsum.photos/300/300?random=${idx + 40}`),
         })),
         stats: (sourceStats.length ? sourceStats : fallback.stats).map((stat: any) => ({
            label: pickText(stat.label, stat.title, 'Metric'),
            val: pickText(stat.val, stat.value, '0'),
         })),
      };
   }, [aboutData, liveStats]);

    const hasAboutContent = !!(aboutData && typeof aboutData === 'object' && Object.keys(aboutData).length > 0);

    if (loading) {
         return (
            <div className="bg-white min-h-screen font-sans text-gray-800">
               <Hero
                  title="About the College"
                  subtitle="Loading content from the college API."
                  image="https://picsum.photos/1920/600?random=20"
                  breadcrumbs={[{ label: 'About Us' }]}
                  parentSection="Who We Are"
               />
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                  <div className="flex justify-center items-center py-20">
                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
               </div>
            </div>
         );
    }

    if (!hasAboutContent) {
         return (
            <div className="bg-white min-h-screen font-sans text-gray-800">
               <Hero
                  title="About the College"
                  subtitle="This section is connected to /api/about and will display content once the backend provides it."
                  image="https://picsum.photos/1920/600?random=20"
                  breadcrumbs={[{ label: 'About Us' }]}
                  parentSection="Who We Are"
               />
               <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                  <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
                     <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">No About Content Available</h2>
                     <p className="text-gray-600 leading-relaxed">
                        The frontend is calling <span className="font-semibold">/api/about</span>, but the endpoint currently returns <span className="font-semibold">null</span>.
                        Add or publish About content in the backend, and this page will render it automatically.
                     </p>
                  </div>
               </section>
            </div>
         );
    }

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      <Hero 
            title={about.heroTitle}
            subtitle={about.heroSubtitle}
            image={about.heroImage}
        breadcrumbs={[{ label: 'About Us' }]}
        parentSection="Who We Are"
      />

      {/* Dean's Message - Asymmetric Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 relative">
             <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
               <img 
                         src={about.dean.image}
                         alt={`Dean ${about.dean.name}`}
                 className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                           <h3 className="text-2xl font-serif font-bold">{about.dean.name}</h3>
                           <p className="text-blue-200 font-medium tracking-wide uppercase text-sm">{about.dean.role}</p>
               </div>
             </div>
             {/* Decorative Elements */}
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary rounded-tl-3xl -z-0"></div>
             <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-br-3xl -z-0"></div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
             <div>
                <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Leadership</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">{about.dean.heading}</h2>
             </div>
             
             <div className="relative pl-8 border-l-4 border-secondary/50">
                <Quote className="absolute -top-2 left-8 text-primary/10 w-16 h-16 transform -scale-x-100" />
                <p className="text-xl md:text-2xl font-serif text-gray-700 italic leading-relaxed relative z-10">
                   "{about.dean.quote}"
                </p>
             </div>

             <div className="prose text-gray-600 leading-relaxed">
                {about.dean.paragraphs.map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
             </div>
             
             <img src={about.dean.signature} alt="Signature" className="h-12 opacity-50 mt-4" />
          </div>
        </div>
      </section>

      {/* Strategic Pillars - Bento Grid */}
      <section className="bg-gray-50 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-serif font-bold text-gray-900">Our Strategic Pillars</h2>
               <p className="text-gray-500 mt-4 max-w-2xl mx-auto">The core principles that guide our academic and operational excellence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
               {/* Mission - Large Block */}
               <div className="md:col-span-2 bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>
                  <Target className="w-12 h-12 text-primary mb-6 relative z-10" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">Our Mission</h3>
                  <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                     {about.mission}
                  </p>
               </div>

               {/* Vision - Tall Block */}
               <div className="bg-primary text-white p-10 rounded-2xl shadow-lg shadow-primary/20 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-900 to-black opacity-50"></div>
                  <Eye className="w-12 h-12 text-secondary mb-6 relative z-10" />
                  <div className="relative z-10">
                     <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                     <p className="text-blue-100 leading-relaxed">
                        {about.vision}
                     </p>
                  </div>
               </div>

               {/* Core Values - 3 Small Blocks */}
               {about.values.slice(0, 3).map((value: any, idx: number) => (
                 <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-secondary/50 transition-colors">
                    {idx === 0 && <Award className="w-8 h-8 text-secondary mb-4" />}
                    {idx === 1 && <Users className="w-8 h-8 text-secondary mb-4" />}
                    {idx === 2 && <CheckCircle className="w-8 h-8 text-secondary mb-4" />}
                    <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-sm text-gray-500">{value.description}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* History - Vertical Timeline */}
      <section className="py-24 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-16">
               <div className="md:w-1/3">
                  <div className="sticky top-24">
                     <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Our Journey</span>
                     <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">{about.journeyTitle}</h2>
                     <p className="text-gray-600 mb-8">
                        {about.journeyDescription}
                     </p>
                     <img src={about.journeyImage} className="rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500" alt="Old Campus" />
                  </div>
               </div>

               <div className="md:w-2/3 relative">
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200"></div>
                  
                  <div className="space-y-12">
                     {about.timeline.map((item: any, idx: number) => (
                        <div key={idx} className="relative flex gap-8 group">
                           <div className="flex-shrink-0 w-16 h-16 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center font-bold text-primary shadow-sm z-10 group-hover:border-secondary transition-colors">
                              {item.year}
                           </div>
                           <div className="pt-2 pb-8">
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Leadership Team */}
      <section className="bg-gray-50 py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-serif font-bold text-gray-900">Administration</h2>
               <div className="w-16 h-1 bg-secondary mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {about.leadership.slice(0, 4).map((person: any, idx: number) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group">
                     <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-gray-50 group-hover:border-primary/20 transition-colors">
                        <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                     </div>
                     <h3 className="text-lg font-bold text-gray-900 mb-1">{person.name}</h3>
                     <p className="text-primary text-sm font-medium uppercase tracking-wide">{person.role}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-primary py-16 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
               {about.stats.slice(0, 4).map((stat: any, idx: number) => (
                  <div key={idx} className="text-center px-4">
                     {idx === 0 && <BookOpen className="w-8 h-8 mx-auto mb-4 text-secondary opacity-80" />}
                     {idx === 1 && <Users className="w-8 h-8 mx-auto mb-4 text-secondary opacity-80" />}
                     {idx === 2 && <Globe className="w-8 h-8 mx-auto mb-4 text-secondary opacity-80" />}
                     {idx === 3 && <Building className="w-8 h-8 mx-auto mb-4 text-secondary opacity-80" />}
                     <div className="text-4xl font-bold mb-2">{stat.val}</div>
                     <div className="text-xs md:text-sm text-blue-200 uppercase tracking-widest">{stat.label}</div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;