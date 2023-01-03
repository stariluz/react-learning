import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//Class Component
// class Square extends React.Component {
//   render() {
//     ...
//   }
// }

//Function Component
function Square(props) {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
  
}

class Board extends React.Component {
  renderSquare(i,j) {
    return(
      <Square
        key={"SQUARE-"+i+"-"+j}
        value={this.props.squares[i][j]}
        onClick={()=>this.props.onClick(i,j)}
      />
    );
  }

  render() {
    const squaresRows=this.props.squares.map((row,i)=>{
      console.log(row);
      return (
      <div className="board-row" key={"row-"+i}>
      {row.map((col,j)=>{
          return this.renderSquare(i,j);
        })}
      </div>
      );
    });
    return squaresRows;
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      history:[{
        squares: Array(3).fill(Array(3).fill(null)),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
    console.log(this.state);
  }
  handleClick(i,j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current=history[history.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i][j]!= null){
      return;
    }
    console.log("BEFORE:",history);
    squares[i][j] = this.state.xIsNext?'X':'O';
    console.log("UPDATE:",history);
    this.setState({
      history: [...history,{
        squares: squares,
      }],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step%2)===0,
    })
  }
  getHistoryStepElement(move, description){
    return (
      <li key={move}>
        <button
          className={
            "history-step" + (move===this.state.stepNumber? " history-step--selected": "")
          }
          onClick={()=>this.jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    const moves=history.map(
      (step, move)=>
      {
        const description = move?
          'Go to move #' + move :
          'Go to game start';

        return this.getHistoryStepElement(move, description);
      }
    );
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i,j) => this.handleClick(i,j)}
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);


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
  for(let i=0; i<lines.length; i++){
    const [a,b,c]=lines[i];
    const ay=a/3, ax=a%3;
    const by=b/3, bx=b%3;
    const cy=c/3, cx=c%3;
    if (squares[ax][ay] && squares[ax][ay]===squares[bx][by] && squares[ax][ay]===squares[cx][cy]){
      return squares[ax][ay];
    }
  }
  return null;
}