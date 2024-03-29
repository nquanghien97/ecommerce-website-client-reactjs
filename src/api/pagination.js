import axios from 'axios';
import { API_URL } from '../constant';

export function paginationServices(page, limit=5, filter={}) {
  return axios.post(`${API_URL}/page?page=${page}&limit=${limit}`, {filter});
}