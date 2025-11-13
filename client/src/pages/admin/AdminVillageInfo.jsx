import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const AdminVillageInfo = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('en');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch village information from backend
  const fetchVillageInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/village/admin`);
      if (response.data.success) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching village info:', error);
      toast.error('Failed to fetch village information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVillageInfo();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Save village information
  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/village`, formData);
      if (response.data.success) {
        toast.success('Village information updated successfully');
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('Error saving village info:', error);
      toast.error(error.response?.data?.message || 'Failed to save village information');
    } finally {
      setSaving(false);
    }
  };

  // Reset village information
  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all village information? This action cannot be undone.')) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/village`);
        if (response.data.success) {
          toast.success('Village information reset successfully');
          await fetchVillageInfo();
        }
      } catch (error) {
        console.error('Error resetting village info:', error);
        toast.error('Failed to reset village information');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('villageInfoManagement', 'Village Information Management')}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('reset', 'Reset')}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {saving ? t('saving', 'Saving...') : t('save', 'Save')}
          </button>
        </div>
      </div>

      {/* Language Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
            { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setActiveTab(lang.code)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === lang.code
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
              {t('basicInformation', 'Basic Information')}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('villageName', 'Village Name')}
              </label>
              <input
                type="text"
                name={`name_${activeTab}`}
                value={formData[`name_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterVillageName', 'Enter village name')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('taluka', 'Taluka')}
              </label>
              <input
                type="text"
                name={`taluka_${activeTab}`}
                value={formData[`taluka_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterTaluka', 'Enter taluka')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('district', 'District')}
              </label>
              <input
                type="text"
                name={`district_${activeTab}`}
                value={formData[`district_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterDistrict', 'Enter district')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('state', 'State')}
              </label>
              <input
                type="text"
                name={`state_${activeTab}`}
                value={formData[`state_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterState', 'Enter state')}
              />
            </div>
          </div>

          {/* Postal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
              {t('postalInformation', 'Postal Information')}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('pinCode', 'Pin Code')}
              </label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterPinCode', 'Enter pin code')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('postOffice', 'Post Office')}
              </label>
              <input
                type="text"
                name={`postOffice_${activeTab}`}
                value={formData[`postOffice_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterPostOffice', 'Enter post office')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('stdCode', 'STD Code')}
              </label>
              <input
                type="text"
                name="stdCode"
                value={formData.stdCode || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterStdCode', 'Enter STD code')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('elevation', 'Elevation')}
              </label>
              <input
                type="text"
                name="elevation"
                value={formData.elevation || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterElevation', 'Enter elevation')}
              />
            </div>
          </div>

          {/* Government Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
              {t('governmentInformation', 'Government Information')}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('assemblyConstituency', 'Assembly Constituency')}
              </label>
              <input
                type="text"
                name={`assemblyConstituency_${activeTab}`}
                value={formData[`assemblyConstituency_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterAssemblyConstituency', 'Enter assembly constituency')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('assemblyMLA', 'Assembly MLA')}
              </label>
              <input
                type="text"
                name={`assemblyMLA_${activeTab}`}
                value={formData[`assemblyMLA_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterAssemblyMLA', 'Enter assembly MLA')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('lokSabhaConstituency', 'Lok Sabha Constituency')}
              </label>
              <input
                type="text"
                name={`lokSabhaConstituency_${activeTab}`}
                value={formData[`lokSabhaConstituency_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterLokSabhaConstituency', 'Enter Lok Sabha constituency')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('parliamentMP', 'Parliament MP')}
              </label>
              <input
                type="text"
                name={`parliamentMP_${activeTab}`}
                value={formData[`parliamentMP_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterParliamentMP', 'Enter parliament MP')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('sarpanch', 'Sarpanch')}
              </label>
              <input
                type="text"
                name={`sarpanch_${activeTab}`}
                value={formData[`sarpanch_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterSarpanch', 'Enter sarpanch')}
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
              {t('statistics', 'Statistics')}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('population', 'Population')}
              </label>
              <input
                type="number"
                name="population"
                value={formData.population || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterPopulation', 'Enter population')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('literacyRate', 'Literacy Rate (%)')}
              </label>
              <input
                type="number"
                name="literacyRate"
                value={formData.literacyRate || ''}
                onChange={handleChange}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterLiteracyRate', 'Enter literacy rate')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('area', 'Area (sq km)')}
              </label>
              <input
                type="number"
                name="area"
                value={formData.area || ''}
                onChange={handleChange}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterArea', 'Enter area')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('establishedYear', 'Established Year')}
              </label>
              <input
                type="number"
                name="establishedYear"
                value={formData.establishedYear || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterEstablishedYear', 'Enter established year')}
              />
            </div>
          </div>

          {/* Demographics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
              {t('demographics', 'Demographics')}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('malePopulation', 'Male Population')}
              </label>
              <input
                type="number"
                name="malePopulation"
                value={formData.malePopulation || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterMalePopulation', 'Enter male population')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('femalePopulation', 'Female Population')}
              </label>
              <input
                type="number"
                name="femalePopulation"
                value={formData.femalePopulation || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterFemalePopulation', 'Enter female population')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('totalHouses', 'Total Houses')}
              </label>
              <input
                type="number"
                name="totalHouses"
                value={formData.totalHouses || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterTotalHouses', 'Enter total houses')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('schools', 'Schools')}
              </label>
              <input
                type="number"
                name="schools"
                value={formData.schools || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterSchools', 'Enter number of schools')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('hospitals', 'Hospitals')}
              </label>
              <input
                type="number"
                name="hospitals"
                value={formData.hospitals || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterHospitals', 'Enter number of hospitals')}
              />
            </div>
          </div>

          {/* Links and Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
              {t('linksAndContact', 'Links and Contact')}
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('mapLink', 'Map Link')}
              </label>
              <input
                type="url"
                name="mapLink"
                value={formData.mapLink || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterMapLink', 'Enter Google Maps link')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('grampanchayatContact', 'Gram Panchayat Contact')}
              </label>
              <input
                type="text"
                name={`grampanchayatContact_${activeTab}`}
                value={formData[`grampanchayatContact_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterGrampanchayatContact', 'Enter gram panchayat contact')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('mainOccupation', 'Main Occupation')}
              </label>
              <input
                type="text"
                name={`mainOccupation_${activeTab}`}
                value={formData[`mainOccupation_${activeTab}`] || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={t('enterMainOccupation', 'Enter main occupation')}
              />
            </div>
          </div>
        </div>

        {/* Textarea Fields */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('description', 'Description')}
            </label>
            <textarea
              name={`description_${activeTab}`}
              value={formData[`description_${activeTab}`] || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder={t('enterDescription', 'Enter village description')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('history', 'History')}
            </label>
            <textarea
              name={`history_${activeTab}`}
              value={formData[`history_${activeTab}`] || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder={t('enterHistory', 'Enter village history')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('culture', 'Culture')}
            </label>
            <textarea
              name={`culture_${activeTab}`}
              value={formData[`culture_${activeTab}`] || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder={t('enterCulture', 'Enter village culture information')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('climate', 'Climate')}
            </label>
            <textarea
              name={`climate_${activeTab}`}
              value={formData[`climate_${activeTab}`] || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder={t('enterClimate', 'Enter climate information')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('festivals', 'Festivals')}
            </label>
            <textarea
              name={`festivals_${activeTab}`}
              value={formData[`festivals_${activeTab}`] || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder={t('enterFestivals', 'Enter festivals information')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVillageInfo;