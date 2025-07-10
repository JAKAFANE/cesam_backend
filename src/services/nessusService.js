// src/services/nessusService.js
const axios = require('axios');

exports.scan = async (target) => {
  // Authentification
  const login = await axios.post('https://localhost:8834/session', { username: 'user', password: 'pass' });
  const token = login.data.token;
  // Création du scan
  const scan = await axios.post('https://localhost:8834/scans', {
    uuid: 'template-uuid',
    settings: { name: 'Scan', targets: target }
  }, { headers: { 'X-Cookie': `token=${token}` } });
  // Lancer le scan, récupérer le rapport...
  return scan.data;
};
