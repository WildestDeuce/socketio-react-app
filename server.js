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
    let chat = db.collection("chats");
    client.on("subscribeToTimer", (interval) => {
        console.log("client is subscribing to timer with interval", interval);
        setInterval(() => {
            client.emit("timer", new Date());
        }, interval);

        chat.find().limit(100).sort({ _id: 1 }).toArray(function (err, res) {
            if (err) {
                throw err;
            }
            //Emit the message
            client.emit("output", res)
        })
    })

    //Handle input events

    client.on("input", function (data) {
        let name = data.name;
        let message = data.message;

        //Check for name and message
        if (name == "" || message == "") {
            //Send error status
            sendStatus("Please enter name and message");
        } else {
            //Insert message
            chat.insert({ name: name }, {message: message}, function() {
                io.emit("output", [data]);

                //Send status object
                sendStatus({
                    message: "Message sent",
                    clear: true
                })
            });

        }
    })

}

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


// Start the API server
server.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});