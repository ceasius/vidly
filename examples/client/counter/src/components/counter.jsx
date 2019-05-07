import React, { Component } from 'react';

class Counter extends Component {
  state = {};
  render() {
    const { onIncrement, onDelete, counter } = this.props;
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => onIncrement(counter)}
          className="btn btn-secondary btn-sm"
        >
          +
        </button>
        <button
          onClick={() => onDelete(counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let badges = 'badge m-2 badge-';
    return (badges += this.props.counter.value === 0 ? 'warning' : 'primary');
  }
  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? 'Zero' : value;
  }
}

export default Counter;
