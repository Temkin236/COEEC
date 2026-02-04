import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { getPublications, getMyPublications, getPublicationById } from '../services/api';
import { Link } from 'react-router-dom';

const Publications: React.FC = () => {
  const [publications, setPublications] = useState<any[]>([]);
  const [mine, setMine] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getPublications().then(data => {
      if (!mounted) return;
      setPublications(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  const loadMy = async () => {
    try {
      const data = await getMyPublications();
      setMine(Array.isArray(data) ? data : []);
    } catch (err) {
      setMine([]);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Hero
        title="Publications"
        subtitle="Research outputs and publications from our faculty and students."
        image="https://picsum.photos/1920/600?random=12"
        breadcrumbs={[{ label: 'Research' }, { label: 'Publications' }]}
        parentSection="Research"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">All Publications</h2>
          <div className="flex gap-2">
            <button onClick={loadMy} className="px-4 py-2 bg-primary text-white rounded">My Publications</button>
            <Link to="/research" className="px-4 py-2 bg-gray-100 rounded">Back to Research</Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-10 w-10 border-b-2 border-primary rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((p: any) => (
              <article key={p.id || p._id} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg mb-2"><Link to={`/publications/${p.id || p._id}`}>{p.title || p.name}</Link></h3>
                <p className="text-sm text-gray-600 mb-2">{p.journal || p.publisher || p.venue}</p>
                <p className="text-xs text-gray-400">{p.year || p.publishedAt || ''}</p>
              </article>
            ))}
          </div>
        )}

        {mine && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4">My Publications</h3>
            {mine.length === 0 ? (
              <p className="text-sm text-gray-500">No personal publications available or you are not authorized.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mine.map((p: any) => (
                  <article key={p.id || p._id} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-lg mb-1">{p.title}</h4>
                    <p className="text-sm text-gray-600">{p.journal}</p>
                    <p className="text-xs text-gray-400">{p.year}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
