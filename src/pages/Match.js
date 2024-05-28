import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Match = ({ userEmail }) => {
  const nav = useNavigate();

  const handleMatch = async () => {
    try {
      const response = await axios.put('/api/match', { email: userEmail });
      if (response.status === 200) {
        alert('매칭 완료');
        nav('/chat', {
          state: { userEmail: userEmail },
        });
      }
    } catch (error) {
      alert('매칭 오류 발생, 매칭 실패');
    }
  };

  return (
    <button onClick={handleMatch}>매칭 요청</button>
  );
};

export default Match;