import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { getContactMessages } from '../services/api';
import { Link } from 'react-router-dom';

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getContactMessages(page, limit).then(data => {
      if (!mounted) return;
      setMessages(Array.isArray(data) ? data : []);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, [page, limit]);

  return (
    <div className="bg-white min-h-screen">
      <Hero
        title="Contact Messages"
        subtitle="Admin view: list of messages submitted via the contact form."
        image="https://picsum.photos/1920/600?random=14"
        breadcrumbs={[{ label: 'Contact' }, { label: 'Messages' }]}
        parentSection="Admin"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Messages (Page {page})</h2>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p-1))} className="px-4 py-2 bg-gray-100 rounded">Prev</button>
            <button onClick={() => setPage(p => p+1)} className="px-4 py-2 bg-gray-100 rounded">Next</button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-10 w-10 border-b-2 border-primary rounded-full" />
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {messages.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No messages found.</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">From</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Received</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages.map((m: any) => (
                    <tr key={m.id || m._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{m.firstName ? `${m.firstName} ${m.lastName || ''}` : m.email || '—'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{m.subject || m.title || '—'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{m.category || m.type || '—'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{m.createdAt ? new Date(m.createdAt).toLocaleString() : m.date || '—'}</td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <Link to={`/contact-messages/${m.id || m._id}`} className="text-primary font-bold">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
