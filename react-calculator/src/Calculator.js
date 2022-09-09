import React from "react";
import Display from "./Display"
import Button from "./Button"

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
            if (noStr[0] === '(') {
                const expr = noStr.substr(1, noStr.length - 2);
                return this.parsePlus(expr);
            }
            return +noStr;
        });
        let result = numbers[0];
        for (const number of numbers.slice(1)) {
            if (order[0] === "*") {
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
            if (char === '(') {
                parenthesis++;
            } else if (char === ')') {
                parenthesis--;
            }
            if (parenthesis === 0 && (operator === char || operator2 === char)) {
                result.push(portion);
                portion = "";
            } else portion += char;
        }
        if (portion !== "") {
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
            this.setState({ result: '' })
            window.alert("OH NO! CANNOT COMPUTE ⊙▂⊙")
        }
    }

    handleClick(event) {
        let symbol = event.target.value;
        if (symbol === "c") {
            this.setState({ result: '' })
        } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '/', '+', '-', '.', '(', ')'].includes(symbol)) {
            this.setState({ result: this.state.result += symbol })
        } else {
            this.evaluate()
            if (['^2', '^3'].includes(symbol)) {
                this.setState({ result: Math.pow(this.state.result, 2) })
            } else if (symbol === 'sin') {
                this.setState({ result: Math.round(Math.sin(this.state.result * Math.PI / 180) * 1000000000) / (1000000000) })
            } else if (symbol === 'cos') {
                this.setState({ result: Math.round(Math.cos(this.state.result * Math.PI / 180) * 1000000000) / (1000000000) })
            } else if (symbol === 'tan') {
                this.setState({ result: Math.round(Math.tan(this.state.result * Math.PI / 180) * 1000000000) / (1000000000) })
            }
        }
    }

    render() {
        return (
            <div id="calculator">
                <h1>Alisher's Calculator</h1>
                <Display result={this.state.result} />
                <div className="row">
                    <Button value="7" label="7" onClick={this.handleClick} color="beige" />
                    <Button value="8" label="8" onClick={this.handleClick} color="beige" />
                    <Button value="9" label="9" onClick={this.handleClick} color="beige" />
                    <Button value="+" label="+" onClick={this.handleClick} color="beige" />
                </div>
                <div className="row">
                    <Button value="4" label="4" onClick={this.handleClick} color="beige" />
                    <Button value="5" label="5" onClick={this.handleClick} color="beige" />
                    <Button value="6" label="6" onClick={this.handleClick} color="beige" />
                    <Button value="-" label="-" onClick={this.handleClick} color="beige" />
                </div>
                <div className="row">
                    <Button value="1" label="1" onClick={this.handleClick} color="beige" />
                    <Button value="2" label="2" onClick={this.handleClick} color="beige" />
                    <Button value="3" label="3" onClick={this.handleClick} color="beige" />
                    <Button value="*" label="*" onClick={this.handleClick} color="beige" />
                </div>
                <div className="row">
                    <Button value="0" label="0" onClick={this.handleClick} color="beige" />
                    <Button value="(" label="(" onClick={this.handleClick} color="beige" />
                    <Button value=")" label=")" onClick={this.handleClick} color="beige" />
                    <Button value="/" label="/" onClick={this.handleClick} color="beige" />
                </div>
                <div className="row">
                    <Button value="." label="." onClick={this.handleClick} color="beige" />
                    <Button value="c" label="C" onClick={this.handleClick} color="pink" />
                    <Button value="^2" label="^2" onClick={this.handleClick} color="pink" />
                    <Button value="^3" label="^3" onClick={this.handleClick} color="pink" />
                </div>
                <div className="row">
                    <Button value="sin" label="sin" onClick={this.handleClick} color="pink" />
                    <Button value="cos" label="cos" onClick={this.handleClick} color="pink" />
                    <Button value="tan" label="tan" onClick={this.handleClick} color="pink" />
                    <Button value="=" label="=" onClick={this.handleClick} color="red" />
                </div>
            </div>
        )
    }
}