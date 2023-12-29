export const getOrders = () => {

    return fetch("http://dummyjson.com/carts/1").then((res)=> res.json());
}

export const getRevenue = () => {
    return fetch("http://dummyjson.com/carts").then((res)=> res.json());
}

export const getInventory=()=>{
    return fetch("http://dummyjson.com/products").then((res)=> res.json());
}

export const getCustomers=()=>{
    return fetch("http://dummyjson.com/users").then((res)=> res.json());
}

export const getComments=()=>{
    return fetch("http://dummyjson.com/comments").then((res)=> res.json());
}