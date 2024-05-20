import React, { useState } from 'react';
import MuiButton from '../../components/Button/muiButton';
import { useNavigate } from 'react-router-dom';
// import TextFields from '../../components/Input';
// import checkException from '../../apis/utils/checkException';
import axios from 'axios';
const token = '3F4FD81F3934B66D7C7D64956EAF597F';

export default function Join() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleJoin = async () => {
    console.log('되는 중');
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/auth/join`,
        {
          email: 'awhekdns@gmail.com',
          nickname: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (res.data.msg === 'success') {
        sessionStorage.setItem('token', res.data.token);
        navigate('/main');
      } else {
        alert('회원 가입 실패');
      }
    } catch (error) {
      alert('오류 발생');
    }
  };

  return (
    <div className="px-5">
      <h1 className="text-amber-50 text-2xl pt-20">Welcome to DLNK !</h1>
      <div className="pt-48">
        <input
          placeholder="본명이나 닉네임을 입력하세요"
          className="text-join-color bg-transparent text-lg
          w-56 font-medium focus:outline-none
          border-b-[1px] border-solid border-b-white
          text-center"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <p className="text-[#868686] text-sm pt-8">
        DLNK 프로필에 표시되는 이름으로, <br />
        이후 마이페이지에서 변경할 수 있습니다.
      </p>
      <div className="flex justify-center pt-40">
        <MuiButton
          text="계속"
          className="w-44 h-12 rounded-3xl bg-[#3FCC7C] text-lg"
          onClick={handleJoin}
        />
      </div>
    </div>
  );
}
