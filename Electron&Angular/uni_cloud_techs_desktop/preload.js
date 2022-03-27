const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    login: (email, password) =>
        ipcRenderer.invoke("auth:login", email, password),
});
