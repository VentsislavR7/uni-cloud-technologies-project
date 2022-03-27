const { ipcMain } = require("electron");
let https;

try {
    https = require("https");
} catch (err) {
    console.log("https support is disabled!");
    console.log(err);
}

ipcMain.handle("auth:login", (email, password) => {
    const request = https.request({
        method: "POST",
        protocol: "https",
        hostname: "http://cloud-technologies-project.herokuapp.com",
        path: "/api/login",
    });
    request.write(
        JSON.stringify({
            email: email,
            password: password,
        })
    );

    request.on("response", (response) => {
        console.log(response);

        response.on("data", (data) => {
            console.log(data);
        });
    });
});
