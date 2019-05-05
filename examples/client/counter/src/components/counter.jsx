import React, { Component } from 'react';

class Counter extends Component {
  state = {
    count: 0
  };
  constructor() {
    super();
  }
  render() {
    return (
      <React.Fragment>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={this.handleIncrement}
          className="btn btn-secondary btn-sm"
        >
          +
        </button>
      </React.Fragment>
    );
  }
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };
  getBadgeClasses() {
    let badges = 'badge m-2 badge-';
    return (badges += this.state.count === 0 ? 'warning' : 'primary');
  }
  formatCount() {
    const { count } = this.state;
    return count === 0 ? 'Zero' : count;
  }
}

export default Counter;
