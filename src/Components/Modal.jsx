import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function MyModal() {
    const [show, setShow] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 1000);
        // clear timer if the component unmount
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Button onClick={handleOpen}>Open modal</Button>

            <Modal
                show={show}
                onHide={handleClose}
                open={open}
                onClose={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
