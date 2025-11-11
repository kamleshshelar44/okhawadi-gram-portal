const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

// Create a test image
const testImage = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

async function testUpload() {
  try {
    console.log('🧪 Testing gallery upload to http://localhost:5002/api/gallery');

    const form = new FormData();
    form.append('title', 'Test Image');
    form.append('type', 'image');
    form.append('category', 'village');
    form.append('file', testImage, {
      filename: 'test.png',
      contentType: 'image/png'
    });

    console.log('📤 Sending request...');

    const response = await axios.post('http://localhost:5002/api/gallery', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    console.log('✅ Success!', response.data);

  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testUpload();