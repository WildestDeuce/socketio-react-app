import React, { Component } from "react";

const messageStyle = {
    borderRadius: '10px',
    padding: '5px',
    backgroundColor: 'teal',
    color: 'white',
}


class Chatbox extends Component {
    state = {

    }
    render() {
        return (
            <div style={{ messageStyle }}
                className="chatbox">
            </div >
        )
    }

}

export default Chatbox