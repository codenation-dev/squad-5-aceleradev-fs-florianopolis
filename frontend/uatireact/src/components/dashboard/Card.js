import React, { Component } from "react";
import './card.css'

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
      title: props.title,
      content: props.children
    };
  }

  onClickHeader = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const content = this.state.expanded ? (
      <div className="card-content">
        {this.state.content}
      </div>
    ) : null;

    const hr = this.state.expanded ? <hr className="card-division" /> : null; 

    const icon = this.state.expanded ? '-' : '+';

    return (
      <div className="card">
        <div className="card-header" onClick={e => this.onClickHeader()}>
          <div className="card-title">{this.state.title}</div>
          <div className="card-icon">{icon}</div>
        </div>
        {hr}
        {content}
      </div>
    );
  }
}

export default Card;
