exports.registerInterceptors = () => {
    const axios = require("axios");
    const authData = require("./auth.data");

    axios.interceptors.request.use(
        function (config) {
            config.headers = {
                ...config.headers,
                "Content-Type": "application/json",
                Accept: "*/*",
            };
            console.log(config);
            return config;
        },
        null,
        { synchronous: true }
    );

    axios.interceptors.request.use(
        function (config) {
            config.headers.Authorization = "Bearer " + authData.authToken;
            return config;
        },
        null,
        { runWhen: () => authData.isLoggedIn }
    );
};
