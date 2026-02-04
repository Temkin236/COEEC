import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { getEvents } from '../services/api';
import { Clock, MapPin, Monitor, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getEvents(page, limit).then(data => {
      if (!mounted) return;
      setEvents(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, [page, limit]);

  return (
    <div className="bg-white min-h-screen">
      <Hero
        title="Events & Activities"
        subtitle="Join our lectures, workshops, and campus events — stay connected and participate."
        image="https://picsum.photos/1920/600?random=20"
        breadcrumbs={[{ label: 'Campus Life' }, { label: 'Events' }]}
        parentSection="Campus Life"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Upcoming Public Events</h2>
          <div className="text-sm text-gray-500">Showing page {page}</div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin h-10 w-10 border-b-2 border-primary rounded-full"/></div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center text-gray-500 bg-white border border-gray-200 rounded-lg">No public events found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(ev => {
              const start = ev.startAt || ev.start_date || ev.date || '';
              const end = ev.endAt || ev.end_date || '';
              const isOnline = !!ev.isOnline;
              const month = start ? new Date(start).toLocaleString(undefined, { month: 'short' }) : '';
              const day = start ? new Date(start).getDate() : '';
              return (
                <article key={ev.id || ev._id} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-44 bg-gray-100 overflow-hidden">
                    <img src={ev.featuredImageUrl || ev.image || `https://picsum.photos/600/400?random=${(ev.id||Math.random())}`} alt={ev.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-gray-500 flex items-center gap-2"><Clock size={14} /> {month} {day}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">{isOnline ? (<span className="inline-flex items-center gap-1"><Monitor size={14}/> Online</span>) : (<span className="inline-flex items-center gap-1"><MapPin size={14}/> {ev.location || 'On campus'}</span>)}</div>
                    </div>

                    <h3 className="font-bold text-lg mb-2"><Link to={`/events/${ev.id || ev._id}`}>{ev.title}</Link></h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{ev.description || ev.summary || ev.excerpt || ''}</p>

                    <div className="flex items-center justify-between">
                      {ev.eventUrl ? (
                        <a href={ev.eventUrl} target="_blank" rel="noreferrer" className="text-primary font-bold inline-flex items-center gap-2">Register <ExternalLink size={14} /></a>
                      ) : (
                        <Link to={`/events/${ev.id || ev._id}`} className="text-primary font-bold">View Details</Link>
                      )}
                      <div className="text-xs text-gray-400">{ev.tags && ev.tags.length ? ev.tags.slice(0,2).join(', ') : ''}</div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex justify-center gap-3">
          <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page<=1} className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50">Prev</button>
          <button onClick={() => setPage(p => p+1)} className="px-4 py-2 bg-gray-100 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Events;
