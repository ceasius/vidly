import React, { Component } from 'react';
import NavBar from './components/navbar';
import Counters from './components/counters';
import './App.css';

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  constructor(props) {
    super(props);
    console.log('App - Constructor');
  }

  componentDidMount() {
    console.log('App - Mounted');
  }

  handleDelete = id => {
    const filter = this.state.counters.filter(count => count.id !== id);
    this.setState({ counters: filter });
  };
  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  render() {
    console.log('App - Rendered');
    const { counters } = this.state;
    return (
      <React.Fragment>
        <NavBar totalCounters={counters.filter(c => c.value > 0).length} />
        <main className="container">
          <Counters
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            counters={counters}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
