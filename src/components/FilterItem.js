import React, { Component } from 'react';
import './FilterItem.css'

class FilterItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    }
  }

  handleInputChange = (event) => {
    const checked = this.state.isChecked;
    this.setState({
      isChecked: !checked,
    })

    if(this.state.isChecked === false) {
      this.props.addFilterCallback(event.target.name);
    } else {
      this.props.removeFilterCallback(event.target.name);
    }
  }

  render() {
    return (
      <label className={`category-button ${this.props.type}`}>
        <input
          name={this.props.name}
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.handleInputChange} />
        {this.props.name}
      </label>
    )
  };
}

export default FilterItem;