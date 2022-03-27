exports.registerFunctions = () => {
    const { ipcMain, dialog } = require("electron");
    const axios = require("axios");
    const constants = require("../constants");
    const authData = require("../auth.data");

    ipcMain.handle("auth:login", async (event, email, password) => {
        const data = await axios
            .post(
                `${constants.baseUrl}/login`,
                JSON.stringify({
                    email: email,
                    password: password,
                })
            )
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                dialog.showErrorBox("Error logging in", "Invalid credentials!");
                return null;
            });
        return data;
    });

    ipcMain.handle("auth:tryGetToken", (event) => {
        const fs = require("fs");

        if (!fs.existsSync("auth-token.txt")) {
            authData.authToken = null;
            return null;
        }

        const token = fs.readFileSync("auth-token.txt").toString();
        authData.authToken = token;

        return token;
    });

    ipcMain.handle("auth:setToken", (event, token) => {
        const fs = require("fs");

        if (!token) {
            fs.unlinkSync("auth-token.txt");
            authData.authToken = null;
            return;
        }

        fs.writeFileSync("auth-token.txt", token);
        authData.authToken = token;
    });
};
