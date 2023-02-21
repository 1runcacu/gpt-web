import axios from 'axios';

// ChatGPT 搜索接口的地址
const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/search';

// ChatGPT API 的封装类
class ChatGPTAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  // 搜索接口的方法，返回 Promise 对象
  search(query) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    const data = {
      documents: [],
      query,
      max_rerank: 200,
      return_metadata: true,
      model: 'davinci-codex',
    };

    return axios.post(API_ENDPOINT, data, { headers })
      .then((response) => {
        const { data: { data: { results } } } = response;
        return results.map((result) => result.text);
      });
  }
  
  // 带上下文版本的搜索接口方法，返回 Promise 对象
  searchWithContext(query, context) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    const data = {
      documents: [],
      query,
      max_rerank: 200,
      return_metadata: true,
      model: 'davinci-codex',
      prompt: `Q: ${query}\nContext: ${context}`,
    };

    return axios.post(API_ENDPOINT, data, { headers })
      .then((response) => {
        const { data: { data: { results } } } = response;
        return results.map((result) => result.text);
      });
  }
}

export default ChatGPTAPI;
