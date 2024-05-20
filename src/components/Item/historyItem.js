import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as RedIcon } from '../../assets/miniRed.svg';
import { ReactComponent as GreenIcon } from '../../assets/miniGreen.svg';
import { ReactComponent as BlueIcon } from '../../assets/miniBlue.svg';
import { ReactComponent as YellowIcon } from '../../assets/miniYellow.svg';
import { ReactComponent as Star } from '../../assets/star.svg';

const Item = ({drinkName, drinkType, isLike }) => {
  let iconComponent;
  const [clicked, setClicked] = useState(isLike);
  const onClick = () => setClicked(!clicked);

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



  return (
    <>
      <div className="flex justify-between items-center w-[329px] h-[48px] rounded-[10px] bg-[#EDEDED] px-[27px] mb-[10px]">
        {iconComponent}
        <div className="text-[#232322] text-[16px] font-semibold">
          {drinkName}
        </div>
        <Star className={`fill-current ${clicked ? 'text-[#3FCC7C]' : 'text-[#F6F6F4]'}`}
              onClick={onClick}/>
      </div>
    </>
  );
};

Item.propTypes = {
  drinkName: PropTypes.string.isRequired,
  drinkType: PropTypes.string.isRequired,
  isLike: PropTypes.bool.isRequired,
};

export default Item;
