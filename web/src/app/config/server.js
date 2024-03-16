import axios from "axios";

export const serverip = 'http://localhost:9990';

export const wrapEndpoint = (endpoint) => {
  return `${serverip}/${endpoint}`;
}


export const endpoints = {
    verifyAuth: wrapEndpoint('auth/verify'),
    login: wrapEndpoint('auth/login'),
    register: wrapEndpoint('auth/register'),
    getCategories: wrapEndpoint('categories'),
    getProducts: wrapEndpoint('products'),
    getProductsByCategory: wrapEndpoint('products/category'),
    getProductsBySeller: wrapEndpoint('products/seller'),
    getProductsBySearch: wrapEndpoint('products/details'),

    createShop:wrapEndpoint('shop/create'),
    fetchUserShops:wrapEndpoint('shop/fetch_user_shops'),
    getShopDetails:wrapEndpoint('shop/details'),

    getCart: wrapEndpoint('cart'),  
    addToCart: wrapEndpoint('cart/add'),
    removeFromCart: wrapEndpoint('cart/remove'),
    updateCart: wrapEndpoint('cart/update'),

    getOrders: wrapEndpoint('orders'),
    createOrder: wrapEndpoint('orders/create'),
    updateOrder: wrapEndpoint('orders/update'),
    deleteOrder: wrapEndpoint('orders/delete'),
}

export const api = axios.create({
    baseURL: serverip,
   
});
