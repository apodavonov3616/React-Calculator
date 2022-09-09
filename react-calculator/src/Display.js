import React from "react";

export default class Display extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { result } = this.props;
        return (
            <div className="result">
                {result}
            </div>
        )
    }
}