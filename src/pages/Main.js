import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import matchImage from './images/33333.jpg'; // 매칭 화면 이미지

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
          { userId : userId }
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
        { userId : userId, matchState : "pending" }
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
        { userId: userId, matchState : "notMatched" }
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
    <div className='match-container'>
      <img src={matchImage} alt="Match" className='match-image' />
      
      {matchState === 'choose' && (
        <div>
          <button className='button accept-button' onClick={handleAcceptClick}>
            <img src={matchImage} alt="Accept" className='button-icon' />
            매칭 수락
          </button>
          <button className='button reject-button' onClick={handleRejectClick}>
            <img src={matchImage} alt="Reject" className='button-icon' />
            매칭 거절
          </button>
        </div>
      )}

      {matchState === 'pending' && (
        <div className='pending-message'>
          <p>상대의 응답을 대기 중입니다.</p>
        </div>
      )}

      {matchState === 'notMatched' && (
        <div className='not-matched-message'>
          <p>내일 새롭게 매칭됩니다. 내일 다시 방문해주세요.</p>
        </div>
      )}
    </div>
  );
};

export default Match;
