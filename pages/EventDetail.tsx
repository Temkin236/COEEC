import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { getEventById } from '../services/api';
import { Calendar, MapPin, Monitor, ExternalLink } from 'lucide-react';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!id) { setLoading(false); return; }
    getEventById(id).then(data => { if (!mounted) return; setEvent(data); setLoading(false); }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  if (loading) return (<div className="flex justify-center py-12"><div className="animate-spin h-10 w-10 border-b-2 border-primary rounded-full"/></div>);

  if (!event) return (
    <div className="max-w-4xl mx-auto p-12 text-center">
      <h3 className="text-xl font-bold">Event not found</h3>
      <p className="text-sm text-gray-500">The requested event could not be loaded.</p>
      <div className="mt-4"><Link to="/events" className="text-primary font-bold">Back to events</Link></div>
    </div>
  );

  const start = event.startAt || event.start_date || event.date || '';
  const end = event.endAt || event.end_date || '';

  return (
    <div className="bg-white min-h-screen">
      <Hero title={event.title} subtitle={event.location || (event.isOnline ? 'Online Event' : '')} image={event.featuredImageUrl || event.image || 'https://picsum.photos/1920/600?random=21'} breadcrumbs={[{label:'Events', path:'/events'},{label:event.title}]} parentSection="Campus Life" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-serif font-bold mb-2">{event.title}</h1>
              <p className="text-sm text-gray-600">{event.subtitle || event.summary || ''}</p>
            </div>
            <div className="text-sm text-gray-500 text-right">
              <div className="flex items-center gap-2 justify-end"><Calendar size={16}/>{start ? new Date(start).toLocaleString() : '—'}</div>
              {end && <div className="flex items-center gap-2 justify-end mt-1"><Calendar size={16}/> {new Date(end).toLocaleString()}</div>}
            </div>
          </div>

          <div className="mb-6">
            {event.description ? <div className="prose prose-sm text-gray-700" dangerouslySetInnerHTML={{__html: event.description}} /> : <p className="text-gray-700">No description available.</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin size={14}/> {event.location || (event.isOnline ? 'Online' : 'TBA')}</div>
              {event.eventUrl && <a href={event.eventUrl} target="_blank" rel="noreferrer" className="text-primary inline-flex items-center gap-2">Event Link <ExternalLink size={14}/></a>}
            </div>
            <div>
              {event.tags && event.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">{event.tags.map((t: string, i: number) => <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>)}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
