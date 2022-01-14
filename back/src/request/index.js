import axios from "axios";
export const request = {
    get: (api, data = {}) => {
        return axios.get('/api/getData', { params: { api, data } })
    }
}