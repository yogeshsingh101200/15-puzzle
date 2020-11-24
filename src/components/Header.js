import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";

export default function Header() {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="game-header card py-3 px-2 mb-2 rounded-lg text-center">
                <div>
                    15 Puzzle <FontAwesomeIcon className="instructions-toggler ml-2" icon={faInfoCircle} onClick={() => setShow(true)} />
                </div>
            </div>

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
                        <li>Click on a tile next to blank tile to swap it with blank tile.</li>
                        <li>Swap blank tile with adjacent tile until all tiles are in order.</li>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
