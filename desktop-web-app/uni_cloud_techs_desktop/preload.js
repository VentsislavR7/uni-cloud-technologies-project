const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    login: (email, password) =>
        ipcRenderer.invoke("auth:login", email, password),
    tryGetToken: () => ipcRenderer.invoke("auth:tryGetToken"),
    setToken: (token) => ipcRenderer.invoke("auth:setToken", token),
    get: () => ipcRenderer.invoke("todos:get"),
    create: (todo) => ipcRenderer.invoke("todos:create", todo),
    update: (todo) => ipcRenderer.invoke("todos:update", todo),
    delete: (id) => ipcRenderer.invoke("todos:delete", id),
});
