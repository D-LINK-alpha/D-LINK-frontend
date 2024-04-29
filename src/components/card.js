import { PropTypes } from 'prop-types';
import { ReactComponent as ResultSample } from '../assets/resultSample.svg';

const Card = ({ item }) => {
  return (
    <div className="grid grid-cols-1 w-full h-full max-w-40 place-items-center">
      <div className="border border-gray-200 rounded-3xl max-w-40 max-h-60 w-full">
        <span className="text-white text-4xl flex justify-start pl-4 pt-6">
          {item.similarity}
        </span>
        <div className="max-w-40">
          <span className="truncate overflow-hidden hover:text-clip text-sm text-white font-bold flex justify-start pl-4 max-w-36">
            {item.menu}
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
        <div className="grid place-items-center">
          {/*<ResultPic />*/}
          <ResultSample />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    similarity: PropTypes.string.isRequired,
    menu: PropTypes.string.isRequired,
    cafe: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
