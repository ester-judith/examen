// src/components/auctions/AddAuction.js
import React, { useState, useRef, useContext } from "react";
import { Modal, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

export const AddAuction = ({ setAuction }) => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const itemTitle = useRef();
  const itemDesc = useRef();
  const startPrice = useRef();
  const itemDuration = useRef();
  const itemImage = useRef();
  const { currentUser } = useContext(AuthContext);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    if (!imgTypes.includes(itemImage.current.files[0].type)) {
      return setError('Por favor sube una imagen valida')
    }

    let currentDate = new Date();
    let dueDate = currentDate.setHours(
      currentDate.getHours() + itemDuration.current.value
    );

    let newAuction = {
      email: currentUser.email,
      title: itemTitle.current.value,
      desc: itemDesc.current.value,
      curPrice: startPrice.current.value,
      duration: dueDate,
      itemImage: itemImage.current.files[0]
    };

    setAuction(newAuction);
    closeForm();
  };

  return (
    <>
      <div className="col d-flex justify-content-center my-3">
        <div onClick={openForm} className="btn btn-outline-secondary mx-2">
          + Subasta
        </div>
      </div>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header style={{ backgroundColor: "#d69496", border: "1px solid #dddddd" }}>
            <Modal.Title style={{ color: "#ffffff" }}>
              Crear subasta
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Titulo del articulo</Form.Label>
                  <Form.Control type="text" required ref={itemTitle} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Descripcion del articulo</Form.Label>
                  <Form.Control type="text" required ref={itemDesc} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Precio inicial</Form.Label>
                  <Form.Control type="number" required ref={startPrice} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Duracion del articulo en horas</Form.Label>
                  <Form.Control type="number" required ref={itemDuration} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Vendedor</Form.Label>
                  <Form.Control type="text" value={currentUser.email} readOnly />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Imagen del articulo</Form.Label>
                  <Form.File label="Selecciona imagen del articulo" custom required ref={itemImage} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm} style={{ backgroundColor: '#ddd', color: '#000' }}>
              Cancelar
            </Button>
            <Button variant="danger" type="submit" style={{ backgroundColor: '#f5b2c2', color: '#000' }}>
              Crear
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
