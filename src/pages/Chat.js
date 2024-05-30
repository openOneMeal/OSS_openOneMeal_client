import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import styled from 'styled-components';

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
        });

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
        const message = { sender: userName, message: input };

        // 현재 채팅에 내 메시지 업데이트
        setMessages((prevMessages) => [...prevMessages, message]);

        // 메시지 객체 전송
        socket.emit('sendMessage', message);
        setInput('');
    };

    return (
        <ChatContainer>
            <MessagesContainer>
                {messages.map((message, index) => (
                    <Message key={index} isMine={message.sender === userName}>
                        <strong>{message.sender}:</strong> {message.message}
                    </Message>
                ))}
            </MessagesContainer>
            <InputContainer>
                <MessageInput
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <SendButton onClick={sendMessage}>Send</SendButton>
            </InputContainer>
        </ChatContainer>
    );
};

export default Chat;

// Styled Components
const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    background: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
`;

const MessagesContainer = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #ffffff;
`;

const Message = styled.div`
    background: ${({ isMine }) => (isMine ? '#9c27b0' : '#f1f0f0')};
    color: ${({ isMine }) => (isMine ? '#ffffff' : '#333')};
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    max-width: 80%;
    align-self: ${({ isMine }) => (isMine ? 'flex-end' : 'flex-start')};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
    display: flex;
    padding: 10px;
    background: #ffffff;
    border-top: 1px solid #ddd;
`;

const MessageInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 16px;
`;

const SendButton = styled.button`
    padding: 10px 20px;
    background: #9c27b0;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background: #7b1fa2;
    }
`;
