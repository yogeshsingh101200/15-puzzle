import React from "react";
import Board from "./Board";
import Header from "./Header";

export default function Game() {
    return (
        <div className="game">
            <Header />
            <div className="game-board">
                <Board />
            </div>
        </div >
    );
}
