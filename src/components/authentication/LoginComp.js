import { Modal, Form, Button, Alert } from "react-bootstrap";
import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const LoginComp = () => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');

    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useContext(AuthContext);

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const submitForm = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(emailRef.current.value, passwordRef.current.value);
            closeForm();
        } catch (error) {
            setError("Error, Inicio de sesión inválido");
        }
    };

    return (
        <>
            <div onClick={openForm} className="btn btn-outline-danger mx-2 text-white border-white"> 
                Iniciar sesión
            </div>
            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>
                    <Modal.Header style={{ backgroundColor: "#d69496", border: "1px solid #dddddd" }}>
                        <Modal.Title style={{ color: "#ffffff" }}>
                            Iniciar sesión
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group>
                            <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Correo electrónico</Form.Label>
                            <Form.Control type="email" required ref={emailRef} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ color: "#d69496", fontSize: "1.0em", fontWeight: "bold" }}>Contraseña</Form.Label>
                            <Form.Control type="password" required ref={passwordRef} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm} style={{ backgroundColor: '#ddd', color: '#000' }}>
                            Cancelar
                        </Button>
                        <Button variant="danger" type="submit" style={{ backgroundColor: '#f5b2c2', color: '#000' }}>
                            Iniciar sesión
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

