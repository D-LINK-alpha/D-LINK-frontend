import * as React from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { userState } from '../../recoil/userState';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import MuiButton from '../../components/Button/muiButton';
import Profile from '../../components/Profile/index';
import { ReactComponent as Arrow } from '../../assets/setting/rightarrow.svg';
import { ReactComponent as Pencil } from '../../assets/setting/pencil.svg';

export default function SettingPage() {
  const [user, setUser] = useRecoilState(userState);
  const [, setIsEditing] = React.useState(false);
  const [newNickname, setNewNickname] = React.useState(user.nickname);
  const [cookies] = useCookies(['token']);

  const token = cookies.token;

  const onClick = () => {
    alert('준비 중입니다.');
  };

  const handleNicknameChange = (event) => {
    setNewNickname(event.target.value);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const saveNickname = async () => {
    console.log('Attempting to save nickname:', newNickname);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_REST_API_URL}/api/auth/update`,
        { nickname: newNickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('API response:', response);
      if (response.status === 200) {
        setUser({ ...user, nickname: newNickname });
        setIsEditing(false);
      } else {
        alert('닉네임 업데이트 실패');
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
      alert('오류 발생: 닉네임을 업데이트할 수 없습니다.');
    }
  };

  React.useEffect(() => {
    setNewNickname(user.nickname);
  }, [user.nickname]);

  React.useEffect(() => {
    console.log('Current nickname:', user.nickname);
  }, [user.nickname]);

  return (
    <div>
      <Header title="Setting" />
      <div className="flex flex-col pt-[75px] pb-[83px] h-screen">
        <div className="overflow-scroll">
          <div className="flex bg-[#363636] h-[205px] justify-center">
            <div className="flex flex-col justify-center items-center">
              <div className="pb-[29px]">
                <Profile size={82} />
              </div>
              <div className="flex pl-5">
                <input
                  placeholder="닉네임"
                  value={newNickname}
                  onChange={handleNicknameChange}
                  onClick={startEditing}
                  className="text-amber-50 bg-transparent text-lg w-[98px] font-medium focus:outline-none border-b-[1px] border-solid border-b-white text-center"
                />
                <div
                  className="self-center cursor-pointer"
                  onClick={saveNickname}
                >
                  <Pencil />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-0 pt-4 px-[35px]">
            <p className="text-amber-50 text-2xl">Setting</p>
          </div>

          <div className="flex flex-col px-[23px] justify-between max-h-[440px] pt-[29px] gap-6">
            <div className="self-center">
              <MuiButton
                text="Push 알림 허용"
                className="bg-[#363636] h-[48px] w-[329px] rounded-2xl justify-between"
                endIcon={<Arrow />}
              />
            </div>
            <div className="self-center">
              <MuiButton
                text="이용약관"
                className="bg-[#363636] h-[48px] w-[329px] rounded-2xl justify-between"
                endIcon={<Arrow />}
              />
            </div>
            <div className="self-center">
              <MuiButton
                text="개인정보 처리방침"
                className="bg-[#363636] h-[48px] w-[329px] rounded-2xl justify-between"
                endIcon={<Arrow />}
              />
            </div>
            <div className="self-center">
              <MuiButton
                text="관리자 모드"
                className="bg-[#595959] text-gray-500 h-[48px] w-[329px] rounded-2xl justify-between"
                endIcon={<Arrow />}
                disabled={true}
                onClick={onClick}
              />
            </div>
            <div className="self-center">
              <MuiButton
                text="메뉴 등록"
                className="bg-[#595959] text-gray-500 h-[48px] w-[329px] rounded-2xl justify-between"
                endIcon={<Arrow />}
                disabled={true}
                onClick={onClick}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
