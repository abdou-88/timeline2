import React from "react";
import Tooltip from "devextreme-react/tooltip";

import "devextreme/dist/css/dx.light.css";


class TooltipCom extends React.Component {
  render() {
    return (
      <>
        <Tooltip ref={this.toolTip} position="top" closeOnOutsideClick={true}>
          <div>
            <button
              onClick={this.handleCreateBtnClick}
              className="dx-Abitooptip-button"
            >
              Create
            </button>{" "}
            Shift{" "}
            <input placeholder="14-22" className="dx-Abitooptip-input"></input>{" "}
            For{" "}
            <input
              defaultValue={5}
              type="number"
              className="dx-Abitooptip-inputNum"
            ></input>{" "}
            Days
          </div>
        </Tooltip>
      </>
    );
  }
}

export default TooltipCom;
