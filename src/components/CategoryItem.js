import React, { Component } from 'react';
import './CategoryItem.css'

class CategoryItem extends Component {
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
    console.log(this.props.name);
    return (
      <label className={this.props.selected ? "category-item selected" : "category-item unselected"}>
        <input
          name={this.props.name}
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.handleInputChange} />
          <span class="checkmark"></span>
        {this.props.name}
      </label>
    )
  };
}

export default CategoryItem;