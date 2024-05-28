import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('https://open-one-meal-server-e0778adebef6.herokuapp.com', {
        transports: ['websocket', 'polling'],
        withCredentials: true,
    });

const Chat = () => {
    const location = useLocation();
    const { userEmail } = location.state;

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // 서버에 사용자 등록
        socket.emit('register', { userEmail });

        // 상대가 연결되지 않았을 때 연결 중이라는 메시지를 받음
        socket.on('waitingForMatch', (message) => {
            console.log('상대 대기', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        
        // 상대가 연결되면 채팅이 연결됐다고 메시지를 받음
        socket.on('matchConnected', (message) => {
            console.log('상대와 연결 완료', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        })
        
        // 상대로부터 메시지를 받음
        socket.on('receiveMessage', (message) => {
            console.log('메시지 수신', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.emit('disconnect');
            socket.disconnect();
        };

    }, [userEmail]);

    const sendMessage = () => {
        console.log('메시지 전송', input);
        setMessages((prevMessages) => [...prevMessages, input]);
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