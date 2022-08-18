import React from "react";

class ResourceCell extends React.PureComponent {
  render() {
    const {
      data: {
        color,
        text,
        data: { avatar, email, languages },
      },
    } = this.props;
    return (
      <div className="dx-template-wrapper">
        <div className="name" style={{ background: color }}>
          <h2>{text}</h2>
        </div>
        <div className="avatar">
          <img alt="" src={avatar} />
        </div>
        <div className="info" style={{ color }}>
          {email}
          <br />
          <b>{languages}</b>
        </div>
      </div>
    );
  }
}

export default ResourceCell;

