import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(
      'service_xcq79sx',
      'template_ol6tta8',
      e.currentTarget,
      'ZotnsZdQLiHPx-Jgu'
    )
      .then(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
        setTimeout(() => setSubmitted(false), 5000);
      })
      .catch((error) => {
        console.error('Email send error:', error);
        alert('Ошибка при отправке');
        setIsSubmitting(false);
      });

    e.currentTarget.reset();
  };

  return (
    <div className="pt-24">
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-2 font-playfair"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600"
          >
            We'd love to hear from you
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="text-2xl font-bold mb-6 font-playfair">Get in Touch</h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 text-green-800 p-4 rounded-lg mb-6"
              >
                Thank you for your message! We will get back to you soon.
              </motion.div>
            ) : (
              <form onSubmit={sendEmail}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-300"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${isSubmitting ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
                    } text-white px-6 py-3 rounded-lg transition-colors duration-300 shadow-md flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <h2 className="text-2xl font-bold mb-6 font-playfair">Our Information</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex items-start mb-4">
                <MapPin className="w-6 h-6 text-red-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg font-playfair">Address</h4>
                  <p className="text-gray-700">123 Italian Avenue, Foodville, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <Phone className="w-6 h-6 text-red-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg font-playfair">Phone</h4>
                  <p className="text-gray-700">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start mb-4">
                <Mail className="w-6 h-6 text-red-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg font-playfair">Email</h4>
                  <p className="text-gray-700">info@foody.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-6 h-6 text-red-600 mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg font-playfair">Opening Hours</h4>
                  <p className="text-gray-700">Monday - Friday: 11:00 AM - 10:00 PM</p>
                  <p className="text-gray-700">Saturday - Sunday: 10:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059445135!2d-74.25986613799748!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1662303150687!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;