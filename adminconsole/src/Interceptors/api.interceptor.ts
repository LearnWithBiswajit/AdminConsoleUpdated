import axios from 'axios';

import { toast } from 'react-toastify';

const localToken: any = localStorage.getItem("token") !== null ? localStorage.getItem("token") : "{}";

let accessToken = JSON.parse(localToken).accessToken ? JSON.parse(localToken).accessToken : "";
// console.log(accessToken);

let isRefreshing:boolean = false;
let failedQueue:any[] = [];

const processQueue = (error:any, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // replace with your API
  // headers: { Authorization: JSON.parse(localToken).accessToken ? JSON.parse(localToken).accessToken : "" },
  timeout: 10000,
});

  api.interceptors.request.use((config:any) => {
    // Add an authorization token to all requests
    console.log(localStorage.getItem('token'))
    config.headers.Authorization = `Bearer ${JSON.parse(String(localStorage.getItem('token')))?.accessToken}`;
    return config;
  }, (error:any) => {
    return Promise.reject(error);
  });

// Add a response interceptor
api.interceptors.response.use(
  (response:any):any => {
    if (response.data.data.accessToken) {
      localStorage.setItem("token", JSON.stringify(response.data.data));
      return response;
    }else{
      return response
    }
  },
  async (error:any) => {
    const originalRequest = error.config;
    // Handle error globally
    if (error.response) {
      let message = 'Something went wrong!';
        message = error.response.data.message;
      // Server responded with status code out of 2xx range
      const status = error.response.status;

      if(status === 403){
        localStorage.removeItem("token");
        window.location.href = String(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`);
      }

      if(status === 401 && !originalRequest._retry){
        // toast.error(message);
        if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        })
        .catch(err => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const { data } = await api.post('auth/refreshLogInToken',{}, {
          headers:{x_refreshtoken: JSON.parse(String(localStorage.getItem('token')))?.refreshToken}
        });
        console.log(data.data.loginResponse);
        const newToken = data.data.loginResponse;
        localStorage.setItem('token', JSON.stringify(newToken));
        processQueue(null, newToken);
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
        
        // window.location.href = "http://localhost:3001"
      }

      //   if (status === 400) {
      //     message = 'Bad Request';
      //   } else if (status === 401) {
      //     message = 'Unauthorized. Please login.';
      //   } else if (status === 403) {
      //     message = 'Forbidden access.';
      //   } else if (status === 404) {
      //     message = 'Resource not found.';
      //   } else if (status === 500) {
      //     message = 'Internal server error.';
      //   }

      // Show toast error
      if (Array.isArray(message)) {
        message.forEach(error => {
          toast.error(error);
        });
      } else {
        toast.error(message);
      }
    } else if (error.request) {
      // No response was received
      toast.error('No response from server.');
    } else {
      // Something happened while setting up the request
      toast.error('Request error: ' + error.message);
    }
    

    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response):any => {
//     if(response.data.data.accessToken){
//       localStorage.setItem("token", JSON.stringify(response.data.data));
//     }
//   }
// );

export default api;
