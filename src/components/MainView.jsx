import React from "react";

import "devextreme/dist/css/dx.light.css";

import Scheduler, { Resource } from "devextreme-react/scheduler";
import ContextMenu from "devextreme-react/context-menu";
import Tooltip  from "devextreme-react/tooltip";
import { data, employees, shiftTypeData } from "../data.js";
import DataCell from "../DataCell.js";
import ResourceCellTimeLine from "../ResourceCellTimeLine.js";
import ResourceCell from "../ResourceCell.js";


import { ShiftMenuTemplate } from "../ShiftMenuTemplate.js";


const appointmentClassName = ".dx-scheduler-appointment";
const cellClassName = ".dx-scheduler-date-table-cell";



const views = [
  { type: "timelineMonth", name: "Full" },
  { type: "month", name: "Individual" },
];

const groups = ["employeeID"];




class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.scheduler = React.createRef();
    this.toolTip = React.createRef();
    this.state = {
      newAppointment: {
        text: "14-22",
        employeeID: 0,
        resID: 0,
        allDay: true,
        startDate: new Date(),
        endDate: new Date(),
      },
      tooltipNumDay : 5,
      currentDate: new Date(),
      contextMenuItems: [],
      target: appointmentClassName,
      disabled: true,
      resCell: ResourceCellTimeLine,
    };
    this.onAppointmentContextMenu = this.onAppointmentContextMenu.bind(this);
    this.onContextMenuItemClick = this.onContextMenuItemClick.bind(this);
    this.onCellContextMenu = this.onCellContextMenu.bind(this);
    this.onContentReady = this.onContentReady.bind(this);
  }

  componentDidMount() {
    var selectList = document.createElement("select");
    selectList.className = "analysts-select-header";
    selectList.id = "analystNames";

    //Create and append the options
    employees.forEach((employe) => {
      var option = document.createElement("option");
      option.value = employe.text;
      option.text = employe.text;
      selectList.appendChild(option);
    });
    var element = document.getElementsByClassName(
      "dx-scheduler-header-panel-empty-cell"
    );
 
    element[0].appendChild(selectList);
    
  }

  render() {
    const { currentDate, contextMenuItems, target, disabled, resCell } =
      this.state;
    return (
      <div>
        <Scheduler
          ref={this.scheduler}
          timeZone="America/Los_Angeles"
          dataSource={data}
          views={views}
          groups={groups}
          showAllDayPanel={true}
          defaultCurrentView="timelineMonth"
          dataCellComponent={DataCell}
          resourceCellComponent={resCell}
          defaultCurrentDate={currentDate}
          focusStateEnabled={true}
          height={"auto"}
          cellDuration={60}
          firstDayOfWeek={0}
          crossScrollingEnabled={true}
          //recurrenceEditMode="series"
          onAppointmentContextMenu={this.onAppointmentContextMenu}
          onCellContextMenu={this.onCellContextMenu}
          onOptionChanged={this.handlePropertyChange}
          onAppointmentClick={this.onAppointmentClick}
          onCellClick={this.onCellClick}
          onContentReady={this.onContentReady}
        >
          <Resource
            label="employee"
            fieldExpr="employeeID"
            dataSource={employees}
            allowMultiple={false}
          />
          <Resource
            label="shiftTypeData"
            fieldExpr="resID"
            dataSource={shiftTypeData}
            allowMultiple={false}
            useColorAsDefault={true}
          />
        </Scheduler>
        {/* ///////////////////// */}
        <Tooltip ref={this.toolTip} position="top" closeOnOutsideClick={true}>
          <div>
            <button
              onClick={this.handleCreateBtnClick}
              className="dx-Abitooptip-button"
            >
              Create
            </button>{" "}
            Shift{" "}
            <input
              onChange={this.handleShiftInput}
              defaultValue="14-22"
              className="dx-Abitooptip-input"
            ></input>{" "}
            For{" "}
            <input
              onChange={this.handleDayNumInput}
              defaultValue={5}
              type="number"
              className="dx-Abitooptip-inputNum"
            ></input>{" "}
            Days
          </div>
        </Tooltip>
        {/* //////////// */}
        <ContextMenu
          dataSource={contextMenuItems}
          width={200}
          target={target}
          disabled={disabled}
          onItemClick={this.onContextMenuItemClick}
          itemRender={ShiftMenuTemplate}
        />
      </div>
    );
  }

  onContentReady(e) {
    e.component.scrollTo(new Date());
  }

  onAppointmentClick = (e) => {
    e.cancel = true;
    e.component.showAppointmentPopup(e.appointmentData);
  };

  onCellClick = (e) => {
    this.toolTip.current.instance.show(e.cellElement);

    const startDate = new Date(e.cellData.startDate);
    startDate.setDate(startDate.getDate() + 1);
    const endDate = new Date(e.cellData.startDate);
    endDate.setDate(endDate.getDate() + parseInt(this.state.tooltipNumDay));

    this.setState((prevState) => ({
      ...prevState,
      newAppointment: {
        ...prevState.newAppointment,
        employeeID: e.cellData.groups.employeeID,
        startDate: startDate,
        endDate: endDate,
      },
    }));
  
  };

  // tooltip create button
  handleCreateBtnClick = (e) => {
    
    this.scheduler.current.instance.addAppointment(this.state.newAppointment);
    this.toolTip.current.instance.hide();
  };
  // tooltip create shift inoput
  handleShiftInput = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      newAppointment: {
        ...prevState.newAppointment,
        text: e.target.value,
      },
    }));
  };

  // hundle days number to be added tooltip
  handleDayNumInput = (e) => {
    
    const endNumDate = new Date(this.state.newAppointment.startDate);
    
    endNumDate.setDate(endNumDate.getDate() + (parseInt(e.target.value)-1));

    
    this.setState((prevState) => ({
      ...prevState,
      tooltipNumDay: e.target.value,
      newAppointment: {
        ...prevState.newAppointment,
        endDate: endNumDate,
      },
    }));
   
  }
  //hundling change of the schedule
  handlePropertyChange = (e) => {
    //// here we change the resource style depends on the view showen
    if (e.name === "currentView") {
      e.value === "Individual"
        ? this.setState({ resCell: ResourceCell })
        : this.setState({ resCell: ResourceCellTimeLine });
    }

    ///////////////

    if (e.name === "selectedCellData") {
     
    }
  };
  //////////
  // context menu
  onAppointmentContextMenu({ appointmentData, targetedAppointmentData }) {
    const scheduler = this.scheduler.current.instance;
    const resourceItems = shiftTypeData.map((item) => ({
      ...item,
      onItemClick: ({ itemData }) =>
        scheduler.updateAppointment(appointmentData, {
          ...appointmentData,
          ...{ resID: [itemData.id] },
        }),
    }));
    this.setState((state) => ({
      ...state,
      target: appointmentClassName,
      disabled: false,
      contextMenuItems: [
        {
          text: "Edit",
          onItemClick: () => scheduler.showAppointmentPopup(appointmentData),
        },
        {
          text: "Delete",
          onItemClick: () => scheduler.deleteAppointment(appointmentData),
        },

        { text: "Mark as", beginGroup: true, disabled: true },
        ...resourceItems,
      ],
    }));
  }

  onContextMenuItemClick(e) {
    e.itemData.onItemClick(e);
  }

  onCellContextMenu({ cellData }) {
    const scheduler = this.scheduler.current.instance;
    this.setState((state) => ({
      ...state,
      target: cellClassName,
      disabled: false,
      contextMenuItems: [
        {
          text: "New Appointment",
          onItemClick: () =>
            scheduler.showAppointmentPopup(
              { startDate: cellData.startDate },
              true
            ),
        },
      ],
    }));
  }
}
///////////////////////



export default MainView;




