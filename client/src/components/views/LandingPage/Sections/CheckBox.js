import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const CheckBox = (props) => {
  const [Checked, setChecked] = useState([]);
  const handleToggle = (value) => {
    const indexOfstate = Checked.indexOf(value);
    const copyState = [...Checked];
    if (indexOfstate === -1) {
      copyState.push(value);
    } else {
      copyState.splice(indexOfstate, 1);
    }
    setChecked(copyState);
    props.handleFilters(copyState, "continents");
  };
  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Continents" key="1">
          {props.list &&
            props.list.map((value, index) => (
              <React.Fragment key={index}>
                <Checkbox
                  onChange={() => handleToggle(value._id)}
                  type="CheckBox"
                  checked={Checked.includes(value._id)}
                />
                <span>{value.name}</span>
              </React.Fragment>
            ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default CheckBox;
