import React, { useContext } from 'react';
import Countdown from 'react-countdown';
import { AuthContext } from '../../context/AuthContext';
import StripeButton from './StripeButton';


const renderer = ({ days, hours, minutes, seconds, completed, owner, item, bidAuction, endAuction, increaseBid }) => {
  const [incrementAmount, setIncrementAmount] = (item.curPrice);

  const handleIncrementChange = (e) => {
    setIncrementAmount(parseInt(e.target.value) ); 
  };

  if (completed) {
    return null;
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <div
          style={{
            height: '320px',
            backgroundImage: `url(${item.itemImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="w-100"
        />
        <div className="card-body">
          <p className="lead display-6">
            {item.title}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <h5>
              {days * 24 + hours} hr: {minutes} min: {seconds} sec
            </h5>
          </div>
          <p className="card-text">
            {item.desc}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {!owner ? (
                <div 
                  onClick={() => bidAuction(item.id, item.curPrice)}
                  className="btn btn-outline-secondary"
                >
                  Oferta
                </div>
              ) : owner.email === item.email ? (
                <div
                  onClick={() => endAuction(item.id)}
                  className="btn btn-outline-secondary"
                >
                  Cancelar subasta
                </div>
              ) : owner.email === item.curWinner ? (
                <div className="d-flex align-items-center">
                 <p className="display-6 mr-2">Ganador</p>
                  <StripeButton amount={item.curPrice} />
                </div>
              ) : (
                <>
                  <div
                    onClick={() => bidAuction(item.id, item.curPrice)}
                    className="btn btn-outline-secondary"
                  >
                    Oferta
                  </div>
                  <div className="input-group my-3">
                    <input
                      type="number"
                      className="form-control"
                      value={incrementAmount}
                      onChange={handleIncrementChange}
                      placeholder="Cantidad a incrementar"
                    />
                    <div
                      onClick={() => increaseBid(item.id)} 
                      className="btn btn-outline-secondary"
                    >
                      Incrementar oferta
                    </div>
                  </div>
                  <StripeButton amount={item.curPrice + incrementAmount} />
                </>
              )}
            </div>
            <p className="display-6">${item.curPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuctionCard = ({ item }) => {
  let expiredDate = item.duration;
  const { currentUser, bidAuction, endAuction, increaseBid } = useContext(AuthContext);

  return (
    <Countdown
      owner={currentUser}
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      increaseBid={increaseBid}
      item={item}
      renderer={(props) => renderer({ ...props, owner: currentUser, item, bidAuction, endAuction, increaseBid })}
    />
  );
};

export default AuctionCard;