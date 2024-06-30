import React, { useContext, useState } from 'react';
import Countdown from 'react-countdown';
import { AuthContext } from '../../context/AuthContext';
import StripeButton from './StripeButton';
import { Button, Card, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border: 2px solid #d69496; /* Color rosa: #f50057 */
  border-radius: 10px; /* Ajusta según sea necesario */
`;

const CardBody = styled(Card.Body)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled(Card.Title)`
  font-size: 1.6rem;
`;

const CardText = styled(Card.Text)`
  flex: 1;
`;

const ImageContainer = styled.div`
  height: 200px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  owner,
  item,
  bidAuction,
  endAuction,
  increaseBid,
  incrementAmount,
  handleIncrementChange,
}) => {
  if (completed) {
    return null;
  }

  return (
    <Col className="mb-4">
      <StyledCard className="shadow-sm h-100">
        <ImageContainer style={{ backgroundImage: `url(${item.itemImage})` }} />
        <CardBody>
          <CardTitle className="lead display-6">{item.title}</CardTitle>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>
              {days * 24 + hours} hr: {minutes} min: {seconds} sec
            </h5>
          </div>
          <CardText>{item.desc}</CardText>
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="display-6">${item.curPrice}</p>
            </div>
            <div className="d-flex flex-column">
              {!owner ? (
                <Button variant="outline-danger" onClick={() => bidAuction(item.id, item.curPrice)}>
                  Oferta
                </Button>
              ) : owner.email === item.email ? (
                <Button variant="outline-danger" onClick={() => endAuction(item.id)}>
                  Cancelar subasta
                </Button>
              ) : owner.email === item.curWinner ? (
                <div className="d-flex align-items-center">
                  <p className="display-6 mr-2">Ganador</p>
                  <StripeButton amount={item.curPrice} />
                </div>
              ) : (
                <>
                  <Button variant="outline-danger mb-2" onClick={() => bidAuction(item.id, item.curPrice)}>
                    Oferta
                  </Button>
                  <div className="input-group mb-2">
                    <Form.Control
                      type="number"
                      value={incrementAmount}
                      onChange={handleIncrementChange}
                      placeholder="Cantidad a incrementar"
                      className="mr-2"
                    />
                    <Button variant="outline-danger" onClick={() => increaseBid(item.id)}>
                      Incrementar oferta
                    </Button>
                  </div>
                  <StripeButton amount={item.curPrice + (incrementAmount || 0)} />
                </>
              )}
            </div>
          </div>
        </CardBody>
      </StyledCard>
    </Col>
  );
};

export const AuctionCard = ({ item }) => {
  const [incrementAmount, setIncrementAmount] = useState(0);
  const { currentUser, bidAuction, endAuction, increaseBid } = useContext(AuthContext);

  const handleIncrementChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setIncrementAmount(isNaN(value) ? 0 : value);
  };

  const expiredDate = item.duration;

  return (
    <Countdown
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      increaseBid={increaseBid}
      item={item}
      renderer={(props) => (
        <Renderer
          {...props}
          owner={currentUser}
          item={item}
          bidAuction={bidAuction}
          endAuction={endAuction}
          increaseBid={increaseBid}
          incrementAmount={incrementAmount}
          handleIncrementChange={handleIncrementChange}
        />
      )}
    />
  );
};

export default AuctionCard;
