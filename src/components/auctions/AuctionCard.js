import React, { useContext } from 'react';
import Countdown from 'react-countdown';
import { AuthContext } from '../../context/AuthContext';

const renderer = ({ days, hours, minutes, seconds, completed, owner, item, bidAuction, endAuction }) => {
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
                  onClick={() => bidAuction(item.id, item.curPrice)} className="btn btn-outline-secondary"
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
                <p className="display-6">Ganador</p>
              ): (
                <div
                  onClick={() => bidAuction(item.id, item.curPrice)}
                  className="btn btn-outline-secondary"
                >
                  Oferta
                </div>
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
  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);

  return (
    <Countdown
      owner={currentUser}
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      item={item}
      renderer={(props) => renderer({ ...props, owner: currentUser, item, bidAuction, endAuction })}
    />
  );
};
