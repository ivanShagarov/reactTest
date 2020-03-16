import React, { Component } from 'react';
import Cart from './Cart'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import ItemsDragLayer from './ItemsDragLayer';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

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
    marginTop: 10,
  },
  addCamera: {
    marginBottom: 10,
    marginLeft: 10,
    display: 'inline',
  },
  addDetector: {
    marginBottom: 10,
    marginLeft: 70,
    display: 'inline',
  },
  label: {
    marginRight: 10,
    marginLeft: 10,
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  
                    leftItems: ["BY.03.28, Сосновец", 
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
                    rightItems: ["Detector 1", ],
                    open: false,
                    openAddDetector: false
                  };

    this.addItemsToCart = this.addItemsToCart.bind(this);  
  }

  close = () => this.setState({ open: false });
  showModal = () => this.setState({ open: true });

  closeAddDetector = () => this.setState({ openAddDetector: false });
  showAddDetectorModal = () => this.setState({ openAddDetector: true });

  closeAndAddCamera(id, location) {
    if(id && location) {
      let leftItems = [...this.state.leftItems];
      leftItems.unshift(id + ", " + location);
      this.setState({ leftItems: leftItems });      
    }
    this.setState({ open: false });
  }

  closeAndAddDetector(detector) {
    if(detector) {
      let rightItems = [...this.state.rightItems];
      rightItems.push(detector);
      this.setState({ rightItems: rightItems });      
    }
    this.setState({ openAddDetector: false });
  }

  addItemsToCart(items, source, dropResult) {
    const leftItems = source === 'left' ? this.state.leftItems.filter(x => items.findIndex(y => x === y) < 0) :
      this.state.leftItems.concat(items);
    const rightItems = source === 'left' ? this.state.rightItems.concat(items) :
      this.state.rightItems.filter(x => items.findIndex(y => x === y) < 0);
    this.setState({ leftItems, rightItems });
  }

  render() {
    const { open, openAddDetector } = this.state;

    return (
      <div style={styles.main}>
        <h2 style={styles.header}>Дым детектор</h2>
        <h4 style={styles.header}>Используйте Shift, Ctrl или Cmd клавишу для мульти-выбора</h4>

        <div style={styles.addCamera}>
          <Button icon onClick={this.showModal}>Добавить систему ЛХ <Icon name='add' /></Button>
          <Modal open={open} closeIcon onClose={this.close}>
            <Header icon='archive' content='Добавить систему ЛХ' />
            <Modal.Content>
              <form id="addCameraForm">
                <label style={styles.label} htmlFor="cameraId">ID камеры </label>
                <input type="text" name="cameraId" id="cameraId" />
                <label style={styles.label} htmlFor="location">Локация</label>
                <input type="text" name="location" id="location" />
              </form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={this.close}>
                <Icon name='remove' /> Отмена
              </Button>
              <Button color='green' onClick={() => this.closeAndAddCamera(
                  document.getElementById("addCameraForm").elements["cameraId"].value, 
                  document.getElementById("addCameraForm").elements["location"].value
                )}
              >
                <Icon name='checkmark' /> Добавить
              </Button>
            </Modal.Actions>
          </Modal>
        </div>

        <div style={styles.addDetector}>
          <Button icon onClick={this.showAddDetectorModal}>Добавить детектор <Icon name='add' /></Button>
          <Modal open={openAddDetector} closeIcon onClose={this.closeAddDetector}>
            <Header icon='archive' content='Добавить детектор' />
            <Modal.Content>
              <form id="addDetectorForm">
                <label style={styles.label} htmlFor="cameraId">Детектор</label>
                <input type="text" name="detector" id="detector" />
              </form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={this.closeAddDetector}>
                <Icon name='remove' /> Отмена
              </Button>
              <Button color='green' onClick={() => this.closeAndAddDetector(
                  document.getElementById("addDetectorForm").elements["detector"].value
                )}
              >
                <Icon name='checkmark' /> Добавить
              </Button>
            </Modal.Actions>
          </Modal>
        </div>

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
