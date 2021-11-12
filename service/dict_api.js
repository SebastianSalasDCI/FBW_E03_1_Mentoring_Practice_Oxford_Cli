const axios = require('axios');
const APP_ID = "65a2e4b2";
const APP_KEY = "536ebc539c03517c57a5143083dcec00";
const baseURL = 'https://od-api.oxforddictionaries.com/api/v2/';

//Creating axios client
const client = axios.create({
  baseURL: baseURL,
  headers: {
    app_id: APP_ID,
    app_key: APP_KEY
  }
})

// Get data from oxford API
const getInfo = async (word) => {

    const data = await client.get(`entries/en-us/${word}`)
      .then(res => res.data)
      .catch(error => {
        console.log(error)
      })

    return data;
}

//Formatting the answer
const formatSense = (sense, index) => {
    return `${index + 1}. ${sense.shortDefinitions[0]}`;
}   

const formatData = (data) => {
    let lex = data.results[0].lexicalEntries[0];
    let senses = lex.entries[0].senses.map(formatSense).join(`\n`);
    return `${lex.text} (${lex.lexicalCategory.text})` + "\n" + senses;
}

// Wrapping everything into one function
const dictionary = async (word) => {

    const data = await getInfo(word);

    return `${formatData(data)} \n\n Provided by: ${data.metadata.provider}`;
};

module.exports = dictionary;