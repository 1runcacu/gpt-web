const axios = require('axios');

// POST https://ai.bln.cn/api/text
// // body 
// {
//   prompt: string;
// }

const baseURL =  'https://api.openai.com/v1/';//completions 'http://127.0.0.1:6790/api';
const apiKey = "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";
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

  const response = await instance.post('/completions', data).catch(err=>{
    return {
      data:{
        choices:[{
          text:err.message||"error"
        }]
      }
    }
  });
  console.log(response);
  const { choices } = response.data;
  return choices[0].text.trim();
}

module.exports = {
  sendMessage,
};
