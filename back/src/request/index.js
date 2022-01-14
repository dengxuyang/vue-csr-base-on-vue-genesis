import axios from "axios";
/**
 * 封装一层axios 
 */
export const request = {
    get: (api, data = {}) => {
        return axios.get('/api/getData', { params: { api, data } })
    }
}