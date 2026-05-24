import { requestWrapper } from "./requestWrapper";

export const methods = (url) => {
    return {
        GET: async (params = {}, config = {}) => {
            console.log("GET", url, params);

            return requestWrapper({
                ...config,
                method: "GET",
                url: url,
                params,
            });
        },

        POST: async (data = {}, config = {}) => {
            console.log("POST", url, data);

            return requestWrapper({
                ...config,
                method: "POST",
                url: url,
                data,
            });
        },
    };
};