import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Match = () => {
    const nav = useNavigate();
    const location = useLocation();
    const { userId, userName } = location.state;

    const [matchState, setMatchState] = useState("");

    useEffect(() => {
        const checkMatch = async () => {
            try {
                const response = await axios.post(
                    "https://open-one-meal-server-e0778adebef6.herokuapp.com/api/checkmatch",
                    { userId: userId }
                );

                if (response.data.matchState === "matched") {
                    nav('/chat', {
                        state: { userId: userId, userName: userName },
                    });
                }

                setMatchState(response.data.matchState);

            } catch (error) {
                alert('매칭 페이지 확인 중 에러 발생');
                console.error(error);
            }
        };

        checkMatch();
    }, []);

    const handleAcceptClick = async () => {
        try {
            const response = await axios.put(
                "https://open-one-meal-server-e0778adebef6.herokuapp.com/api/choosematch",
                { userId: userId, matchState: "pending" }
            );

            if (response.data.status === 500) {
                alert("매칭 오류 발생. 다시 시도해주세요.");
                return;
            }

            if (response.data.matchState === "matched") {
                nav('/chat', {
                    state: { userId: userId, userName: userName },
                });
            }

            setMatchState(response.data.matchState);

        } catch (error) {
            alert('매칭 오류 발생. 다시 시도해주세요.');
        }
    };

    const handleRejectClick = async () => {
        try {
            const response = await axios.put(
                "https://open-one-meal-server-e0778adebef6.herokuapp.com/api/choosematch",
                { userId: userId, matchState: "notMatched" }
            );

            if (response.data.status === 500) {
                alert("서버 에러 발생");
                return;
            }

            setMatchState(response.data.matchState);
        } catch (error) {
            alert('매칭 오류 발생. 다시 시도해주세요.');
        }
    };

    return (
        <Container>
            {matchState === 'choose' && (
                <ButtonContainer>
                    <MatchButton onClick={handleAcceptClick}>매칭 수락</MatchButton>
                    <MatchButton onClick={handleRejectClick}>매칭 거절</MatchButton>
                </ButtonContainer>
            )}

            {matchState === 'pending' && (
                <Message>상대의 응답을 대기 중입니다.</Message>
            )}

            {matchState === 'notMatched' && (
                <Message>내일 새롭게 매칭됩니다. 내일 다시 방문해주세요.</Message>
            )}
        </Container>
    );
};

export default Match;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const MatchButton = styled.button`
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

const Message = styled.p`
    font-size: 18px;
    margin-top: 20px;
    text-align: center;
`;
