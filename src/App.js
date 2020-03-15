import React, { Component } from 'react';
import Cart from './Cart'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ItemsDragLayer from './ItemsDragLayer';

const styles = {
  main: {
    width: '100%',
    margin: '0 auto',
    textAlign: 'left',
  },
  header: {
    marginBottom: 5,
    marginTop: 0,
    marginLeft: 10,
  },
  content: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'left',
    alignItems: 'stretch',
    alignContent: 'stretch',
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { leftItems: ["BY.03.28, Сосновец", 
                                "BY.03.29, Сосновец",
                                "BY.03.30, Сосновец",
                                "BY.03.31, Сосновец",
                                "BY.03.32, Сосновец",
                                "BY.03.33, Сосновец",
                                "BY.03.34, Сосновец",
                                "BY.03.35, Сосновец",
                                "BY.03.36, Сосновец",
                                "BY.03.37, Сосновец",
                                "BY.03.38, Сосновец",
                                "BY.03.39, Сосновец",
                                "BY.03.40, Сосновец",
                                "BY.03.41, Сосновец",
                                "BY.03.42, Сосновец",
                              ], 
                   rightItems: [] };
    this.addItemsToCart = this.addItemsToCart.bind(this);  
  }

  addItemsToCart(items, source, dropResult) {
    const leftItems = source === 'left' ? this.state.leftItems.filter(x => items.findIndex(y => x === y) < 0) :
      this.state.leftItems.concat(items);
    const rightItems = source === 'left' ? this.state.rightItems.concat(items) :
      this.state.rightItems.filter(x => items.findIndex(y => x === y) < 0);
    this.setState({ leftItems, rightItems });
  }

  render() {
    return (
      <div style={styles.main}>
        <h2 style={styles.header}>Дым детектор</h2>
        <h4 style={styles.header}>Используйте Shift, Ctrl или Cmd клавишу для мульти-выбора</h4>
        <ItemsDragLayer />
        <div style={styles.content}>
          <Cart id='left' fields={this.state.leftItems} addItemsToCart={this.addItemsToCart} />
          <Cart id='right' fields={this.state.rightItems} addItemsToCart={this.addItemsToCart} />
        </div>
      </div>
    );
  }
}

const dragDropContext = DragDropContext;
export default dragDropContext(HTML5Backend)(App);
