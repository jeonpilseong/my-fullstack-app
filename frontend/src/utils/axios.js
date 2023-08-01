import axios from 'axios';

// axios 인스턴스화
const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ? '' : 'http://localhost:4000',
});

// api 요청하기 전 request header에 accessToken 넣어주기
axiosInstance.interceptors.request.use(
    function (config) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// api 응답 후 토큰 만료 에러가 뜨면 리로드 시킨다.
axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.data === 'jwt expired') {
            window.location.reload();
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
