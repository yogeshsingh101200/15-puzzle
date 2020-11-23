import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";

export default function Header() {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="game-header card py-3 px-2 mb-2 rounded-lg text-center flex-row">
                <div className="flex-grow-1">15 Puzzle</div>
                <Button
                    variant="dark"
                    className="ml-auto"
                    onClick={() => setShow(true)}
                >
                    <FontAwesomeIcon icon={faInfoCircle} />
                </Button>
            </div >

            <Modal
                size="sm"
                show={show}
                onHide={() => setShow(false)}
                centered
            >
                <Modal.Header closeButton className="p-2">
                    Instruction
                </Modal.Header>
                <Modal.Body className="text-center m-2 p-2">
                    <div className="instructions">
                        Swap blank tile (grey color) with adjacent tile until all tiles are in order (green color).
                    </div>
                </Modal.Body>
            </Modal >
        </>
    );
}
