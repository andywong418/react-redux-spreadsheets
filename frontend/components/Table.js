import React from 'react';
import Cell from './Cell';
import {connect} from 'react-redux';
import {updateCell, updateCurrentSelected} from '../actions/index';

class Table extends React.Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = {
      currentSelected: [1, 1]
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextprops", nextProps);
    this.setState({currentSelected: nextProps.currentSelected});
  }
  render() {
    const table = [];
    const width = this.props.data[0].length;
    const height = this.props.data.length;
    const data = this.props.data;
    for(let y = 0; y < height; y++) {
      let row = []
      for(let x = 0; x < width; x++) {
        if(x===0 && y===0) {
          row.push(
            <Cell
            column={x}
            row={y}
            key='00'
            corner={true}

            />
          );
        } else{
          let currentSelected = false;
          if(this.state.currentSelected[0] === y && this.state.currentSelected[1] === x) {
            currentSelected = true;
          }
          console.log("currentSelected", currentSelected);
          row.push(
            <Cell
              column={x}
              row = {y}
              updateCell= {this.props.updateCell}
              key={x.toString() + y.toString()}
              value={data[y][x]}
              currentSelected={currentSelected}
              updateCurrentSelected = {this.props.updateCurrentSelected}
              maxRows={height}
              maxColumns= {width}
            />
          )
        }
      }
      table.push(<div key={y}>{row}</div>);
    }

    return(
      <div>
        {table}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        name: state.rootReducer.name,
        data: state.dataReducer.data,
        currentSelected: state.dataReducer.currentSelected
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      updateCell: (newValue, row, column) => dispatch(updateCell(newValue, row, column)),
      updateCurrentSelected: (newRow, newColumn) => dispatch(updateCurrentSelected(newRow, newColumn))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Table);
