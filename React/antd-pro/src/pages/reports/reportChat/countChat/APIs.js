import axios from 'axios';

export const getChatData = () => {
  return axios.get('https://60b0f8b91f26610017fff943.mockapi.io/api/v1/chat');
}
