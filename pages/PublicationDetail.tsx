import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { getPublicationById } from '../services/api';
import { BookOpen, ExternalLink, Download } from 'lucide-react';

const PublicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pub, setPub] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!id) {
      setLoading(false);
      return;
    }
    getPublicationById(id).then(data => {
      if (!mounted) return;
      setPub(data);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, [id]);

  return (
    <div className="bg-white min-h-screen">
      <Hero
        title={pub?.title || 'Publication'}
        subtitle={pub?.journal || pub?.venue || ''}
        image="https://picsum.photos/1920/600?random=16"
        breadcrumbs={[{ label: 'Research', path: '/research' }, { label: 'Publications', path: '/publications' }, { label: pub?.title || 'Detail' }]}
        parentSection="Research"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin h-10 w-10 border-b-2 border-primary rounded-full"/></div>
        ) : !pub ? (
          <div className="text-center p-12 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-xl font-bold">Publication not found</h3>
            <p className="text-sm text-gray-500">The requested publication could not be loaded.</p>
            <div className="mt-4"><Link to="/publications" className="text-primary font-bold">Back to publications</Link></div>
          </div>
        ) : (
          <article className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">{pub.title}</h1>
                <p className="text-sm text-gray-600">{pub.journal || pub.publisher || pub.venue} {pub.year ? `· ${pub.year}` : ''}</p>
              </div>
              <div className="flex items-center gap-3">
                {pub.link && (
                  <a href={pub.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary font-bold">
                    View Online <ExternalLink size={16} />
                  </a>
                )}
                {pub.fileUrl && (
                  <a href={pub.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary font-bold">
                    Download <Download size={16} />
                  </a>
                )}
              </div>
            </div>

            {pub.authors && pub.authors.length > 0 && (
              <p className="text-sm text-gray-700 mb-4">Authors: {Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}</p>
            )}

            <div className="prose prose-sm text-gray-700">
              {pub.abstract ? <div dangerouslySetInnerHTML={{ __html: pub.abstract }} /> : <p>{pub.description || pub.summary || 'No abstract available.'}</p>}
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

export default PublicationDetail;
