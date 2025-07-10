const ZapClient = require('zaproxy');

const zapOptions = {
  apiKey: 'jeacjpq99mjvfpj29f1o2h4pme',
  proxy: {
    host: '127.0.0.1',
    port: 8080,
  },
};

let params = {
  contextid: contextid,
  userid: userid,
  url: sutbaseurl,
  maxchildren: maxchildren,
  recurse: recurse,
  subtreeonly: subtreeonly,
};
let response = await zaproxy.spider.scanAsUser(params);
console.log(response);


exports.scan = async (target) => {
  const spider = await zaproxy.spider.scan(target);
  // Attendre la fin du scan, récupérer le rapport
  const report = await zaproxy.core.htmlreport();
  return report;
};

const zaproxy = new ZapClient(zapOptions);