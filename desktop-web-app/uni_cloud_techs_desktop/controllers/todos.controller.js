exports.registerFunctions = () => {
    const { ipcMain } = require("electron");
    const axios = require("axios");
    const constants = require("../constants");

    ipcMain.handle("todos:get", async (event) => {
        const data = await axios
            .get(`${constants.baseUrl}/todos`)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                console.log(err);
                return null;
            });

        console.log(data);

        return data;
    });

    ipcMain.handle("todos:create", async (event, todo) => {
        await axios
            .post(`${constants.baseUrl}/todos`, JSON.stringify(todo))
            .then((response) => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
    });

    ipcMain.handle("todos:update", async (event, todo) => {
        await axios
            .put(`${constants.baseUrl}/todos/${todo.id}`, JSON.stringify(todo))
            .then((response) => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
    });

    ipcMain.handle("todos:delete", async (event, id) => {
        await axios
            .delete(
                `${constants.baseUrl}/todos/${id}`,
                JSON.stringify({ id: id })
            )
            .then((response) => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
    });
};
