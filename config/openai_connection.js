const {Configuration, OpenAIApi} = require('openai');
const logger = require('./logger');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION
});

const openai = new OpenAIApi(configuration);

openai.listModels().then((response) => {
    logger.info(`Open AI Connection Successful.`)
}).catch((err) => {
    logger.error(err)
});

module.exports = openai;