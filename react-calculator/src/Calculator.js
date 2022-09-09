import React from "react";
import Display from "./Display"

export default class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: '',
        }
        this.handleClick = this.handleClick.bind(this)
    }

    parsePlus = (expression) => {
        const numbersString = this.split(expression, '+');
        const numbers = numbersString.map(noStr => this.parseMinus(noStr));
        const initialValue = 0.0;
        const result = numbers.reduce((acc, no) => acc + no, initialValue);
        return result
    };

    parseMinus = (expression) => {
        const numbersString = this.split(expression, '-');
        const numbers = numbersString.map(noStr => this.parseMultiplyAndDivide(noStr));
        const initialValue = numbers[0];
        const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
        return result;
    };

    parseMultiplyAndDivide = (expression) => {
        let order = []
        for (const char of expression) {
            if (char === "*" || char === "/") {
                order.push(char)
            }
        }
        const numbersString = this.split(expression, '*', '/');
        const numbers = numbersString.map(noStr => {
            if (noStr[0] == '(') {
                const expr = noStr.substr(1, noStr.length - 2);
                return this.parsePlus(expr);
            }
            return +noStr;
        });
        let result = numbers[0];
        for (const number of numbers.slice(1)) {
            if (order[0] == "*") {
                result *= number
            } else {
                result /= number
            }
            order.shift()
        }
        return result;
    };

    split = (expression, operator, operator2) => {
        const result = [];
        let parenthesis = 0;
        let portion = "";
        for (let i = 0; i < expression.length; ++i) {
            const char = expression[i];
            if (char == '(') {
                parenthesis++;
            } else if (char == ')') {
                parenthesis--;
            }
            if (parenthesis == 0 && (operator == char || operator2 == char)) {
                result.push(portion);
                portion = "";
            } else portion += char;
        }
        if (portion != "") {
            result.push(portion);
        }
        return result;
    };

    evaluate() {
        let answer = this.state.result;
        const result = this.parsePlus(answer);
        if (!Number.isNaN(result)) {
            this.setState({ result: Math.round(result * 1000000000) / (1000000000) })
        } else {
            this.setState({ result: 0 })
            window.alert("oh nooo!")
        }
    }

    handleClick(event) {
        let symbol = event.target.value;
        if (symbol === "c") {
            this.setState({ result: '' })
        } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '/', '+', '-', '.', '(', ')'].includes(symbol)) {
            this.setState({ result: this.state.result += symbol })
        } else if (['^2'].includes(symbol)) {
            this.evaluate()
            this.setState({ result: Math.pow(this.state.result, 2) })
        } else if (['^3'].includes(symbol)) {
            this.evaluate()
            this.setState({ result: Math.pow(this.state.result, 3) })
        } else if (symbol === 'sin') {
            this.evaluate()
            this.setState({ result: Math.round(Math.sin(this.state.result * Math.PI / 180) * 1000000000) / (1000000000) })
        } else if (symbol === 'cos') {
            this.evaluate()
            this.setState({ result: Math.round(Math.cos(this.state.result * Math.PI / 180) * 1000000000) / (1000000000) })
        } else if (symbol === 'tan') {
            this.evaluate()
            this.setState({ result: Math.round(Math.tan(this.state.result * Math.PI / 180) * 1000000000) / (1000000000) })
        } else {
            this.evaluate()
        }
    }

    render() {
        return (
            <div id="calculator">
                <h1>Alisher's Calculator</h1>
                <Display result={this.state.result} />
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
                <div className="row">
                    <button value="(" onClick={this.handleClick}>(</button>
                    <button value=")" onClick={this.handleClick}>)</button>
                    <button value="^2" onClick={this.handleClick}>^2</button>
                    <button value="^3" onClick={this.handleClick}>^3</button>
                </div>
                <div className="row">
                    <button value="sin" onClick={this.handleClick}>sin</button>
                    <button value="cos" onClick={this.handleClick}>cos</button>
                    <button value="tan" onClick={this.handleClick}>tan</button>
                    <button id="equals-button" value="=" onClick={this.handleClick}>=</button>
                </div>
            </div>
        )
    }
}