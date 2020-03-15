import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const dragSource = DragSource;

const getFieldStyle = (isDragging, selected) => {
  const style = {
    borderStyle: 'dashed',
    borderWidth: 1,
    height: 50,
    margin: 5,
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 5,
  };
  style.backgroundColor = selected ? 'pink' : '#87cefa';
  style.opacity = isDragging ? 0.5 : 1;
  return style;
};

const styles = {
  delete: {
    width: '100%',
    textAlign: 'right',
    marginTop: -37,
    marginRight: 20,
  },
};

const fieldSource = {
  beginDrag(props) {
    let dragFields;
    if (props.selectedFields.find(field => field === props.name)) {
      dragFields = props.selectedFields;
    } else {
      dragFields = [...props.selectedFields, props.name];
    }
    return { fields: dragFields, source: props.selectedSource };
  },
  endDrag(props, monitor) {
    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.addItemsToCart(item.fields, item.source, dropResult);
      props.clearItemSelection();
    }
  },
};

/**
 * Specifies which props to inject into your component.
 */
const collect = (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDragSource: connect.dragSource(),
  // You can ask the monitor about the current drag preview
  connectDragPreview: connect.dragPreview(),
  // You can ask the monitor about the current drag state:
  isDragging: monitor.isDragging(),
});

class Item extends React.Component {
  state = { open: false }

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });

    this.handleRowSelection = this.handleRowSelection.bind(this);
  }

  close = () => this.setState({ open: false });

  showModal = () => this.setState({ open: true });

  closeAndDelete(index) {
    this.props.closeAndDelete(index);
    this.setState({ open: false });
  }

  handleRowSelection(cmdKey, shiftKey, ctrlKey, index) {
    this.props.handleSelection(index, cmdKey, shiftKey, ctrlKey);
  }

  render() {
    const selected = this.props.selectedFields.find(field => this.props.name === field);
    const [id, location] = this.props.name.split(', ');
    const { open } = this.state;

    return this.props.connectDragSource(
        <div
          style={getFieldStyle(false, selected)}
          onClick={(e) => this.handleRowSelection(e.metaKey, e.shiftKey, e.ctrlKey, this.props.index)}
        >
          {id} <br />
          {location}
          <div style={styles.delete}>
            
          <Button icon onClick={this.showModal}><Icon name='trash' /></Button>

            <Modal
              open={open}
              closeIcon
              onClose={this.close}
            >
              <Header icon='archive' content='Удалить систему ЛХ' />
              <Modal.Content>
                <p>
                  Вы уверены что хотите удалить данную систему ЛХ?
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button color='red' onClick={this.close}>
                  <Icon name='remove' /> Нет
                </Button>
                <Button color='green' onClick={() => this.closeAndDelete(this.props.index)}>
                  <Icon name='checkmark' /> Да
                </Button>
              </Modal.Actions>
            </Modal>

          </div>
        </div>);
  }
}

Item.propTypes = {
  selectedSource: PropTypes.string,
  name: PropTypes.string,
  addItemsToCart: PropTypes.func,
  clearItemSelection: PropTypes.func,
  selectedFields: PropTypes.array,
  isDragging: PropTypes.bool,
  connectDragSource: PropTypes.func,
  connectDragPreview: PropTypes.func,
  handleSelection: PropTypes.func,
  index: PropTypes.number,
};

export default dragSource('ITEM', fieldSource, collect)(Item);
