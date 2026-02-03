
import React, { useState } from 'react';
import { submitContactForm } from '../services/api';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('idle');
    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have questions about our programs, research, or admissions? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
               <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <MapPin className="text-secondary shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-800">Address</p>
                     <p className="text-gray-600">Adama Science and Technology University<br/>P.O. Box 1888, Adama, Ethiopia</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <Phone className="text-secondary shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-800">Phone</p>
                     <p className="text-gray-600">+251-221-110-400</p>
                     <p className="text-gray-600">+251-221-100-001 (Fax)</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <Mail className="text-secondary shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-800">Email</p>
                     <p className="text-gray-600">dean.coeec@astu.edu.et</p>
                     <p className="text-gray-600">registrar@astu.edu.et</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4">
                   <Clock className="text-secondary shrink-0 mt-1" />
                   <div>
                     <p className="font-semibold text-gray-800">Office Hours</p>
                     <p className="text-gray-600">Mon - Fri: 8:30 AM - 5:30 PM</p>
                     <p className="text-gray-600">Sat: 8:30 AM - 12:30 PM</p>
                   </div>
                 </div>
               </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 h-64 rounded-xl overflow-hidden shadow-inner relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.747124230219!2d39.290297314783!3d8.54413399385801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b20757c2c1c73%3A0xb353597d391f16c5!2sAdama%20Science%20and%20Technology%20University!5e0!3m2!1sen!2set!4v1629883929100!5m2!1sen!2set" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy"
                title="ASTU Map"
                className="filter grayscale group-hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 lg:p-10 rounded-xl shadow-lg border-t-4 border-primary">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            {status === 'success' && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">Message sent successfully!</div>}
            {status === 'error' && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">Failed to send message. Please try again.</div>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                  <option>General Inquiry</option>
                  <option>Admissions</option>
                  <option>Research Partnership</option>
                  <option>Website Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={5} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"></textarea>
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
