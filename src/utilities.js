export const findBlank = squares => {
    for (let i = 0; i < squares.length; ++i) {
        if (!squares[i]) return i;
    }
};

const isSolvable = squares => {
    let inversions = 0;
    let blank = findBlank(squares);
    let row = (blank - blank % 4) / 4;
    for (let i = 0; i < squares.length - 1; ++i) {
        for (let j = i + 1; j < squares.length; ++j) {
            // j > i
            if (squares[i] && squares[j] && squares[i] > squares[j]) ++inversions;
        }
    }
    // Since grid width is even
    if (((row ^ inversions) & 1) === 1) return true; // checks for opposite polarity
    return false;
};

const shuffle = squares => {
    for (let i = 0; i < squares.length; ++i) {
        let r = Math.floor(Math.random() * (i + 1));
        [squares[i], squares[r]] = [squares[r], squares[i]];
    }
    return squares;
};

export const setupBoard = () => {
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
};

export const calculateWinner = squares => {
    for (let i = 0; i < squares.length; ++i) {
        if (squares[i] && squares[i] !== (i + 1)) return false;
    }
    return true;
};
