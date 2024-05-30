import React, { useEffect } from 'react';
import Spinner from '../../assets/loadingSpinner.gif';
import { ReactComponent as GroupIcon } from '../../assets/iconGroup.svg';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useCookies} from 'react-cookie';

const PromptLoading = () => {
  const location = useLocation();
  const { text, places } = location.state || {};
  const [ cookies ] = useCookies(['token']);
  const navigate = useNavigate();


  const promptPost = async () => {
    const token = cookies.token;
    try{
      const res = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/api/main/prompt`,
        {
          "prompt" : text,
          "cafes" : places
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate('/result', {state: {response: res.data}})
    } catch(error){
      console.error('promptPost error!!', error);
    }
  };
  useEffect(() => {
    // 컴포넌트가 마운트되면 promptPost 함수 호출
    promptPost();
  }, []); // 빈 배열을 의존성 배열로 전달하여 컴포넌트 마운트 시에만 실행

  return (
    <div className="flex flex-col justify-center items-center pt-[182px]">
      <GroupIcon className="relative" />
      <img
        src={Spinner}
        alt={'로딩'}
        width={'20%'}
        className="absolute pb-[96px]"
      />
      <div className="text-white text-[18px] pt-[62px]">
        오늘의 상황과 <br />딱 맞는 메뉴를 고르고 있어요.
      </div>
    </div>
  );
};

export default PromptLoading;
