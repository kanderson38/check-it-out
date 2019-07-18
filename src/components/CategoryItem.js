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
    if (this.props.editing) {
    const checked = this.state.isChecked;
    this.setState({
      isChecked: !checked,
    })

  this.props.updateSelectedCategoriesCallback(event.target.name, checked);
  }
  }

  render() {
    return (
      <div className={this.props.hidden ? "hidden" : ""}>
        <label className={this.state.isChecked ? "category-item selected" : "category-item unselected"}>
          <input
            name={this.props.name}
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.handleInputChange} />
          <span className={this.props.editing ? "checkmark" : "checkmark hidden"}></span>
          {this.props.name}
        </label>
      </div>
    )
  };
}

export default CategoryItem;