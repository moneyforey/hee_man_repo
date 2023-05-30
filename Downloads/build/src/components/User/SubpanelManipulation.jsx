import React, { useState } from "react";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

const SubpanelManipulation = ({
  el,
  handlesubpanelchange,
  handleRemoveSubpanel,
}) => {
  const { parent_id, subcategory_name, id } = el;
  const [isChecked, setisChecked] = useState(false);
  const [isChecked1, setisChecked1] = useState(false);

  //for manipulating the particular subpanel while checked or unchecked the particular checkbox
  const handleChangeId = (e) => {
    const { checked } = e.target;
    if (checked) {
      setisChecked(!isChecked);
      handlesubpanelchange(id, 0);
    } else {
      setisChecked(!isChecked);
      handleRemoveSubpanel(id);
    }
  };

  //for sets the status of particular subpanel
  const handleChangeStatus = (e) => {
    const { checked } = e.target;
    const status = e.target.checked === true ? 1 : 0;
    handlesubpanelchange(id, status);
    setisChecked1(!isChecked1);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <div>
          <MdOutlineSubdirectoryArrowRight />
        </div>
        <div className="form-check">
          <input
            className="form-check-input child"
            onChange={handleChangeId}
            disabled={isChecked1}
            type="checkbox"
            name="id"
            id={id}
          />

          <label className="form-check-label child" for={id}>
            {subcategory_name}
          </label>
        </div>
      </div>

      <div className="form-check form-switch" id={id}>
        <input
          className="form-check-input"
          onChange={(e) => handleChangeStatus(e, id)}
          disabled={!isChecked}
          type="checkbox"
          name="edit_status"
          id="flexSwitchCheckDefault"
        />
      </div>
    </div>
  );
};

export default SubpanelManipulation;
