import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SmallRedIcon } from '../../assets/miniRed.svg';
import { ReactComponent as SmallGreenIcon } from '../../assets/miniGreen.svg';
import { ReactComponent as SmallBlueIcon } from '../../assets/miniBlue.svg';
import { ReactComponent as SmallYellowIcon } from '../../assets/miniYellow.svg';
import { ReactComponent as BigRedIcon } from '../../assets/red.svg';
import { ReactComponent as BigGreenIcon } from '../../assets/green.svg';
import { ReactComponent as BigBlueIcon } from '../../assets/blue.svg';
import { ReactComponent as BigYellowIcon } from '../../assets/yellow.svg';
import { ReactComponent as Star } from '../../assets/star.svg';

const Item = ({drinkName, drinkType, isLike, bookmark }) => {
  let iconComponent;
  const [clicked, setClicked] = useState(bookmark);
  const onClick = () => setClicked(!clicked);

  // 아이콘 설정
  switch (drinkType) {
    case 'coffee':
      if(isLike) iconComponent = <BigRedIcon />;
      else iconComponent = <SmallRedIcon />;
      break;
    case 'latte':
      if(isLike) iconComponent = <BigBlueIcon />;
      else iconComponent = <SmallBlueIcon />;
      break;
    case 'ade':
      if(isLike) iconComponent = <BigYellowIcon />;
      else iconComponent = <SmallYellowIcon />;
      break;
    case 'tea':
      if(isLike) iconComponent = <BigGreenIcon />;
      else iconComponent = <SmallGreenIcon />;
      break;
    default:
      iconComponent = null;
  }

  const boxStyle = isLike === true ? 'rounded-[16px] h-[68px]' : 'rounded-[10px] h-[48px]';


  return (
      <div className={`flex justify-between items-center w-[329px] bg-[#EDEDED] px-[27px] mb-[10px] ${boxStyle}`}>
        {isLike === true ? (
          <>
        {iconComponent}
        <div className="text-[#232322] text-[16px] font-semibold">
          {drinkName}
        </div>
        <Star className={`fill-current ${clicked ? 'text-[#3FCC7C]' : 'text-[#F6F6F4]'}`}
              onClick={onClick}/>
          </>
        ) : (
          <>
            {iconComponent}
            <div className="text-[#232322] text-[16px] font-semibold">
              {drinkName}
            </div>
            <Star className={`fill-current ${clicked ? 'text-[#3FCC7C]' : 'text-[#F6F6F4]'}`}
                  onClick={onClick}/>
          </>
        )}
      </div>
  );
};

Item.propTypes = {
  drinkName: PropTypes.string.isRequired,
  drinkType: PropTypes.string.isRequired,
  isLike: PropTypes.bool.isRequired,
  bookmark: PropTypes.bool.isRequired,
};

export default Item;
