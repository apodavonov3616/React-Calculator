import React from 'react';

class Button extends React.Component {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                value={this.props.value}>
                {this.props.label}
            </button>
        );
    }
}

export default Button;