import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import './Chat.css';
import MissionList from './MissionList'; // 미션 리스트 컴포넌트 import

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
    const messagesEndRef = useRef(null);

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
            scrollToBottom();
        });

        // 컴포넌트가 마운트될 때와 메시지가 업데이트될 때마다 스크롤을 가장 아래로 이동
        scrollToBottom();

        return () => {
            socket.emit('disconnect');
            socket.disconnect();
        };
    }, [userId]);

    const sendMessage = () => {
        if (input.trim() === '') return;

        console.log('메시지 전송');

        // 이름과 메시지를 함께 전송할 객체
        const message = { sender: userName, message: input };

        // 현재 채팅에 내 메시지 업데이트
        setMessages((prevMessages) => [...prevMessages, message]);

        // 메시지 객체 전송
        socket.emit('sendMessage', message);
        setInput('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const renderMessage = (message, index) => {
        const isSender = userName === message.sender;
        return isSender ? (
            <div className="outgoing_msg" key={index}>
                <div className="sent_msg">
                    <p>{message.message}</p>
                </div>
            </div>
        ) : (
            <div className="incoming_msg" key={index}>
                <div className="incoming_msg_img">
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="user" />
                </div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{message.message}</p>
                    </div>
                </div>
            </div>
        );
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="container">
            <div className="chat-container"> {/* chat-container 클래스 추가 */}
                <h3 className="text-center">Messaging</h3>
                <div className="messaging">
                    <div className="inbox_msg">
                        <div className="mesgs">
                            <div className="msg_history">
                                {messages.map((message, index) => renderMessage(message, index))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <input
                                        type="text"
                                        className="write_msg"
                                        placeholder="Type a message"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button className="msg_send_btn" type="button" onClick={sendMessage}>
                                        <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center top_spac">
                        Design by <a target="_blank" href="https://www.linkedin.com/in/sunil-rajput-nattho-singh/">Sunil Rajput</a>
                    </p>
                </div>
            </div>
            <MissionList /> {/* 미션 리스트 컴포넌트 추가 */}
        </div>
    );
};

export default Chat;
