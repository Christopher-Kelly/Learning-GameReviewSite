import { methods } from "../axiosWrapper/methods";

const getGamesByCategories = methods(process.env.REACT_APP_CATEGORY_GAME);
const getCategories = methods(process.env.REACT_APP_CATEGORIES_ALL);
const getGameData= methods(process.env.REACT_APP_GAME_BY_ID);


export const findGamesByCategory = async (userData) => {
    console.log("createUser called", userData);
    return getGamesByCategories.GET(userData);
};

export const findAllCategories = async (userData) => {
    return getCategories.GET(userData);
};

export const findGameInfo = async (userData) => {
    return getGameData.GET(userData);
};