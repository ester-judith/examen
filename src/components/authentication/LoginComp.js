import { Modal, Form, Button, Alert } from "react-bootstrap";
import React, { useState, useRef } from "react";

export const LoginComp = () => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');

    const emailRef = useRef();
    const passwordRef = useRef();

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const submitForm = (e) => {
        e.preventDefault();
        setError('');

        console.log(`email is ${emailRef.current.value}`);
        console.log(`passwordRef is ${passwordRef.current.value}`);
    };

    return (
        <>
            <div onClick={openForm} className="btn btn-outline-secondary mx-2">Iniciar sesion</div>
            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>
                    <Modal.Header>
                        <Modal.Title>Iniciar sesion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group>
                            <Form.Label>Correo electronico</Form.Label>
                            <Form.Control type="email" required ref={emailRef}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" required ref={passwordRef}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Iniciar sesion
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}