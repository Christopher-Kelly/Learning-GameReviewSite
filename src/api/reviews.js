import { methods } from "../axiosWrapper/methods";

const postReviewURL = methods(process.env.REACT_APP_RATING_POST);
const getReviewsURL = methods(process.env.REACT_APP_RATING_GAME);


export const postReviews = async (userData) => {
    console.log("createUser called", userData);
    return postReviewURL.POST(userData);
};

export const getReviews = async (userData) => {
    console.log("getReviews called", userData);
    return getReviewsURL.GET(userData);
}