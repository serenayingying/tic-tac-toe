import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 游戏说明: 做一个井字游戏. 双方玩家分别以X和O为棋子, 轮流在九方格中下子. 直到一方有3颗棋子连成一条直线为胜, 游戏结束或重新开始.  

// 玩家每次点击某一方格, 会触发游戏状态的改变. 
//      1. 若方格中有棋子  -->  此格被disbaled,不可重复下子
//      2. 若方格中没有棋子 --> 画上棋子 X / O 
//         1) 判断是否有一方玩家有3颗棋子连成一条线,  if not --> Keep going; or ---> Game over/ Game reset 

// UI上需要一个棋盘组件, 棋盘上有9个方格组件.


// pure Square component used for 1) display the value  2) accept the player's click action.
function Square(props){
    return (
        <button className='square' onClick = {() => props.onClick()}>
            {props.value}
        </button>);
}

// pure Board component  1) render 9 Squares by passing value to Square
class Board extends React.Component{
        renderSquare(i){
            const squares = this.props.squares;
            return <Square value={squares[i]} onClick={() => this.props.onClick(i)} />
        }
        render(){
            return(
                <div className='board'>
                    <div className='board-row'>
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className='board-row'>
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className='board-row'>
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
            );
        }
    }

// impure Game component
class Game extends React.Component{
   constructor(props){
       super(props);
       this.state = {
           squares:Array(9).fill(''),
           current:'X',
           winner:''
       }
       this.gameReset = this.gameReset.bind(this);
       this.handleClick = this.handleClick.bind(this);
   }

   gameReset(){
       this.setState({
           squares: Array(9).fill(''),
           current: 'X',
           winner: ''
       });
   }

   handleClick(i){
       if(this.state.winner) return;
       if(this.state.squares[i]) return;
       let squares = this.state.squares;
       squares[i] = this.state.current;
       this.setState({
            squares: squares,
            current: this.state.current === 'X'? 'O':'X',
            winner: this.computeWinner(squares)
      });

   }

   computeWinner(squares){
       const winLine = [
           [0,1,2],
           [3,4,5],
           [6,7,8],
           [0,3,6],
           [1,4,7],
           [2,5,8],
           [0,4,8],
           [2,4,6]
        ];

        for (let i=0;i<winLine.length;i++){
            const [a,b,c] = winLine[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                return squares[a];
            }
        }
   }

    render(){
            return(
            <div className='game'>
                <div>
                    <span className='winner'>Winner:{this.state.winner}</span>
                    <button onClick={this.gameReset}>reset</button>
                    <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)} />
                </div>
            </div>
            )
    }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
