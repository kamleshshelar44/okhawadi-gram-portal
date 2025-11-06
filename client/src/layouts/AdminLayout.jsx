import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const adminMenu = [
    { path: '/admin', label: t('admin.dashboard'), icon: '🏠' },
    { path: '/admin/village-info', label: t('admin.villageInfo'), icon: '📝' },
    { path: '/admin/news', label: t('admin.newsManagement'), icon: '📰' },
    { path: '/admin/projects', label: t('admin.projectManagement'), icon: '🏗️' },
    { path: '/admin/gallery', label: t('admin.galleryManagement'), icon: '🖼️' },
    { path: '/admin/contacts', label: t('admin.contactManagement'), icon: '📞' },
    { path: '/admin/schemes', label: t('admin.schemeManagement'), icon: '📋' },
    { path: '/admin/awards', label: t('admin.awardManagement'), icon: '🏆' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                📋 ओखवडी ग्रामपंचायत - Admin Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                🌐 Visit Site
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                {t('admin.logout')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen">
          <nav className="mt-5 px-2">
            <ul className="space-y-1">
              {adminMenu.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      window.location.pathname === item.path
                        ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;