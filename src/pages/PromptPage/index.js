import React, { useState } from 'react';
import { ReactComponent as InputSample } from '../../assets/inputSample.svg';
import { Button } from '@mui/material';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
const PromptPage = () => {
  const [text, setText] = useState('');
  const maxLength = 200; // 최대 글자 수

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxLength) {
      setText(inputValue);
    }
  };

  // const title = 'prompt';

  return (
    <>
      <Header title="prompt" />
      <div className="flex flex-col h-screen px-7 py-[64px]">
        <div className="flex-1">
          <div className="flex justify-center mt-8">
            <InputSample />
            <div className="absolute">
              <textarea
                placeholder="내용을 입력해주세요."
                className="relative z-10 pt-8 bg-transparent focus:outline-none
              w-[263px] h-[200px]
              text-sm font-normal resize-none"
                value={text}
                onChange={handleChange}
              />
              <div className="text-[#8E8E8E] flex justify-end">
                <p>
                  {text.length}/{maxLength}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button className="w-16 h-9 bg-[#EDEDED] text-black rounded-3xl">
              저장
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PromptPage;
