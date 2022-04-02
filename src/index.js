import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// class Square extends React.Component {
function Square(props) {
    //      constructor(props){  // A constructor can use the super keyword to call the constructor of the super(React.Component class)
    //         //  class. All React component classes that have a constructor should start with a super(props) call.
    //       super(props);
    //       this.state = { 
    // // To “remember” things, components use state. React components can have state by setting this.state in their constructors.
    //           value: null,
    //       }  }
    // render() {
    //     return (
    //         <button className="square"
    //             onClick={() => this.props.onClick()}
    //         // onClick={() => this.setState({value: 'X'})}
    //         >
    //             {this.props.value}
    //         </button>
    //     );
    // }
    return (
        <button className="square" onClick={props.onClick}  >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         XIsNext: true

    //     }
    // }

    renderSquare(i) {  // renderSquare  is a obj method 
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}  //   passing down two props from Board to Square: value and onClick. 
        />; // calling square class 
    }



    render() {

        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner: ' + winner
        // } else {
        //     status = 'Next player: ' + (this.state.XIsNext ? 'Mow' : " Sajib");
        // }



        return (
            <div>
                {/* <div className="status">{status}</div> */}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}

                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            XIsNext: true
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.XIsNext ? 'M' : 'S';  // condition(true) ? exprIfTrue : exprIfFalse if true return x else O 
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            XIsNext: !this.state.XIsNext
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }


    render() {
        const history = this.state.history;
        //    const current = history[history.length -1]
        const current = history[this.state.stepNumber];

        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next player: ' + (this.state.XIsNext ? 'Mow' : " Sajib");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
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

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
// Data Change with Mutation
// var player = {score: 1, name: 'Jeff'};
// player.score = 2;
// // Now player is {score: 2, name: 'Jeff'}
// Data Change without Mutation
// var player = {score: 1, name: 'Jeff'};

// var newPlayer = Object.assign({}, player, {score: 2});
// // Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}
// Or if you are using object spread syntax proposal, you can write:
// var newPlayer = {...player, score: 2};