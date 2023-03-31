import axios from 'axios';

const apiClient = () => {
  const client = axios.create({
    baseURL: process.env.API_BASE_URL ?? 'https://api.themoviedb.org/3/',
    params: {
      api_key: process.env.API_KEY ?? 'c173b2aeba34632c83e066dce0dfea66',
    },
  });

  return client;
};

export default apiClient;
