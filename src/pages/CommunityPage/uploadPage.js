import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer';
import * as React from 'react';
// import { Link } from 'react-router-dom';

export default function UploadPage() {
  return (
    <div>
      <Header title="Share Your DLNK" />
      <div className="flex flex-col h-screen py-[64px]">
        <div className="overflow-auto scrollbar-hide">
          <div className="flex space-x-0 justify-between pt-4 px-[23px] pb-8">
            <p className="text-amber-50 text-2xl">Upload</p>
            <div className="flex justify-end"></div>
          </div>

          <div className="w-full flex-col space-x-0 justify-center items-center bg-[#363636]">
            <div className="flex px-[23px]">
              <p className="text-sm text-amber-50 py-[18px]">제목 *</p>
            </div>
            <div className="flex px-[23px]">
              <p className="text-sm text-amber-50 py-[18px]">사진 *</p>
            </div>
            <div className="flex px-[23px]">
              <p className="text-sm text-amber-50 py-[18px]">게시글 본문 *</p>
            </div>
          </div>

          <div className="px-[23px] flex justify-center pt-[81px]"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
