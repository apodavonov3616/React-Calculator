import { render } from "@testing-library/react";
import React from "react";

export default class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: '',
        }
        this.handleClick = this.handleClick.bind(this)
        this.evaluate = this.evaluate.bind(this)
        this.parsePlusSeparatedExpression = this.parsePlusSeparatedExpression.bind(this)
        this.parseMinusSeparatedExpression = this.parseMinusSeparatedExpression.bind(this)
        this.parseMulitplicationSeparatedExpression = this.parseMultiplicationSeparatedExpression.bind(this)
        this.split = this.split.bind(this)
    }

    parsePlusSeparatedExpression = (expression) => {
        const numbersString = this.split(expression, '+');
        const numbers = numbersString.map(noStr => this.parseMinusSeparatedExpression(noStr));
        const initialValue = 0.0;
        const result = numbers.reduce((acc, no) => acc + no, initialValue);
        return result
    };

    parseMinusSeparatedExpression = (expression) => {
        const numbersString = this.split(expression, '-');
        const numbers = numbersString.map(noStr => this.parseMultiplicationSeparatedExpression(noStr));
        const initialValue = numbers[0];
        const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
        return result;
    };

    // parseDivisionSeparatedExpression = (expression) => {
    //     const numbersString = this.split(expression, '/');
    //     const numbers = numbersString.map(noStr => this.parseMultiplicationSeparatedExpression(noStr));
    //     const initialValue = numbers[0];
    //     const result = numbers.slice(1).reduce((acc, no) => acc / no, initialValue);
    //     return result;
    // };

    parseMultiplicationSeparatedExpression = (expression) => {
        debugger
        let order = []
        for (const char of expression) {
            if (char === "*" || char === "/") {
                order.push(char)
            }
        }
        debugger
        const numbersString = this.split(expression, '*', '/');
        // right now we just split based on * so for each one of these we have to call division
        const numbers = numbersString.map(noStr => {
            if (noStr[0] == '(') {
                const expr = noStr.substr(1, noStr.length - 2);
                // recursive call to the main function
                return this.parsePlusSeparatedExpression(expr);
            }
            return +noStr;
        });
        let result = numbers[0];
        // const reducer = (sum, val) => {
        //     if (order[0] == "*") {
        //         sum *= val
        //     } else {
        //         sum /= val
        //     }
        //     order.shift()
        // }
        // const result = numbers.slice(1).reduce(reducer, initialValue);
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
        let currentChunk = "";
        for (let i = 0; i < expression.length; ++i) {
            const curCh = expression[i];
            if (curCh == '(') {
                braces++;
            } else if (curCh == ')') {
                braces--;
            }
            if (braces == 0 && (operator == curCh || operator2 == curCh)) {
                result.push(currentChunk);
                currentChunk = "";
            } else currentChunk += curCh;
        }
        if (currentChunk != "") {
            result.push(currentChunk);
        }
        return result;
    };

    evaluate() {
        console.log('hi')
        let answer = this.state.result;

        //let's separate by plus first
        const numbersString = this.split(answer, '+')
        const result = this.parsePlusSeparatedExpression(answer, '+');
        this.setState({ result: result })
    }

    handleClick(event) {
        let symbol = event.target.value;
        if (symbol === "c") {
            this.setState({ result: '' })
        } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '/', '+', '-', '.'].includes(symbol)) {
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
                <div className="row" id="equals">
                    <button id="equals-button" value="=" onClick={this.handleClick}>=</button>
                </div>
            </div>
        )
    }
}