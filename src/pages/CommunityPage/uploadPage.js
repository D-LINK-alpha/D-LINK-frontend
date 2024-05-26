import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import * as React from 'react';
import Input from '../../components/Input/communityInput';
import { useState } from 'react';
import MuiButton from '../../components/Button/muiButton';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [cookies] = useCookies(['token']);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newPostId, setNewPostId] = useState(null);
  const navigate = useNavigate();
  const titleMaxLength = 30;
  const contentMaxLength = 200;

  const handleTitleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= titleMaxLength) {
      setTitle(inputValue);
    }
  };

  const handleContentChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= contentMaxLength) {
      setContent(inputValue);
    }
  };

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    for (let i = 0; i < images.length; i++) {
      formData.append('files', images[i]);
    }

    const token = cookies.token;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/api/article/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setNewPostId(response.data.postId); // postId 저장
      setModalIsOpen(true); // 모달 열기
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    if (newPostId) {
      navigate(`/community`); // 새 게시물 페이지로 이동
    }
  };

  return (
    <div className="bg-[#363636]">
      <Header title="Share Your DLNK" />
      <div className="flex flex-col h-screen pt-[75px] pb-[83px]">
        <div className="overflow-auto scrollbar-hide">
          {/* 페이지 제목 */}
          <div className="flex space-x-0 justify-between pt-4 px-[23px] pb-8 bg-[#232322] h-[84px]">
            <p className="text-amber-50 text-2xl">Upload</p>
            <div className="flex justify-end"></div>
          </div>

          <div className="flex-col px-[23px] text-start pt-[18px]">
            <Input
              label="제목 *"
              placeholder="카페와 음료의 이름을 포함해주세요"
              borderRadius={8}
              value={title}
              onChange={handleTitleChange}
            />
            <div className="text-[#8E8E8E] flex justify-end mt-1">
              <p className="text-sm">
                {title.length}/{titleMaxLength}
              </p>
            </div>
          </div>

          {/* 사진 추가 */}
          <div className="flex-col px-[23px] text-start">
            <div className="py-[18px]">
              <p className="text-sm text-amber-50">사진 *</p>
            </div>
            <input
              type="file"
              multiple
              accept="image/jpg, image/jpeg, image/png"
              onChange={handleImageChange}
              className="text-[#8E8E8E]"
            />
          </div>

          {/* 게시글 본문 */}
          <div className="flex-col px-[23px] text-start">
            <Input
              label="게시글 본문 *"
              placeholder="오늘의 꿀조합을 소개해주세요"
              multiline
              rows={10}
              borderRadius={21}
              value={content}
              onChange={handleContentChange}
            />
            <div className="text-[#8E8E8E] flex justify-end mt-1">
              <p className="text-sm">
                {content.length}/{contentMaxLength}
              </p>
            </div>
          </div>
          {/* 닫기 업로드 버튼 */}
          <div className="px-[23px] flex pt-[25px] pb-[25px] justify-end">
            <Link to={'/community'}>
              <MuiButton
                className="w-[92px] h-[37px] rounded-3xl bg-[#363636] text-sm shadow-none text-[#8E8E8E]"
                text="닫기"
              />
            </Link>
            <MuiButton
              type="submit"
              className="w-[92px] h-[37px] rounded-3xl bg-[#3FCC7C] text-sm"
              text="업로드"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      <Footer />

      <Modal
        open={modalIsOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            작성 완료되었습니다!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            게시물이 성공적으로 업로드되었습니다.
          </Typography>
          <Button onClick={handleModalClose} sx={{ mt: 2 }}>
            확인
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
