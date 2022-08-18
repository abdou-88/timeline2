import React, { useState } from "react";

import {  employees } from "../data.js";

 export function RecourcesHeader()  {
  const [selectedResourceID, setselectedResourceID] = useState(0);

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

  
  return <>testing</>;
}

export default RecourcesHeader;;

