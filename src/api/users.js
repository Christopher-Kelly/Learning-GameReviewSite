import { methods } from "../axiosWrapper/methods";

const userApi = methods(process.env.REACT_APP_USER_NEW);
const authApi = methods(process.env.REACT_APP_USER_LOGIN);

export const createUser = async (userData) => {
    console.log("createUser called", userData);

    return userApi.POST(userData);
};

export const loginUser = async (userData) => {
    return authApi.POST(userData);
};