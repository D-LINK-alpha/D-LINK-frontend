import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { ReactComponent as InputSample } from '../../assets/inputSample.svg';

const PromptPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Prompt" />
      <div className="flex-1">
        <div className="flex justify-center pt-8">
          <InputSample />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PromptPage;
