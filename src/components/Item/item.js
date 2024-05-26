import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as RedIcon } from "../../assets/red.svg";
import { ReactComponent as GreenIcon } from "../../assets/green.svg";
import { ReactComponent as BlueIcon } from "../../assets/blue.svg";
import { ReactComponent as YellowIcon } from "../../assets/yellow.svg";

const Item = ({drinkName, similarity, cafeName, drinkType, size, createdAt }) => {
  let iconComponent;
  let iconSize;
  let iconPadding;

  // 아이콘 설정
  switch (drinkType) {
    case 'COFFEE':
      iconComponent = <RedIcon />;
      iconSize = 'w-[120px] h-[120px]';
      iconPadding = 'pr-[16px] pb-[4px]';
      break;
    case 'LATTE':
      iconComponent = <BlueIcon />;
      iconSize = 'w-[102px] h-[101px]';
      iconPadding = 'pr-[24px] pb-[22px]';
      break;
    case 'ADE':
      iconComponent = <YellowIcon />;
      iconSize = 'w-[102px] h-[99px]';
      iconPadding = 'pr-[30px] pb-[25px]';
      break;
    case 'TEA':
      iconComponent = <GreenIcon />;
      iconSize = 'w-[128px] h-[131px]';
      iconPadding = 'pr-[13px] pb-[24px]';
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

  const small = 'w-[247px] h-[48px] rounded-[17px] mb-[8px] pr-[19px] text-[#232322] text-[14px] font-bold'
  const sizeClass = size === 'big' ? 'w-[329px] h-[197px] rounded-[29px] text-white mb-[10px]' : small;

  const date = new Date(createdAt);
  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}.${day}`;
  };

  return (
    <>
      {size === 'big' ? (
        <div className={`flex ${bgColor[drinkType]} ${sizeClass}`}>
          <div className="flex flex-col items-start pl-[28px] pt-[16px]">
            <div className="underline underline-offset-2 text-[18px] font-semibold pl-[5px]">
              {formatDate(date)}
            </div>
            <div className="text-[48px]">
              {similarity}
            </div>
            <div className="text-[12px] pt-[8px]">
              {cafeName}
            </div>
            <div className="text-[16px] font-bold pt-[4px]">
              {drinkName}
            </div>
          </div>
          <div className={`ml-auto place-self-end ${iconPadding}`}>
            <div className={iconSize}>
              {iconComponent}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
        <div className="underline underline-offset-2 text-[18px] font-semibold text-white pl-[12px]">
          {formatDate(date)}
        </div>
        <div className={`flex items-center justify-end ${bgColor[drinkType]} ${sizeClass}`}>
          {drinkName}
        </div>
        </div>
  )
}
</>
  );
};

Item.propTypes = {
  drinkName: PropTypes.string.isRequired,
  similarity: PropTypes.string.isRequired,
  cafeName: PropTypes.string.isRequired,
  drinkType: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Item;
