import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function findBlank(squares) {
    for (let i = 0; i < squares.length; ++i) {
        if (!squares[i]) return i;
    }
}

function isSolvable(squares) {
    let inversions = 0;
    let blank = findBlank(squares);
    let row = (blank - blank % 4) / 4;
    for (let i = 0; i < squares.length - 1; ++i) {
        for (let j = i + 1; j < squares.length; ++j) {
            // j > i
            if (squares[i] && squares[j] && squares[i] > squares[j]) ++inversions;
        }
    }
    console.log(inversions);
    // Since grid width is even
    if ((row & inversions) & 1 === 0) return true; // checks for opposite polarity
    return false;
}

function shuffle(squares) {
    for (let i = 0; i < squares.length; ++i) {
        let r = Math.floor(Math.random() * (i + 1));
        [squares[i], squares[r]] = [squares[r], squares[i]];
    }
    return squares;
}

function setupBoard() {
    let squares = Array(16).fill(0);
    squares.forEach((val, idx) => {
        squares[idx] = idx ? idx : null;
    });
    shuffle(squares);
    if (!isSolvable(squares)) {
        if (squares[0] && squares[1]) {
            [squares[0], squares[1]] = [squares[1], squares[0]];
        } else {
            [squares[2], squares[3]] = [squares[3], squares[2]];
        }
    }
    return squares;
}

function calculateWinner(squares) {
    for (let i = 0; i < squares.length; ++i) {
        if (squares[i] && squares[i] !== (i + 1)) return false;
    }
    return true;
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }

    componentDidMount() {
        console.log("mounted");
        this.timerId = setInterval(() => {
            this.setState(state => ({
                counter: state.counter + 1
            }));
        }, 1000);
    }

    componentWillUnmount() {
        console.log("unmounted");
        clearInterval(this.timerId);
    }

    render() {
        return (
            <div>Timer: {this.state.counter}s</div>
        );
    }
}

class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: setupBoard(),
            moves: 0
        };
    }

    handleClick(i) {
        if (calculateWinner(this.state.squares)) return;
        const squares = this.state.squares.slice();
        let blank = findBlank(squares);
        if (blank === i) return;
        let places = [-1, 1, -4, 4];
        if (places.includes(Math.abs(blank - i))) {

            [squares[i], squares[blank]] = [squares[blank], squares[i]];

            this.setState(state => ({
                squares: squares,
                moves: state.moves + 1
            }));
        }
    }


    reset() {
        this.setState({
            squares: setupBoard(),
            moves: 0
        });
    }


    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => { this.handleClick(i); }}
            />);
    }

    render() {
        let status = "Game on";
        if (calculateWinner(this.state.squares)) {
            status = 'You Won';
        }
        let timer;
        if (this.state.moves > 0) {
            timer = <Timer />;
        } else {
            timer = <div>Timer: paused</div>;
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="info">
                    <div className="timer">{timer}</div>
                    <div className="moves">Moves: {this.state.moves}</div>
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
                    <button onClick={() => { this.reset(); }}>Restart</button>
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
