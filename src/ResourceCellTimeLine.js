import React from "react";

class ResourceCellTimeLine extends React.PureComponent {
  render() {
    const {
      data: {
        text,
        data: { languages },
      },
    } = this.props;
    return (
      <div className="dx-template-wrapper">
        <div className="info">
          {text}
          <button>Up</button>
          <button>Down</button>
          <br />
          <b>{languages}</b>
        </div>
      </div>
    );
  }
}

export default ResourceCellTimeLine;

