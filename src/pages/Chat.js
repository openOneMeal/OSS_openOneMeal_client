import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = ({ userEmail }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socket = io('https://open-one-meal-server-e0778adebef6.herokuapp.com', {
            query: { email: userEmail }
        });

    useEffect(() => {
        // 상대가 연결되지 않았을 때 연결 중이라는 메시지를 받음
        socket.on('waitingForMatch', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        
        // 상대가 연결되면 채팅이 연결됐다고 메시지를 받음
        socket.on('matchConnected', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        })
        
        // 상대로부터 메시지를 받음
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // 연결이 끊기면 연결 종료 메시지를 띄움
        socket.on('disconnect',
            setMessages((prevMessages) => [...prevMessages], "연결이 종료되었습니다."));

        return () => {
            socket.disconnet();
        };
    }, []);

    const sendMessage = () => {
        socket.emit('sendMessage', input);
        setInput('');
    };

    return (
        <div>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;