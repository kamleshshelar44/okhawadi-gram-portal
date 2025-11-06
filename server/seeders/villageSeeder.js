const mongoose = require('mongoose');
require('dotenv').config();
const VillageInfo = require('../models/VillageInfo');
const News = require('../models/News');
const Contact = require('../models/Contact');

const seedVillageData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // Clear existing data
    await VillageInfo.deleteMany({});
    await News.deleteMany({});
    await Contact.deleteMany({});

    // Create village info
    const villageInfo = new VillageInfo({
      name: 'Okhawadi (ओखवडी)',
      taluka: 'Jawali',
      district: 'Satara',
      state: 'Maharashtra',
      pinCode: '415012',
      postOffice: 'Medha',
      stdCode: '02378',
      elevation: '678 meters Above Sea Level',
      assemblyConstituency: 'Satara Assembly Constituency',
      assemblyMLA: 'Shrimant Chh.Shivendrasinh Abhaysinhraje Bhosale',
      lokSabhaConstituency: 'Satara Parliamentary Constituency',
      parliamentMP: 'Shrimant Chh. Udayanraje Pratapsinhmaharaj Bhosale',
      sarpanch: 'Kausalya Laxman Shelar',
      mapLink: 'https://maps.app.goo.gl/Q6WzhrChjYEhK6Tm9',
      population: 2150,
      literacyRate: 87.5,
      area: 12.4,
      waterSources: ['Well', 'Borewell', 'Pipeline'],
      schools: [
        { name: 'Zilla Parishad Primary School', type: 'Primary' },
        { name: 'Mahatma Phule High School', type: 'Secondary' }
      ],
      description: 'Okhawadi is a beautiful village located in the Jawali taluka of Satara district, Maharashtra. Known for its rich cultural heritage and scenic beauty, the village is nestled in the Western Ghats.',
      history: 'The village of Okhawadi has a rich history dating back several centuries. Originally settled by agricultural communities, the village has evolved while maintaining its traditional values and cultural practices.',
      culture: 'The culture of Okhawadi is deeply rooted in Maharashtrian traditions. The village celebrates various festivals with great enthusiasm and maintains a strong community spirit.',
      festivals: [
        { name: 'Ganesh Chaturthi', description: 'Celebrated with great enthusiasm with community Ganesh festival' },
        { name: 'Diwali', description: 'Festival of lights celebrated with traditional fervor' },
        { name: 'Makar Sankranti', description: 'Harvest festival celebrated with kite flying and traditional sweets' }
      ]
    });

    await villageInfo.save();

    // Create sample news
    const newsItems = [
      {
        title: 'ग्रामपंचायत चुनाव यशस्वीरित्या पार पडले',
        content: 'ओखवडी ग्रामपंचायतीचे निवडणूक यशस्वीरित्या पार पडल्या. नवीन सरपंच कौशल्या लक्ष्मण शेलर यांची निवड झाली आहे.',
        category: 'news',
        author: 'Gram Panchayat'
      },
      {
        title: 'गावात नवीन पाणीपुरवठा योजना सुरू',
        content: 'ओखवडी गावात नवीन पाणीपुरवठा योजनेचे उद्घाटन करण्यात आले. यामुळे गावातील लोकांना शुद्ध पिण्याच्या पाण्याची सोय होणार आहे.',
        category: 'development',
        author: 'Gram Panchayat'
      },
      {
        title: 'शाळेत नवीन संगणक प्रयोगशाळा सुरू',
        content: 'जिल्हा परिषद प्राथमिक शाळेत नवीन संगणक प्रयोगशाळा सुरू करण्यात आली. विद्यार्थ्यांसाठी हे एक महत्त्वापूर्ण पाऊल आहे.',
        category: 'education',
        author: 'School Management'
      }
    ];

    await News.insertMany(newsItems);

    // Create sample contacts
    const contacts = [
      {
        name: 'कौशल्या लक्ष्मण शेलर',
        position: 'सरपंच',
        department: 'ग्रामपंचायत',
        phone: '९८७६५४३२१०',
        email: 'sarpanch@okhawadi.in',
        order: 1
      },
      {
        name: 'दिपक रामू जाधव',
        position: 'गट विकास अधिकारी',
        department: 'विकास विभाग',
        phone: '९८७६५४३२११',
        email: 'gdo@okhawadi.in',
        order: 2
      },
      {
        name: 'रमेश शंकर पाटील',
        position: 'ग्रामसेवक',
        department: 'प्रशासन',
        phone: '९८७६५४३२१२',
        email: 'gramsevak@okhawadi.in',
        order: 3
      }
    ];

    await Contact.insertMany(contacts);

    console.log('Village data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding village data:', error);
    process.exit(1);
  }
};

seedVillageData();