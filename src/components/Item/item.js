import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as RedIcon } from "../../assets/red.svg";
import { ReactComponent as GreenIcon } from "../../assets/green_small.svg";
import { ReactComponent as BlueIcon } from "../../assets/blue.svg";
import { ReactComponent as YellowIcon } from "../../assets/yellow.svg";

const Item = ({drinkName, similarity, cafeName, drinkType, index, size }) => {
  let iconComponent;

  // 아이콘 설정
  switch (drinkType) {
    case 'coffee':
      iconComponent = <RedIcon />;
      break;
    case 'latte':
      iconComponent = <BlueIcon />;
      break;
    case 'ade':
      iconComponent = <YellowIcon />;
      break;
    case 'tea':
      iconComponent = <GreenIcon />;
      break;
    default:
      iconComponent = null;
  }

  // 배경 색상 및 사이즈 설정
  const bgColor = {
    coffee: 'bg-[#DF5A21]',  // red
    latte: 'bg-[#5AC8FA]',  // blue
    ade: 'bg-[#FFCC00]',  // yellow
    tea: 'bg-[#3FCC7C]',  // green
  };

  const sizeClass = size === 'big' ? 'rounded-[29px]' : 'rounded-[17px] mt-[8px]';

  return (
    <div className={`flex text-white ${bgColor[drinkType]} ${sizeClass}`}>
      {size === 'big' ? (
        <>
          <div className='flex flex-col items-start w-[329px] h-[197px] pl-[28px]'>
            <div className='text-[52px] pt-[21px]'>
              {similarity}
            </div>
            <div className='text-[12px] pt-[8px]'>
              {cafeName}
            </div>
            <div className='text-[16px] font-bold pt-[4px]'>
              {drinkName}
            </div>
          </div>
          <div className='pl-[32px] pr-[19px] pb-[20px] content-end'>
            {iconComponent}
          </div>
        </>
      ) : (
        <div className="flex justify-between w-[329px] h-[48px] pt-[13px] pl-[17px] pr-[19px] text-[#232322] text-[14px] font-bold">
          <div className="content-center w-[22px] h-[22px] rounded-full bg-[#232322] text-white text-[12px]">
            {index}
          </div>
          {drinkName}
        </div>
      )}
    </div>
  );
};

Item.propTypes = {
  drinkName: PropTypes.string.isRequired,
  similarity: PropTypes.string.isRequired,
  cafeName: PropTypes.string.isRequired,
  drinkType: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default Item;
