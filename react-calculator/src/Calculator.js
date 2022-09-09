import React from "react";

export default class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: '',
        }
        this.handleClick = this.handleClick.bind(this)
        this.evaluate = this.evaluate.bind(this)
        this.parsePlus = this.parsePlus.bind(this)
        this.parseMinus = this.parseMinus.bind(this)
        this.parseMultiplyAndDivide = this.parseMultiplyAndDivide.bind(this)
        this.split = this.split.bind(this)
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
        debugger
        let order = []
        for (const char of expression) {
            if (char === "*" || char === "/") {
                order.push(char)
            }
        }
        debugger
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
        let braces = 0;
        let portion = "";
        for (let i = 0; i < expression.length; ++i) {
            const char = expression[i];
            if (char == '(') {
                braces++;
            } else if (char == ')') {
                braces--;
            }
            if (braces == 0 && (operator == char || operator2 == char)) {
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
        console.log('hi')
        let answer = this.state.result;
        const result = this.parsePlus(answer, '+');
        this.setState({ result: result })
    }

    handleClick(event) {
        let symbol = event.target.value;
        if (symbol === "c") {
            this.setState({ result: '' })
        } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '/', '+', '-', '.', '(', ')'].includes(symbol)) {
            this.setState({ result: this.state.result += symbol })
        } else {
            try {
                this.evaluate()
            } catch {
                this.setState({ result: '' })
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
                <div className="last-row">
                    <button value="(" onClick={this.handleClick}>(</button>
                    <button value=")" onClick={this.handleClick}>)</button>
                    <button id="equals-button" value="=" onClick={this.handleClick}>=</button>
                </div>
            </div>
        )
    }
}