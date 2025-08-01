import axios from "axios";

export const serviceProduct = {
    getProductsList: (limit: number, skip: number, query?: string) => {
        const baseUrl = query
            ? `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
            : `/products?limit=${limit}&skip=${skip}`;

        return axios.get(`https://dummyjson.com${baseUrl}`);
    },
    getProdict: (id: string) => axios.get(`https://dummyjson.com/products/${id}`),
    getProductsListByQuery: (query: string) => axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`)
}