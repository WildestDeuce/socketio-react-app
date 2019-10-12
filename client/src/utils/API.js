import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3003");




function subscribeToTimer(interval, cb) {
    socket.on("timer", timestamp => cb(null, timestamp));
    socket.emit("subscribeToTimer", 1000);

}

export default subscribeToTimer;