import React, { Component } from 'react';
import './hangman.css';
import './name';
import h0 from './images/h0.png';
import h1 from './images/h1.png';
import h2 from './images/h2.png';
import h3 from './images/h3.png';
import h4 from './images/h4.png';
import h5 from './images/h5.png';
import h6 from './images/h6.png';
import { randomName } from './name';
import Button from 'react-bootstrap/Button';
class Hangman extends Component{
    static defaultProps={
        triesLeft: 6,
        images: [h0, h1, h2, h3, h4, h5, h6]
    }
    constructor(props){
        super(props);
        this.state={
            mistake: 0,
            guessed: new Set([]),
            answer: randomName()
        }
    }
    resetButton = () => {
        this.setState({
          mistake: 0,
          guessed: new Set([]),
          answer: randomName()
        });
      }
    handleGuess= e => {
        console.log(this.state.answer);
        let letter=e.target.value;
        this.setState(st => ({
            guessed: st.guessed.add(letter),
            mistake: st.mistake+(st.answer.includes(letter) ? 0 : 1)
        }));
    }
    generateButtons(){
        return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
            <Button variant={(!(this.state.guessed.has(letter)) ? "primary" : "secondary")}
            disabled={this.state.guessed.has(letter)}
            onClick={this.handleGuess}
            key={letter}
            value={letter}
            size="lg"
            >{letter}</Button>
        ));
    }
    guessedWord(){
        return this.state.answer.split("").map(letter => this.state.guessed.has(letter.toLowerCase()) ? letter : " _ ");
    }
    render(){
        const gameOver=this.state.mistake>=this.props.triesLeft;
        const isWinner = this.guessedWord().join("") === this.state.answer;
        let gameStat = this.generateButtons();
        if (isWinner) {
            gameStat = "You Won!!!"
        }
        if (gameOver) {
            gameStat = "You Lost!!!"
        }
        return (
            <div>
                <h1>Marvel Character Hangman</h1>
                <div id="tries" className="float-right">Incorrect guesses: {this.state.mistake}</div>
                <div className="text-center">
                    <p id="word">{gameOver ? this.state.answer:this.guessedWord()}</p>
                    <p>{gameStat}</p>
                    </div>
                <div className="text-center">
                    <img src={this.props.images[this.state.mistake]} alt=""/>
                </div>
                <button className='btn btn-info' onClick={this.resetButton}>Restart</button>
            </div>
        );
    }
}
export default Hangman;