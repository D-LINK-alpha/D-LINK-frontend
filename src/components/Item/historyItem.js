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
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Item = ({drinkName, similarity, cafeName, drinkType, isRecommended, isLike, historyId, itemClick }) => {
  let iconComponent;
  const [clicked, setClicked] = useState(isLike);
  const onClick = () => {
    setClicked(!clicked);
    like()
  };
  const boxStyle = isRecommended === true ? 'rounded-[16px] h-[68px]' : 'rounded-[10px] h-[48px] justify-between px-[27px]';
  let iconSize;
  const [cookies] = useCookies(['token']);

  const like = async () => {
    const token = cookies.token;
    try{
      const res = await axios.post(
        `${process.env.REACT_APP_REST_API_URL}/api/history/like`,
        {
          historyId: historyId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      if(res.data.msg === 'success')
        console.log('like res:', res);
    }catch (error){
      console.error('like error!!', error);
    }
  };

  // 아이콘 설정
  switch (drinkType) {
    case 'COFFEE':
      iconComponent = isRecommended ? <BigRedIcon /> : <SmallRedIcon />;
      iconSize = 'w-[59px] h-[59px] ml-[9px] mr-[4px]';
      break
    case 'LATTE':
      iconComponent = isRecommended ? <BigBlueIcon /> : <SmallBlueIcon />;
      iconSize = 'w-[40px] h-[40px] ml-[19px] mr-[13px]';
      break;
    case 'ADE':
      iconComponent = isRecommended ? <BigYellowIcon /> : <SmallYellowIcon />;
      iconSize = 'w-[41px] h-[40px] ml-[19px] mr-[12px]';
      break;
    case 'TEA':
      iconComponent = isRecommended ? <BigGreenIcon /> : <SmallGreenIcon />;
      iconSize = 'w-[53px] h-[54px] ml-[15px] mr-[4px]';
      break;
    default:
      iconComponent = null;
  }



  return (
      <div onClick={itemClick} className={`flex items-center w-[329px] bg-[#EDEDED] mb-[10px] ${boxStyle}`}>
        {isRecommended === true ? (
          <>
            <div className={`${iconSize} flex-shrink-0`}>
              {iconComponent}
            </div>
            <div className="text-[28px] flex-shrink-0">
              {similarity}
            </div>
            <div className="flex flex-col text-left flex-grow pl-[20px]">
              <div className="text-[12px]">
                {cafeName}
              </div>
              <div className="text-[#232322] text-[16px] font-bold">
                {drinkName}
              </div>
            </div>
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
  similarity: PropTypes.string.isRequired,
  cafeName: PropTypes.string.isRequired,
  drinkType: PropTypes.string.isRequired,
  isRecommended: PropTypes.bool.isRequired,
  isLike: PropTypes.bool.isRequired,
  historyId: PropTypes.number.isRequired,
  itemClick: PropTypes.func.isRequired,
};

export default Item;
