const { ipcMain } = require("electron");
let https;

try {
    https = require("https");
} catch (err) {
    console.log("https support is disabled!");
    console.log(err);
}

ipcMain.handle("todos:get", () => {
    return "";
});
