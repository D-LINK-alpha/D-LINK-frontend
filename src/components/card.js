import { PropTypes } from 'prop-types';
import * as React from 'react';
import resultSample from '../assets/resultSample.svg';
import resultTea from '../assets/resultTea.svg';
import resultAde from '../assets/resultAde.svg';
import resultBeverage from '../assets/resultBeverage.svg';



const Card = ({ item, onClick, isActive }) => {
  let src;
  const type = item.type;
  if(type === "COFFEE"){
    src = resultSample;
  }
  else if(type === "TEA"){
    src = resultTea;
  }
  else if(type === "ADE"){
    src = resultAde;
  }
  else{
    src = resultBeverage;
  }
  const borderColor = isActive ? 'border-zinc-100' : 'border-neutral-500';
  return (
    <div
      className="grid grid-cols-1 w-full h-full max-w-40 place-items-center"
      onClick={onClick}
    >
      <div
        className={`border ${borderColor} bg-neutral-700 rounded-3xl h-[240px] max-w-40 max-h-60 w-full`}
      >
        <span className="text-white text-4xl flex justify-start pl-4 pt-6">
          {item.similarity}
        </span>
        <div className="max-w-40">
          <span className="truncate overflow-hidden hover:text-clip text-sm text-white font-bold flex justify-start pl-4 max-w-36">
            {item.name}
          </span>
        </div>
        <div className="pl-4 flex">
          <div className="text-white text-xs truncate justify-start">
            {item.cafe}
          </div>
          <div className="text-white text-xs pl-2 justify-start">
            {item.price}
          </div>
        </div>
        <div className="grid place-items-center h-[138px]">
          <img
            src={src}
            alt="음료 이미지"
            className="h-[100px] w-[100px] "
          />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    similarity: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cafe: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Card;
