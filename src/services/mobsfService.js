require('dotenv').config();


const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const mobsfUrl = process.env.MOBSF_URL;
const mobsfKey = process.env.MOBSF_API_KEY;

// 1. Upload du fichier APK
async function uploadApk(filePath) {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const res = await axios.post(`${mobsfUrl}/api/v1/upload`, form, {
    headers: {
      ...form.getHeaders(),
      Authorization: mobsfKey
    }
  });

  return res.data; // contient scan_hash
}

// 2. Lancer l'analyse
async function scanApk(scanHash) {
  await axios.post(`${mobsfUrl}/api/v1/scan`, {
    scan_type: 'apk',
    scan_hash: scanHash
  }, {
    headers: { Authorization: mobsfKey }
  });
}

// 3. Récupérer le rapport JSON
async function getReport(scanHash) {
  const res = await axios.post(`${mobsfUrl}/api/v1/report_json`, {
    hash: scanHash
  }, {
    headers: { Authorization: mobsfKey }
  });

  return res.data;
}

module.exports = {
  uploadApk,
  scanApk,
  getReport
};