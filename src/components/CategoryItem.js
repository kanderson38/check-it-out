import React, { Component } from 'react';
import './CategoryItem.css'

class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.selected,
    }
  }

  handleInputChange = (event) => {
    const checked = this.state.isChecked;
    this.setState({
      isChecked: !checked,
    })

    
  }

  render() {
    return (
      <label className={this.state.isChecked ? "category-item selected" : (this.state.hidden ? "category-item hidden" : "category-item unselected")}>
        <input
          name={this.props.name}
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.handleInputChange} />
          <span className={this.props.editing ? "checkmark" : "checkmark hidden"}></span>
        {this.props.name}
      </label>
    )
  };
}

export default CategoryItem;