const dictionary = require('./service/dict_api');

const args = process.argv.slice(2);

dictionary(args[0])
  .then(console.log)
  .catch(console.error);