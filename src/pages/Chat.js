import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('https://open-one-meal-server-e0778adebef6.herokuapp.com', {
        transports: ['websocket', 'polling'],
        withCredentials: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
    });

const Chat = () => {
    const location = useLocation();
    const { userId, userName } = location.state;

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // 서버에 사용자 등록
        socket.emit('register', { userId });

        // 이전 메시지 불러오기
        socket.on('loadMessages', (chatLogs) => {
            console.log('메시지 로딩');
            setMessages(chatLogs);
        })

        // 상대로부터 메시지를 받음
        socket.on('receiveMessage', (message) => {
            console.log('메시지 수신');
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.emit('disconnect');
            socket.disconnect();
        };

    }, []);

    const sendMessage = () => {
        console.log('메시지 전송');

        // 이름과 메시지를 함께 전송할 객체
        const message = { sender: userName, message: input }

        // 현재 채팅에 내 메시지 업데이트
        setMessages((prevMessages) => [...prevMessages, message]);

        // 메시지 객체 전송
        socket.emit('sendMessage', message);
        setInput('');
    };

    return (
        <div classname ="chat-container" >
          <div classname ="messages-container">
            {messages.map((message, index) => (
              <div key={index} classname ="message">
                <p><strong>{message.sender}</strong> {message.message}</p>
              </div>
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
