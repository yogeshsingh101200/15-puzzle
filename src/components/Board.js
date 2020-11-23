import React, { Component } from 'react';
import { findBlank, setupBoard, calculateWinner } from "../utilities";
import Square from "./Square";
import Success from "./Success";


export class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: setupBoard(),
            moves: 0,
            seconds: 0
        };
    }

    handleClick(i) {
        if (calculateWinner(this.state.squares)) return;
        const squares = this.state.squares.slice();
        let blank = findBlank(squares);
        if (blank === i) return;

        if (this.state.moves === 0) {
            this.timerId = setInterval(() => {
                this.setState(state => ({
                    seconds: state.seconds + 1
                }));
            }, 1000);
        }

        let places = [-1, 1, -4, 4];
        if (places.includes(Math.abs(blank - i))) {

            [squares[i], squares[blank]] = [squares[blank], squares[i]];

            this.setState(state => ({
                squares: squares,
                moves: state.moves + 1
            }));
        }
    }


    reset = () => {
        this.setState({
            squares: setupBoard(),
            moves: 0,
            seconds: 0
        });
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    };


    renderSquare(i) {
        if ((this.state.squares[i] === i + 1) || (!this.state.squares[i] && i === 15)) {
            return (
                <Square
                    value={this.state.squares[i]}
                    correct={true}
                    onClick={() => { this.handleClick(i); }}
                />);
        } else {
            return (
                <Square
                    value={this.state.squares[i]}
                    correct={false}
                    onClick={() => { this.handleClick(i); }}
                />);
        }
    }

    render() {
        let won = false;
        if (calculateWinner(this.state.squares)) {
            won = true;
            clearInterval(this.timerId);
        }

        return (
            <div>
                {won ? <Success
                    reset={this.reset}
                    moves={this.state.moves}
                    time={this.state.seconds}
                /> : null}
                <div className="info">
                    <div className="timer card bg-warning p-3 text-center w-100 font-weight-bold">Time: {this.state.seconds}s</div>
                    <div className="moves card bg-warning p-3 text-center w-100 font-weight-bold">Moves: {this.state.moves}</div>
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                </div>
                <div className="board-row">
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                </div>
                <div className="board-row">
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                </div>
                <div className="option">
                    <button
                        className="btn btn-danger btn-block"
                        onClick={this.reset}
                        style={{ fontSize: "1.25rem" }}
                    >Restart</button>
                </div>
            </div>
        );
    }
}

export default Board;
