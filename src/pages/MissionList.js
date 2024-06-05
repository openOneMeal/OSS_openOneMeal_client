import React, { useState } from 'react';
import './MissionList.css'; // MissionList에 대한 CSS 파일 import

const MissionList = () => {
  // 각 미션의 세부 섹션을 토글하기 위한 상태 변수
  const [showDetails, setShowDetails] = useState(false);

  // 세부 섹션을 토글하는 함수
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="mission-container">
      <h3 className="teximport React, { useState } from 'react';
import './MissionList.css'; // MissionList에 대한 CSS 파일 import

const MissionList = () => {
  // 각 미션의 세부 섹션을 토글하기 위한 상태 변수 배열
  const [showDetails, setShowDetails] = useState([false, false]); // 초기값은 두 개의 미션에 대한 상태

  // 특정 미션의 세부 섹션을 토글하는 함수
  const toggleDetails = (index) => {
    setShowDetails((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="mission-container">
      <h3 className="text-center">Mission List</h3>
      <ul className="mission-list">
        <li className="mission-item">
          <p className="mission-content">Mission 1</p>
          {/* 세부 섹션 토글 버튼 */}
          <button className="toggle-button" onClick={() => toggleDetails(0)}>Toggle Details</button>
          {/* 세부 섹션 */}
          {showDetails[0] && (
            <div className="mission-details">
              <p>Detail 1: 가장 좋아하는 취미나 특기는? 그 취미를 시작하게된 이유는?</p>
              <p>Detail 2: 가고싶은 여행지가 있다면 어디인가? 그곳을 선택한 이유는?</p>
              {/* 추가적인 세부 내용 */}
            </div>
          )}
        </li>
        {/* 두 번째 미션 항목과 세부 섹션 추가 */}
        <li className="mission-item">
          <p className="mission-content">Mission 2</p>
          {/* 세부 섹션 토글 버튼 */}
          <button className="toggle-button" onClick={() => toggleDetails(1)}>Toggle Details</button>
          {/* 세부 섹션 */}
          {showDetails[1] && (
            <div className="mission-details">
              <p>Detail 1: 가장 좋아하는 음악장르는? 좋아하는 가수도 궁금해요!</p>
              <p>Detail 2: 대학에서 가장 꿀수업이라고 생각하는 수업은?</p>
              <p>Detail 3: 대학교 로망이 있었다면? 그것을 이루었나요?</p>
            </div>
          )}
        </li>
        {/* 여기에 추가적인 미션 아이템 추가 가능 */}
      </ul>
    </div>
  );
};

export default MissionList;
t-center">Mission List</h3>
      <ul className="mission-list">
        <li className="mission-item">
          <p className="mission-content">Mission 1</p>
          {/* 세부 섹션 토글 버튼 */}
          <button className="toggle-button" onClick={toggleDetails}>Toggle Details</button>
          {/* 세부 섹션 */}
          {showDetails && (
            <div className="mission-details">
              <p>Detail 1: 가장 좋아하는 취미나 특기는? 그 취미를 시작하게된 이유는?</p>
              <p>Detail 2: 가고싶은 여행지가 있다면 어디인가? 그곳을 선택한 이유는?</p>
              {/* 추가적인 세부 내용 */}
            </div>
          )}
        </li>
        {/* 두 번째 미션 항목과 세부 섹션 추가 */}
        <li className="mission-item">
          <p className="mission-content">Mission 2</p>
          {/* 세부 섹션 토글 버튼 */}
          <button className="toggle-button" onClick={toggleDetails}>Toggle Details</button>
          {/* 세부 섹션 */}
          {showDetails && (
            <div className="mission-details">
              <p>Detail 1: 가장 좋아하는 음악장르는? 좋아하는 가수도 궁금해요!</p>
              <p>Detail 2: 대학에서 가장 꿀수업이라고 생각하는 수업은?</p>
              <p>Detail 3: 대학교 로망이 있었다면? 그것을 이루었나요?</p>
            </div>
          )}
        </li>
        {/* 여기에 추가적인 미션 아이템 추가 가능 */}
      </ul>
    </div>
  );
};

export default MissionList;
