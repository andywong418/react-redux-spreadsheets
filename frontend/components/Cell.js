import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      editing: false,
      clicked: false,
      doubleClicker: false,
      timer: 0,
      delay: 200,
      prevent: false,
      selected: false
    }

    this.handleUnselectAll = this.handleUnselectAll.bind(this);
    this.hasNewValue = this.hasNewValue.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.emitUnselectEvent = this.emitUnselectEvent.bind(this);
    // this.clicked = this.clicked.bind(this);
  }

  componentDidMount() {
    window.document.addEventListener('unselectAll', this.handleUnselectAll);
    if(this.props.currentSelected) {
      this.setState({selected: true, editing: true});
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener('unselectAll', this.handleUnselectAll);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.corner && nextProps.currentSelected) {
      this.setState({selected: true, editing: true});
    }
  }

  onChange(e) {
    this.setState({ value: e.target.value })
  }

  onKeyPressOnInput(e) {
    if (e.key === 'Enter') {
      this.hasNewValue(e.target.value)
    }

  }
  onSelectedKeyPress(e) {
    if(this.state.selected && !this.state.editing) {
      this.setState({value: ''});
      this.setState({editing: true});
    }
  }

  onKeyDownOnInput(e) {
    const row = this.props.row;
    const column = this.props.column;
    const maxRows = this.props.maxRows;
    const maxColumns = this.props.maxColumns;
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      this.emitUnselectEvent();
    }

    if(e.key === 'ArrowUp') {
      //up
      if(row - 1 > 0) {
        this.props.updateCurrentSelected(row-1, column);
      }
    } else if(e.key === 'ArrowDown') {
      //down
      if(row+1 <= maxRows) {
        this.props.updateCurrentSelected(row+1, column);
      }
    } else if(e.key === 'ArrowLeft') {
      //left
      if(column -1 > 0) {
        this.props.updateCurrentSelected(row, column - 1);
      }
    } else if (e.key === 'ArrowRight') {
      //right
      if(column + 1 <= maxColumns) {
        this.props.updateCurrentSelected(row, column + 1);
      }
    }
  }

  hasNewValue(value) {
    this.props.updateCell(value, this.props.row, this.props.column);
    this.setState({editing: false});
  }

  emitUnselectEvent() {
    const unselectEvent = new Event('unselectAll');
    window.document.dispatchEvent(unselectEvent);
  }

  clicked(e) {
    this.timer = setTimeout(() => {
      if(!this.prevent) {
        this.emitUnselectEvent();
        this.setState({selected: true});
      }
      // this.prevent = false;
    }, 200);
  }

  doubleClicked() {
    clearTimeout(this.state.timer);
    this.prevent = true;
    // Unselect all the other cells and set the current
    // Cell state to `selected` & `editing`
    this.emitUnselectEvent()
    this.setState({ editing: true, selected: true });
  }

  onBlur(e) {
    this.hasNewValue(e.target.value);
    this.prevent = false;
  }
  /**
 * Used by `componentDid(Un)Mount`, handles the `unselectAll`
 * event response
 */
  handleUnselectAll() {
    if (this.state.selected || this.state.editing) {
      this.setState({ selected: false, editing: false })
    }
  }

  calculateCss() {
    const css = {
      width: '80px',
      padding: '4px',
      margin: '0',
      height: '25px',
      boxSizing: 'border-box',
      border: '1px solid #cacaca',
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      textAlign: 'left',
      verticalAlign: 'top',
      fontSize: '14px',
      overflow: 'hidden',
      fontFamily: 'calibri'
    }

    if (this.props.corner) {
      css.textAlign = 'center'
      css.backgroundColor = '#f0f0f0'
      css.fontWeight = 'bold'
    }

    if(this.props.row === 0 || this.props.column === 0) {
      css.textAlign = 'center';
      css.textTransform = 'uppercase';
    }
    if(this.state.selected && !this.state.editing) {
      css.outline = 'None';
    }
    return css;
  }

  render() {
    const css = this.calculateCss();

    if(this.props.column === 0) {
      return (
        <span style={css}>
          {this.props.row}
        </span>
      )
    }

    if(this.props.row === 0) {
      const alpha = ' abcdefghijklmnopqrstuvwxyz'.split('');
      return (
        <span style={css}>
          {alpha[this.props.column]}
        </span>
      )
    }

    if (this.state.selected) {
      css.border= '2px solid #0984e3';
    }

    if(this.state.editing) {
      return (
        <input
        style={css}
          type="text"
          onBlur={e => this.onBlur(e)}
          onKeyPress={e => this.onKeyPressOnInput(e)}
          onKeyDown = {e => this.onKeyDownOnInput(e)}
          value={this.state.value}
          onChange={e => this.onChange(e)}
          autoFocus
        />
      )
    }

    return (
      <span
      onClick = {e => this.clicked(e)}
      onDoubleClick={e => this.doubleClicked(e)}
      style={css}
      onKeyPress={e => this.onSelectedKeyPress(e)}
      onKeyDown= {e => this.onKeyDownOnInput(e)}
      tabIndex="0"
      >
        {this.state.value}
      </span>
    )
  }



}
