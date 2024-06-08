import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Match.css'; // CSS 파일 임포트
import matchImageAccept from '../pages/images/33333.jpg';
import matchImageReject from '../pages/images/44444.webp';

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
          { userId }
        );

        if (response.data.matchState === "matched") {
          nav('/chat', {
            state: { userId, userName },
          });
        }

        setMatchState(response.data.matchState);

      } catch (error) {
        alert('매칭 페이지 확인 중 에러 발생');
        console.error(error);
      }
    };

    checkMatch();
  }, [userId, nav]);

  const handleAcceptClick = async () => {
    try {
      const response = await axios.put(
        "https://open-one-meal-server-e0778adebef6.herokuapp.com/api/choosematch",
        { userId, matchState: "pending" }
      );

      if (response.data.status === 500) {
        alert("매칭 오류 발생. 다시 시도해주세요.");
        return;
      }

      if (response.data.matchState === "matched") {
        // 수락 이미지 잠시 표시 후 채팅 화면으로 이동
        setMatchState('accepted');
        setTimeout(() => {
          nav('/chat', {
            state: { userId, userName },
          });
        }, 2000);
      } else {
        setMatchState(response.data.matchState);
      }

    } catch (error) {
      alert('매칭 오류 발생. 다시 시도해주세요.');
    }
  };

  const handleRejectClick = async () => {
    try {
      const response = await axios.put(
        "https://open-one-meal-server-e0778adebef6.herokuapp.com/api/choosematch",
        { userId, matchState: "notMatched" }
      );

      if (response.data.status === 500) {
        alert("서버 에러 발생");
        return;
      }

      // 거절 이미지 잠시 표시 후 다른 화면으로 이동
      setMatchState('rejected');
      setTimeout(() => {
        setMatchState(response.data.matchState);
      }, 2000);

    } catch (error) {
      alert('매칭 오류 발생. 다시 시도해주세요.');
    }
  };

  return (
    <div className='match-container'>
      {/* 프로필 정보 */}
      <div className="container white-box">
        <div className="row">
          <div className="col-md-8 profile-simple">
            <div className="d-flex">
              <div className="flex-shrink-0">
                <img src="../img/증명사진1.jpg" alt="프로필 사진" />
              </div>
              <div className="flex-grow-1 ms-3">
                <h3>Hyewon</h3>
                <p>Front-end Designer</p>
                <div>
                  <i className="fa-solid fa-location-dot d-inline-block" style={{ color: '#6fbaf8' }}></i>
                  <span style={{ color: '#6fbaf8' }}>서울시 동대문구</span>
                </div>
                <button className="btn text-white mt-3" style={{ backgroundColor: '#6fbaf8' }}>연락하기</button>
              </div>
            </div>
          </div>
          <div className="col-md-4 border-left">
            <div className="row profile-detail">
              <div className="col-6"><p>Location</p></div>
              <div className="col-6"><p>서울 근무</p></div>
              <div className="col-6"><p>Age</p></div>
              <div className="col-6"><p>25</p></div>
              <div className="col-6"><p>Experience</p></div>
              <div className="col-6"><p>신입</p></div>
              <div className="col-6"><p>School</p></div>
              <div className="col-6"><p>서일대학교 컴퓨터전자공학과</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* 매칭 수락 및 거절 버튼 */}
      <div className='button-container'>
        <button className='button accept-button' onClick={handleAcceptClick}>매칭 수락</button>
        <button className='button reject-button' onClick={handleRejectClick}>매칭 거절</button>
      </div>

      {/* 매칭 상태에 따른 메시지 */}
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
