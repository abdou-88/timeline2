import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowUp,
  faCircleArrowDown,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
class ResourceCellTimeLine extends React.PureComponent {
  render() {
    const {
      data: {
        text,
        data: { languages },
      },
    } = this.props;
    return (
      <div className="dx-template-wrapper" style={{ width: "100%" }}>
        <div style={{ position: "absolute",  top: 0, right: 0 }}>
          <FontAwesomeIcon style={{ padding: "3px",color: "green", cursor: "pointer" }} icon={faCircleArrowUp} />
          <FontAwesomeIcon style={{ padding: "3px",color: "red", cursor: "pointer" }} icon={faCircleArrowDown} />
          <FontAwesomeIcon style={{ padding: "3px",color: "blue", cursor: "pointer" }} icon={faTrashCan} />
        </div>
        <div className="info">
          {text}

          <br />
          <b>{languages}</b>
        </div>
      </div>
    );
  }
}

export default ResourceCellTimeLine;

