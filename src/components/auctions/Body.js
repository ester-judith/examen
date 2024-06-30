import React, { useContext, useState } from 'react';
import { Alert, Row } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { AddAuction } from './AddAuction';
import ProgressBarComponent from './ProgressBar';
import { useFirestore } from '../../hooks/useFirestore';
import { AuctionCard } from './AuctionCard';

export const AuctionBody = () => {
  const [auction, setAuction] = useState(null);
  const { currentUser, globalMsg } = useContext(AuthContext);
  const { docs } = useFirestore('auctions');

  return (
    <div className="py-5">
      <div className="container">
        {auction && <ProgressBarComponent auction={auction} setAuction={setAuction} />}

        {globalMsg && <Alert variant="info">{globalMsg}</Alert>}

        {currentUser && <AddAuction setAuction={setAuction} />}

        {docs && (
          <Row xs={1} sm={2} md={3} className="g-3">
            {docs.map((doc) => (
              <AuctionCard item={doc} key={doc.id} />
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};
