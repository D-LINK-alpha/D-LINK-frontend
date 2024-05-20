import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import * as React from 'react';
import Input from '../../components/Input/communityInput';
import { useState } from 'react';
import MuiButton from '../../components/Button/muiButton';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  return (
    <div className="bg-[#363636]">
      <Header title="Share Your DLNK" />
      <div className="flex flex-col h-screen pt-[75px] pb-[83px]">
        <div className="overflow-auto scrollbar-hide">
          {/*페이지 제목*/}
          <div className="flex space-x-0 justify-between pt-4 px-[23px] pb-8 bg-[#232322] h-[84px]">
            <p className="text-amber-50 text-2xl">Upload</p>
            <div className="flex justify-end"></div>
          </div>

          {/*제목*/}
          <div className="w-full flex-col space-x-0 justify-between items-center bg-[#363636]">
            <div className="flex-col px-[23px] text-start pt-[18px] ">
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

            {/*사진 추가*/}
            <div className="flex-col px-[23px] text-start">
              <div className="py-[18px]">
                <p className="text-sm text-amber-50">사진 *</p>
              </div>
            </div>

            {/*게시글 본문*/}
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
            {/*닫기 업로드 버튼*/}
            <div className="px-[23px] flex pt-[25px] pb-[25px] justify-end">
              <MuiButton
                className="w-[92Px] h-[37px] rounded-3xl bg-[#363636] text-sm shadow-none text-[#8E8E8E]"
                text="닫기"
              />
              <MuiButton
                className="w-[92Px] h-[37px] rounded-3xl bg-[#3FCC7C] text-sm"
                text="업로드"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
