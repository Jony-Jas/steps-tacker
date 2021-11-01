import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: "http://a651-2409-4072-6d0e-e34a-1505-deac-1202-7aa6.ngrok.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
