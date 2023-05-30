import React from "react";
import SubpanelManipulation from "./SubpanelManipulation";

const funForGettingSubpanels = (arr) => {
  let newArr = arr.map((el) => {
    return { id: el.id, edit_status: 0 };
  });
  return newArr;
};

const AccesbilityPanelComp = ({
  el,
  handlesubpanelchange,
  handleRemoveSubpanel,
  addSubpanelByChoosinPanel,
  removeSubPanelsByPanel,
}) => {
  const { category_name, sub_category, id } = el;

  const handleChangeWithPanel = (e) => {
    
    const { checked } = e.target;
    let reqArr = funForGettingSubpanels(sub_category);
    if (checked) {
      addSubpanelByChoosinPanel(reqArr);
    } else {
      removeSubPanelsByPanel(reqArr);
    }
  };

  return (
    <div>
      {
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "16px",
              lineHeight: "19px",
              color: "#ADADAD",
              overflowY: "scroll",
            }}
          >
            <div class="form-check">
              <input
                className="form-check-input parent"
                type="checkbox"
                onChange={handleChangeWithPanel}
                name={id}
                id="flexCheckDefault"
              />
              <label
                style={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: "#ADADAD",
                }}
                className="form-check-label parent"
                for="flexCheckDefault"
              >
                {category_name}
              </label>
            </div>

            <div
              style={{
                display: "flex",
              }}
            >
              <p>Active</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="edit_status"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
          </div>

          <div>
            {sub_category.map((el) => (
              <SubpanelManipulation
                key={el.id}
                el={el}
                handlesubpanelchange={handlesubpanelchange}
                handleRemoveSubpanel={handleRemoveSubpanel}
              />
            ))}
          </div>
          <hr />
        </>
      }
    </div>
  );
};

export default AccesbilityPanelComp;
