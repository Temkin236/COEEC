import React, { useEffect, useState } from 'react';
import { getCareerOpportunities } from '../services/api';
import { Link } from 'react-router-dom';

const Career: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getCareerOpportunities();
        if (mounted && Array.isArray(data)) setItems(data);
      } catch (err) {
        console.warn('Career fetch failed', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Career Center</h1>

      {loading ? (
        <div>Loading opportunities…</div>
      ) : items.length === 0 ? (
        <div>No career opportunities available right now.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((it: any) => (
            <div key={it.id || it.title} className="p-4 border rounded-md">
              <h3 className="font-semibold text-lg">{it.title || it.position || 'Untitled'}</h3>
              {it.organization && <div className="text-sm text-gray-600">{it.organization}</div>}
              {it.location && <div className="text-sm text-gray-600">{it.location}</div>}
              {it.expires && <div className="text-sm text-gray-500">Expires: {new Date(it.expires).toLocaleDateString()}</div>}
              <p className="mt-2 text-sm text-gray-700">{it.summary || it.description?.slice?.(0, 180)}</p>
              {it.applyUrl ? (
                <a href={it.applyUrl} target="_blank" rel="noreferrer" className="inline-block mt-3 text-primary font-medium">Apply</a>
              ) : (
                <Link to={`/career/${it.id || ''}`} className="inline-block mt-3 text-primary font-medium">Details</Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Career;
