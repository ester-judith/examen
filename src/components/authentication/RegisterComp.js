import { Modal, Form, Button, Alert } from "react-bootstrap";
import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const RegisterComp = () => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');

    const emailRef = useRef();
    const passwordRef = useRef();
    const cmfPasswordRef = useRef();
    const { register } = useContext(AuthContext);

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const submitForm = async (e) => {
        e.preventDefault();
        setError('');

        if (passwordRef.current.value !== cmfPasswordRef.current.value) {
            return setError("La contraseña no coincide");
        }

        try {
            await register(emailRef.current.value, passwordRef.current.value);
            closeForm();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div onClick={openForm} className="btn btn-outline-danger mx-2"
                 style={{ color: "#ffffff", borderColor: "#ffffff", transition: "all 0.3s" }}>
                Registrarse
            </div>
            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>
                    <Modal.Header style={{ backgroundColor: "#d69496", border: "1px solid #dddddd" }}>
                        <Modal.Title style={{ color: "#ffffff" }}>
                            Registrarse
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group>
                            <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Correo Electrónico</Form.Label>
                            <Form.Control type="email" required ref={emailRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Contraseña</Form.Label>
                            <Form.Control type="password" required ref={passwordRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Confirmar Contraseña</Form.Label>
                            <Form.Control type="password" required ref={cmfPasswordRef} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm} style={{ backgroundColor: '#ddd', color: '#000' }}>
                            Cancelar
                        </Button>
                        <Button variant="danger" type="submit" style={{ backgroundColor: '#f5b2c2', color: '#000' }}>
                            Registrarse
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

  