const express = require("express");
const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3003;
// socket.io server
const server = require("http").Server(app);
const io = require("socket.io")(server);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// Add routes, both API and view
// app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// socket connection
io.on("connection", (client) => {
    client.on("subscribeToTimer", (interval) => {
        console.log("client is subscribing to timer with interval", interval);
        setInterval(() => {
            client.emit("timer", new Date());
        }, interval);
    })

    client.on("join", handleJoin);

    client.on("leave", handleLeave);

    client.on("message", handleMessage);

    client.on("chatrooms", handleGetChatrooms);

    client.on("disconnect", function () {
        console.log("client disconnet...", client.id);
        handleDisconnect()
    });

    client.on("error", function (err) {
        console.log("received error rom client:", client.id);
        console.log(err)
    });
})

// Start the API server
server.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});