import openSocket from "socket.io-client";

export default function () {
    const socket = openSocket("http://localhost:3003");

    function subscribeToTimer(interval, cb) {
        socket.on("timer", timestamp => cb(null, timestamp));
        socket.emit("subscribeToTimer", 1000);

    };
    function registerHandler(onMessageReceived) {
        socket.on("message", onMessageReceived)
    };

    function unregisteredHandler() {
        socket.off("message")
    };

    function join(chatroomName, cb) {
        socket.emit("join", chatroomName, cb)
    };

    function leave(chatroomName, cb) {
        socket.emit("leave", chatroomName, cb)
    };

    function message(chatroomName, msg, cb) {
        socket.emit("message", { chatroomName, message: msg }, cb)
    };

    function getChatrooms(cb) {
        socket.emit("chatrooms", null, cb)
    }

    return {
        subscribeToTimer,
        join,
        leave,
        message,
        getChatrooms,
        registerHandler,
        unregisteredHandler
    }
};