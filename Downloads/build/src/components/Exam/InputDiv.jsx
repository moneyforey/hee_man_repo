import { FcCheckmark } from "react-icons/fc";

const alpha = "abcdefghijklmnopqrstuvwxyz";

const InputDiv = ({ req, res, handleChange, disabled, answer }) => {
  return (
    <div>
      <div>
        <label style={{ fontSize: 16, fontWeight: "600" }} htmlFor="">
          {alpha[req]}.{" "}
        </label>
        <input
          disabled={disabled}
          style={
            req === answer
              ? {
                  fontSize: 16,
                  fontWeight: "600",
                  background: "none",
                  // border: "none",
                  color: "#636363 ",
                  border:disabled?"none":"1px solid black"
                }
              : {
                  fontSize: 16,
                  fontWeight: "600",
                  background: "none",
                  // border: "none",
                  color: "#d7d7d7",
                  border:disabled?"none":"1px solid black"
                }
          }
          name={req}
          value={res}
          type="text"
          onChange={(e) => handleChange(e)}
        />
        {req === answer ? (
          <span
            style={{
              backgroundColor: "#d7f3e6",
              color: "#74bb7c",
              padding: ".25rem",
              borderRadius: ".25rem",
            }}
          >
            {" "}
            <FcCheckmark /> Marked as Correct
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default InputDiv;
