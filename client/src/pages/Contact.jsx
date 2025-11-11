import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  MessageSquare,
  Send,
  AlertCircle,
  Check
} from 'lucide-react';
import api from '../utils/axios';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/contact-form', formData);
      setSuccess('तुमचा संदेश यशस्वीरित्या पाठवला गेला आहे! आम्ही लवकरच तुमच्याशी संपर्क साधू.');
      setFormData({
        name: '',
        email: '',
        mobile: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrors({
        general: error.response?.data?.message || 'संदेश पाठवताना त्रुटी आली. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            आमच्याशी संपर्क साधा
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            ओखवडी ग्राम पंचायतीशी संपर्क साधण्यासाठी खालील माहिती वापरा. आपल्याला तुमच्या अभिप्रायांना ऐकून घेण्यात आनंद होईल.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                संपर्क माहिती
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">फोन</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +91 02378 245678
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      सोमवार ते शुक्रवार, सकाळी 10 ते सायंकाळी 6
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ईमेल</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      grampanchyat.okhawadi@gov.in
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      आम्ही 24 तासांत उत्तर देण्याचा प्रयत्न करू
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">पत्ता</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      ग्रामपंचायत कार्यालय, ओखवडी
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      ता. जवळी, जि. सातारा, महाराष्ट्र 415012
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">कार्याची वेळ</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      सोमवार ते शुक्रवार: सकाळी 10:00 - सायंकाळी 6:00
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      शनिवार: सकाळी 10:00 - सायंकाळी 4:00
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      रविवार: सुट्टी
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="mt-8 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  तातडीच्या सेवा
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  108 - आरोग्य सेवा<br />
                  112 - पोलिस हेल्पलाईन<br />
                  100 - अग्निशामक विभाग
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                  महत्त्वाच्या संपर्क संख्या
                </h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  सरपंच: +91 98765 43210<br />
                  ग्रामविकास अधिकारी: +91 98765 43211<br />
                  तलाठी: +91 98765 43212
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                संदेश पाठवा
              </h2>

              {/* Success/Error Messages */}
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  {success}
                </div>
              )}

              {errors.general && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      पूर्ण नाव *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="आपले पूर्ण नाव लिहा"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      ईमेल पत्ता *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    मोबाईल क्रमांक *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.mobile ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="10 अंकी मोबाईल क्रमांक"
                    maxLength="10"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    संदेश *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="आपला संदेश येथे लिहा..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    माहिती:
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• आपला संदेश 24 तासांत पाहिजे</li>
                    <li>• आणखी माहितीसाठी आम्हाला फोन करा</li>
                    <li>• तातडीच्या सेवांसाठी वर दिलेल्या क्रमांकांचा वापर करा</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{loading ? 'पाठवत आहे...' : 'संदेश पाठवा'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                स्थान
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                खालील नकाशावर ओखवडी ग्राम पंचायतीचे स्थान पाहा
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">
                    नकाशा लवकरच उपलब्ध होईल
                  </p>
                  <a
                    href="https://maps.app.goo.gl/Q6WzhrChjYEhK6Tm9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Google Maps मध्ये पाहा
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;