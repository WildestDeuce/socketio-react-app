const express = require("express");
const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3003;
// socket.io server
const server = require("http").Server(app);
const io = require("socket.io")(server);
const handlers = require('./handlers.js')(app, server, io);

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



    client.on("join", handlers.handleJoin);

    client.on("leave", handlers.handleLeave);

    client.on("message", handlers.handleMessage);

    client.on("chatrooms", handlers.handleGetChatrooms);

    client.on("disconnect", function () {
        console.log("client disconnect...", client.id);
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