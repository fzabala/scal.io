import axios, {AxiosResponse} from 'axios';
import {PaginatorInterface} from "../types/paginator.d";

const API_URL = 'https://api.github.com/search';

export const getUsersService: (
  login: string,
  page: number,
  per_page: number,
) => Promise<AxiosResponse<PaginatorInterface>> = (
  login: string,
  page: number,
  per_page: number,
) => {
  return axios.get(`${API_URL}/users`, {
    params: {
      q: `${login} in:login`,
      page,
      per_page,
    },
  });
};
