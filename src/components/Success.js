import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export default function Success(props) {
    const [show, setShow] = useState(true);
    return (
        <Modal
            size="sm"
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Body className="text-center m-2 p-2">
                <h3 className="text-success">Congratulations!</h3>
                <p className="feedback">
                    You won with <span className="font-weight-bold">{props.moves}</span> moves
                    in <span className="font-weight-bold">{props.time}</span> secs
                </p>
                <div className="d-flex justify-content-center mt-1 mb-2">
                    <Button variant="success" onClick={props.reset} className="mr-2">
                        Play again
                    </Button>
                    <Button variant="danger" onClick={() => setShow(false)} className="ml-2">
                        Close
                    </Button>
                </div>
            </Modal.Body>
        </Modal >
    );
}
