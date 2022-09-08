import { render } from "@testing-library/react";
import React from "react";

export default class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: '',
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        let symbol  = event.target.value;
        if (symbol === "c") {
            this.setState({result: '' })
        } else if (['0','1','2','3','4','5','6','7','8','9','*','/','+','-','.'].includes(symbol)){
            this.setState({ result: this.state.result+=symbol})
        } else {
            let answer = this.state.result;
            try {
                this.setState({result: eval(answer)})
            } catch {
                this.setState({result: ''})
                window.alert('invalid input :"(')
            }
        }
    }

    render() {
        return (
            <div id="calculator">
                <h1>Alisher's Calculator</h1>
                <div className="result">{this.state.result}</div>
                <div className="row">
                    <button value="7" onClick={this.handleClick}>7</button>
                    <button value="8" onClick={this.handleClick}>8</button>
                    <button value="9" onClick={this.handleClick}>9</button>
                    <button value="+" onClick={this.handleClick}>+</button>
                </div>
                <div className="row">
                    <button value="4" onClick={this.handleClick}>4</button>
                    <button value="5" onClick={this.handleClick}>5</button>
                    <button value="6" onClick={this.handleClick}>6</button>
                    <button value="-" onClick={this.handleClick}>-</button>
                </div>
                <div className="row">
                    <button value="1" onClick={this.handleClick}>1</button>
                    <button value="2" onClick={this.handleClick}>2</button>
                    <button value="3" onClick={this.handleClick}>3</button>
                    <button value="*" onClick={this.handleClick}>*</button>
                </div>
                <div className="row">
                    <button value="0" onClick={this.handleClick}>0</button>
                    <button value="." onClick={this.handleClick}>.</button>
                    <button value="c" onClick={this.handleClick}>c</button>
                    <button value="/" onClick={this.handleClick}>/</button>
                </div>
                <div className="row" id="equals">
                    <button id="equals-button" value="=" onClick={this.handleClick}>=</button>
                </div>
            </div>
        )
    }
}