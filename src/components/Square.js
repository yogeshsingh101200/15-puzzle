import React from 'react';

export default function Square(props) {
    if (!props.value && !props.correct) {
        return (
            <button
                className="square btn btn-secondary"
                onClick={props.onClick}
            >
                {props.value}
            </button>
        );
    } else if (props.correct) {
        return (
            <button
                className="square btn btn-success"
                onClick={props.onClick}
            >
                {props.value}
            </button>
        );
    } else {
        return (
            <button
                className="square btn btn-dark"
                onClick={props.onClick}
            >
                {props.value}
            </button>
        );
    }
}
