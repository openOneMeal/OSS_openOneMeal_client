import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText } from "@mui/material";

const ChatWindow = ({ userData }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, { user: userData.name, text: message }]);
            setMessage("");
        }
    };

    return (
        <div>
            <List>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${msg.user}: ${msg.text}`} />
                    </ListItem>
                ))}
            </List>
            <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                label="메시지 입력"
                fullWidth
                margin="normal"
            />
            <Button onClick={handleSendMessage} variant="contained" color="primary">
                전송
            </Button>
        </div>
    );
};

export default ChatWindow;
