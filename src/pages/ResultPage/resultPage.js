import React, { useState } from 'react';
// import { ReactComponent as ResultPic } from '../../assets/resultpic.svg';
import { Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '../../components/card';
import Box from '@mui/material/Box';

const ResultPage = () => {
  const [data, setData] = useState([
    {
      similarity: '98%',
      menu: '그린티 라떼 더블샷',
      cafe: '오설록',
      price: '5800원',
    },
    {
      similarity: '85%',
      menu: '쇼콜라 말차 모카',
      cafe: '엔제리너스',
      price: '6100원',
    },
    {
      similarity: '83%',
      menu: '말차말왕말왕 초콜릿 라떼',
      cafe: '스타벅스',
      price: '6700원',
    },
    {
      similarity: '81%',
      menu: '밀크폼 그린티',
      cafe: '엔제리너스',
      price: '6100원',
    },
    {
      similarity: '70%',
      menu: '오이도의 왕 류건 땀티',
      cafe: '꿉스케또',
      price: '5600원',
    },
    {
      similarity: '66%',
      menu: '정한결',
      cafe: '이안테라디움',
      price: '6500원',
    },
    {
      similarity: '56%',
      menu: '에궁연진',
      cafe: '금천구',
      price: '5800원',
    },
  ]);

  const sortBySimilarity = () => {
    const sortedData = [...data].sort((a, b) => {
      const similarityA = parseFloat(a.similarity.replace(/\D/g, ''));
      const similarityB = parseFloat(b.similarity.replace(/\D/g, ''));
      return similarityB - similarityA; // 내림차순으로 정렬(취향일치순)
    });
    setData(sortedData);
  };
  const sortByPrice = () => {
    const sortedData = [...data].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\D/g, ''));
      const priceB = parseInt(b.price.replace(/\D/g, ''));
      return priceA - priceB; //오름 차순(가격이 싼 순으로 정렬)
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
    <div className="flex flex-col">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ResultPage;