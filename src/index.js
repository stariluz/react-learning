import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
      className={"square " + (props.isSquareWinner?"square--winner":"")}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
  
}

class Board extends React.Component {
  renderSquare(i,isSquareWinner) {
    return(
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={()=>this.props.onClick(i)}
        isSquareWinner={isSquareWinner}
      />
    );
  }

  render() {
    let squaresRows=Array(3).fill(Array(3).fill(null));
    
    const winnerSquares=this.props.winnerSquares;
    if(winnerSquares){
      squaresRows=squaresRows.map(
        (row,i)=>{
          return(
            <div className="board-row" key={i}>
            {
              row.map((value,j)=>{
                let isSquareWinner=false;
                let x=i*3+j;
                if(winnerSquares.includes(x)){
                  isSquareWinner=true;
                }
                return this.renderSquare(x,isSquareWinner);
              })
            }
            </div>
          );
        }
      );
    }
    else
    {
      squaresRows=squaresRows.map((row,i)=>{
        return(
          <div className="board-row" key={i}>
          {
            row.map((value,j)=>{
              let x=i*3+j;
              return this.renderSquare(x,false);
            })
          }
          </div>
        );
      });
    }
    return squaresRows;
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      history:[{
        squares: Array(9).fill(null),
        lastMove: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      isDescendingOrder: false,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current=history[history.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]!= null){
      return;
    }
    squares[i] = this.state.xIsNext?'X':'O';
    this.setState({
      history: [...history,{
        squares: squares,
        lastMove: i,
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
  getHistoryStepElement(moveIndex, description){
    return (
      <li key={moveIndex}>
        <button
          className={
            "history-step" + (moveIndex===this.state.stepNumber? " history-step--selected": "")
          }
          onClick={()=>this.jumpTo(moveIndex)}
        >
          {description}
        </button>
      </li>
    );
  }
  onToogleOrder(){
    this.setState({
      isDescendingOrder: !this.state.isDescendingOrder,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const isWinnerAlready = calculateWinner(current.squares);

    let status;
    if (isWinnerAlready) {
      status = 'Winner: ' + isWinnerAlready.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    let moves=history.map(
      (step, moveIndex)=>
      {
        const description = moveIndex?
          `Go to move #${moveIndex} - ${(moveIndex%2)===0?'O':'X'}: (${Math.floor(step.lastMove/3+1)},${step.lastMove%3+1})`:
          'Go to game start';

        return this.getHistoryStepElement(moveIndex, description);
      }
    );
    let isDescendingOrder=this.state.isDescendingOrder;
    if(isDescendingOrder){
      moves.reverse();
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winnerSquares={isWinnerAlready? isWinnerAlready.squares : null}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={() => this.onToogleOrder()}>
              Sort results <i className={"bi bi-sort-numeric-"+(isDescendingOrder?"up":"down")}></i>
            </button>
          </div>
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
    if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return {
        winner: squares[a],
        squares: [a,b,c],
      };
    }
  }
  return null;
}