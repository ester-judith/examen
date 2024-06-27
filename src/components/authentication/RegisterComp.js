import { Modal, Form, Button, Alert } from "react-bootstrap";
import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const RegisterComp = () => {
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');

    const emailRef = useRef();
    const passwordRef = useRef();
    const cmfPasswordRef = useRef();
    const { register } = useContext(AuthContext)

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const submitForm = async (e) => {
        e.preventDefault();
        setError('');

        if (passwordRef.current.value !== cmfPasswordRef.current.value) {
            return setError("Contraseña no concuerda")
        }

        try {
            await register(emailRef.current.value, passwordRef.current.value);
            closeForm();
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <>
            <div onClick={openForm} className="btn btn-outline-secondary mx-2">Registro</div>
            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>
                    <Modal.Header>
                        <Modal.Title>Registro</Modal.Title>
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
                        <Form.Group>
                            <Form.Label>Confirmar contraseña</Form.Label>
                            <Form.Control type="password" required ref={cmfPasswordRef}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Registrar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}