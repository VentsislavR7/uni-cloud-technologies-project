const authController = require("./controllers/auth.controller");
const todosController = require("./controllers/todos.controller");
const axiosInterceptors = require("./axios.interceptors");

const { app, BrowserWindow } = require("electron");

const path = require("path");
const url = require("url");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.webContents.on("new-window", function (e, url) {
        e.preventDefault();
        require("electron").shell.openExternal(url);
    });

    win.loadFile(__dirname + "/app/index.html");
};

app.whenReady().then(() => {
    axiosInterceptors.registerInterceptors();
    authController.registerFunctions();
    todosController.registerFunctions();

    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
