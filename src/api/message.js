const axios = require('axios');

const baseURL = 'https://ai.bln.cn/api';
// const apiKey = "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";
const model = 'text-davinci-003';
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${apiKey}`,
  },
});

async function sendMessage(text, context) {
  const data = {
    prompt: text,
    model,
    max_tokens: 2048,
    temperature: 0.5,
    // n: 1,
    // ...(context && { context }),
  };

  const response = await instance.post('/text', data);
  const { choices } = response.data;
  return choices[0].text.trim();
}

module.exports = {
  sendMessage,
};
