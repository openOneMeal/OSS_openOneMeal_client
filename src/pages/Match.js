import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Match = () => {
  console.log("Match 컴포넌트 렌더링됨");

  const nav = useNavigate();
  const location = useLocation();
  const { userId, userName } = location.state;
  
  const [matchState, setMatchState] = useState("");

  console.log("matchState :", matchState);

  useEffect(() => {
    const checkMatch = async () => {
      try {
        console.log("checkmatch 에 post 요청 전");
        const response = await axios.post(
          "https://open-one-meal-server-e0778adebef6.herokuapp.com/api/checkmatch",
          { userId : userId }
        );
        console.log("checkmatch 에 post 요청 완료");
        
        if (response.data.matchState === "matched") {
          // 실제로는 매칭 완료 페이지로 이동할 것
          nav('/chat', {
            state: { userId: userId, userName: userName },
          });
        }
  
        // matchState 는 "notMatched", "matched", "pending" 이 존재
        // "pending" 은 매칭 수락을 누르고, 상대의 수락을 기다리는 대기 상태
        // "pending" 일 때는 다른 화면을 보여줄 것
        console.log("response.data.matchState: ", response.data.matchState);
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
        // 실제로는 매칭 완료 페이지로 이동할 것
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
    <div>
      {matchState === 'choose' && (
        <div>
          <button onClick={handleAcceptClick}>매칭 수락</button>
          <button onClick={handleRejectClick}>매칭 거절</button>
        </div>
      )}

      {matchState === 'pending' && (
        <div>
          <p>상대의 응답을 대기 중입니다.</p>
        </div>
      )}

      {matchState === 'notMatched' && (
        <div>
          <p>내일 새롭게 매칭됩니다. 내일 다시 방문해주세요.</p>
        </div>
      )}
    </div>
  );
};

export default Match;
