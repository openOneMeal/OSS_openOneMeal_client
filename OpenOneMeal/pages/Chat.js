import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, { text: newMessage, user: "You" }]);
            setNewMessage("");
        }
    };

    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.user}`}>
                        {msg.user}: {msg.text}
                    </div>
                ))}
            </div>
            <div className="message-input">
                <TextField
                    label="Type a message"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSend}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChatWindow;
