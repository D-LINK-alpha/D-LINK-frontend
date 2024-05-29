import React, { useState } from 'react';
import { Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '../../components/card';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer'

const ResultPage = () => {
  const location = useLocation();
  const { response } = location.state || {};
  console.log(response);
  const new_response = response.map(item => ({
    ...item,
    similarity: Math.floor(item.similarity * 100)
  }));
  const [data, setData] = useState(new_response);

  const [activeCard, setActiveCard] = useState('');

  const navigate = useNavigate();

  const takeASleep = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const wait = async () => {
    //wait, takeAsleep은 지연 이벤트를 동기적으로 처리해주기 위한 함수
    await takeASleep(300);
  };

  const handleCardClick = async (id) => {
    setActiveCard(id);
    await wait();
    const clickedCardData = data[id];
    navigate('./recommendingPage', {state: {id, cardData: clickedCardData}});
  };

  const sortBySimilarity = () => {
    const sortedData = [...data].sort((a, b) => {
      return b.similarity - a.similarity; // 내림차순으로 정렬(취향일치순)
    });
    setData(sortedData);
  };

  const sortByPrice = () => {
    const sortedData = [...data].sort((a, b) => {
      return a.price - b.price; // 오름차순(가격이 싼 순으로 정렬)
    });
    setData(sortedData);
  };


  const [priceButtonStyle, setPriceButtonStyle] = useState('#818181');
  const [simButtonStyle, setSimButtonStyle] = useState('#FFFFFF');
  const handleSimButtonClick = () => {
    console.log('취향순 버튼 클릭');
    setPriceButtonStyle('#818181');
    setSimButtonStyle('#FFFFFF');
    sortBySimilarity();
  };
  const handlePriceButtonClick = () => {
    console.log('가격버튼 클릭');
    setSimButtonStyle('#818181');
    setPriceButtonStyle('#FFFFFF');
    sortByPrice();
  };
  return (
    <>
      <Header title="Get Your DLNK !" />
      <div className="flex flex-col h-screen py-[85px]">
        <div className="overflow-y-scroll">
          <div className="flex flex-col">
            <Box
              className="mr-1 mb-2"
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                '& > *': {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                variant="text"
                color="primary"
                aria-label="small button group"
                sx={{
                  borderColor: '#FFFFFF', // 버튼 그룹의 구분선 색상 변경
                  '& .MuiButtonGroup-grouped': {
                    borderColor: '#FFFFFF', // 개별 버튼 간의 선의 색상을 변경
                  },
                }}
              >
                <Button
                  style={{ color: priceButtonStyle }}
                  size="small"
                  onClick={handlePriceButtonClick}
                >
                  가격순
                </Button>
                <Button
                  style={{ color: simButtonStyle }}
                  size="small"
                  onClick={handleSimButtonClick}
                >
                  취향일치순
                </Button>
              </ButtonGroup>
            </Box>
            <div className="flex flex-wrap justify-center gap-4">
              {data.map((item, index) => (
                <Card
                  key={index}
                  item={{
                    ...item,
                    similarity: `${item.similarity}%`,
                    price: `${item.price}원`
                  }}
                  onClick={() => handleCardClick(index)} // 각 카드 클릭 이벤트 처리
                  isActive={activeCard === index} // 현재 카드가 클릭 상태인지 결정
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResultPage;

