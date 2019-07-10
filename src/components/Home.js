import React, {Component} from 'react'
import './Home.css';


class Home extends Component {
  render () {
    console.log(this.props.match)

  return (
    <div>
      Home Page
    </div>
  )}
}

export default Home;