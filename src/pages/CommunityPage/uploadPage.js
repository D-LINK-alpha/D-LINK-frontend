import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import * as React from 'react';
import Input from '../../components/Input/communityInput';
import { useState, useRef } from 'react';
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
  const [imagePreviews, setImagePreviews] = useState([]);
  const [cookies] = useCookies(['token']);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const navigate = useNavigate();
  const titleMaxLength = 30;
  const contentMaxLength = 200;
  const maxImages = 10;
  const fileInputRef = useRef(null);

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
    const files = Array.from(event.target.files);
    const newImages = [...images, ...files].slice(0, maxImages);
    setImages(newImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, maxImages));
  };

  const handleImageAddClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !content || images.length === 0) {
      setEmptyFieldError(true);
      setModalIsOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    for (let i = 0; i < images.length; i++) {
      formData.append('files', images[i]);
    }

    const token = cookies.token;

    try {
      await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/api/article/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUploadError(false);
      setEmptyFieldError(false);
      setModalIsOpen(true);
    } catch (error) {
      console.error(error);
      setUploadError(true);
      setModalIsOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    if (!uploadError && !emptyFieldError) {
      navigate(`/community`);
    }
  };

  return (
    <div className="bg-[#363636]">
      <Header title="Share Your DLNK" />
      <div className="flex flex-col h-screen pt-[75px] pb-[83px]">
        <div className="overflow-auto scrollbar-hide">
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

          <div className="flex-col px-[23px] text-start">
            <div className="py-[4px]">
              <p className="text-sm text-amber-50">사진 *</p>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {imagePreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`preview ${index}`}
                  className="w-24 h-24 object-cover rounded-xl"
                />
              ))}
              {images.length < maxImages && (
                <div
                  className="w-24 h-24 bg-gray-200 flex justify-center items-center rounded-xl"
                  onClick={handleImageAddClick}
                  style={{ minWidth: '96px', minHeight: '96px' }}
                >
                  +
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              onChange={handleImageChange}
              className="hidden"
              ref={fileInputRef}
              multiple
            />
            <p className="text-xs text-[#8E8E8E] pt-1">
              최대 10장의 사진을 첨부할 수 있습니다.
            </p>
          </div>

          <div className="flex-col px-[23px] pt-[18px] text-start">
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
          className="absolute top-[50%] left-[50%] w-[270px] flex-col bg-white rounded-xl
        p-5 translate-x-[-50%] translate-y-[-50%] flex self-center"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {emptyFieldError
              ? '모든 필드를 채워주세요'
              : uploadError
                ? '업로드 실패'
                : '작성 완료되었습니다!'}
          </Typography>
          <Typography
            id="modal-modal-description"
            className="mt-2 text-sm text-[black] "
          >
            {emptyFieldError
              ? '제목, 내용, 사진을 모두 입력해 주세요.'
              : uploadError
                ? '게시물 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.'
                : '게시물이 성공적으로 업로드되었습니다.'}
          </Typography>
          <Button
            onClick={handleModalClose}
            className="mt-2 text-sm text-[black]"
          >
            확인
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
