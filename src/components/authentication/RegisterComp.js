import { Modal, Form, Button } from "react-bootstrap";
import React, { useState } from "react";

export const RegisterComp = () => {
    const [showForm, setShowForm] = useState(false);
    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);
    const submitForm = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div onClick={openForm} className="btn btn-outline-secondary mx-2">Register</div>
            <Modal centered show={showForm} onHide={closeForm}>
                <form onSubmit={submitForm}>
                    <Modal.Header>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" required/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeForm}>
                            Cancel
                        </Button>
                        <Button variant="seconday" type="submit">
                            Register
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}