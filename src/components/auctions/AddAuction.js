import { Modal, Form, Button, Alert, Row, Col } from "react-bootstrap";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import useStorage from "../../hooks/useStorage";

export const AddAuction = ({ setAuction }) => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);

    const itemTitle = useRef();
    const itemDesc = useRef();
    const startPrice = useRef();
    const itemDuration = useRef();
    const itemImage = useRef();

    const { currentUser } = useContext(AuthContext);
    const { addDocument } = useFirestore('auctions');
    const { url } = useStorage(file);

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    const submitForm = async (e) => {
        e.preventDefault();
        setError('');

        const selectedFile = itemImage.current.files[0];

        if (!imgTypes.includes(selectedFile.type)) {
            return setError('Por favor, use una imagen válida');
        }

        setFile(selectedFile);

        if (url) {
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
                itemImage: url,
            };

            try {
                await addDocument(newAuction);
                setAuction(newAuction);
                closeForm();
            } catch (error) {
                console.error('Error adding auction:', error);
                setError('No se pudo agregar la subasta. Intente de nuevo más tarde.'); 
            }
        }
    };

    return (
        <>
            <div className="col d-flex justify-content-center my-3">
                <div onClick={openForm} className="btn btn-outline-danger mx-2">
                    + Subasta
                </div>
            </div>
            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>
                    <Modal.Header style={{ backgroundColor: "#d69496", border: "1px solid #dddddd" }}>
                        <Modal.Title style={{ color: "#ffffff" }}>
                            Crear Subasta
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Título del Artículo</Form.Label>
                                    <Form.Control type="text" required ref={itemTitle} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Descripción del Artículo</Form.Label>
                                    <Form.Control type="text" required ref={itemDesc} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Precio Inicial</Form.Label>
                                    <Form.Control type="number" required ref={startPrice} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Duración en horas</Form.Label>
                                    <Form.Control type="number" required ref={itemDuration} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Vendedor</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={currentUser.email}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Imagen del Artículo</Form.Label>
                                    <Form.Control
                                        type='file'
                                        label="Seleccione la imagen del artículo"
                                        required
                                        ref={itemImage}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm} style={{ backgroundColor: '#ddd', color: '#000' }}>
                            Cancelar
                        </Button>
                        <Button variant="danger" type="submit" style={{ backgroundColor: '#f5b2c2', color: '#000' }}>
                            Crear Subasta
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};