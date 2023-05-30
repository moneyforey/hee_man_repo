import { useState } from "react";
import InputDiv from "./InputDiv";
import { Span } from "./Span";
import TranslateIm from "../../Img/icons8.svg";

const QuestionComp = ({ res, ind, deleteFun }) => {
  const { answer, options } = res;
  const [Trans, setTrans] = useState(0);
  const [QuestionId, setQuestionId] = useState();
  const [opt, setOpt] = useState(
    typeof options === "string" && !options.startsWith("[")
      ? options.trim().split(",")
      : JSON.parse(options)
  );
  const [ques, setQues] = useState(res.question);
  const [id, setId] = useState(res.id);
  const [isEdit, setIsEdit] = useState(false);

  const handleChangeOptions = (e) => {
    const { name, value } = e.target;
    const newarray = [...opt];
    newarray[name] = value;

    setOpt(newarray);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handelSave = async () => {
    setIsEdit(false);
    await Api(id, ques, opt);
  };

  //api for update particular Question;
  const Api = (id, ques, opt) => {
    var formdata = new FormData();
    formdata.append("question_id", id);
    formdata.append("question", ques);
    formdata.append("options", JSON.stringify(opt));
    formdata.append("verfiy", 1);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://brainbucks.co.in/api/admin/update-single-question",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div key={res.id} className="row mt-3">
      <span className="col-1" style={{ fontSize: 20, fontWeight: "bolder" }}>
        {ind + 1}
      </span>
      <span className="col-4"></span>
      <div className="col-7">
        <span className="row" style={{ justifyContent: "space-between" }}>
          <button
            className="col-3 border-0"
            style={
              isEdit
                ? {
                    backgroundColor: "green",
                    color: "#fff",
                    height: "30px",
                    borderRadius: 4,
                  }
                : {
                    backgroundColor: "#2188E7",
                    color: "#fff",
                    height: "30px",
                    borderRadius: 4,
                  }
            }
            onClick={!isEdit ? handleEdit : handelSave}
          >
            {isEdit ? "SAVE" : "EDIT"}
          </button>
          {/* //#curaff785236 */}

          {/* work here */}
          <button
            className="col-3"
            style={{
              backgroundColor: "#fff",
              color: "#2188E7",
              height: "30px",
              borderRadius: 4,
              border: "1px solid #2188E7",
            }}
            onClick={() => deleteFun(res.id)}
          >
            Delete
          </button>

          <button
            className="col-4 border-0"
            style={{
              backgroundColor: "#EFEFEF",
              color: "#8A8A8A",
              height: "30px",
              borderRadius: 4,
            }}
          >
            Id {res.id}
          </button>
          <button
            className="col-1 border-0"
            style={{
              backgroundColor: "#1F1F1F",
              height: "30px",
              borderRadius: 4,
            }}
            id={res.id}
            onClick={() => {
              setTrans(Trans + 1);
              setQuestionId(res.id);
            }}
          >
            <img alt="translate" src={TranslateIm} />
          </button>
        </span>
      </div>

      {Trans % 2 === 0 && QuestionId === res.id ? (
        <>
          <div>
            <Span className="col-12 fw-bold mt-3">{res.question}</Span>
            {JSON.parse(res.options).map((val) => {
              return (
                <ol className="m-4" type="a">
                  <li style={{ fontSize: 20, fontWeight: "600" }}>
                    <Span style={{ fontSize: 16, fontWeight: "600" }}>
                      {val}
                    </Span>
                  </li>
                </ol>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div>
            <span className="col-12 fw-bold mt-3">
              {/* {res.question} */}
              <input
                onChange={(e) => setQues(e.target.value)}
                type="text"
                value={ques}
                disabled={!isEdit}
                style={{
                  width: "100%",
                  fontSize: 16,
                  fontWeight: "600",
                  background: "none",
                  border:isEdit? '1px solid black': "none",
                }}
              />
            </span>
            {opt.map((val, ind) => (
              //InputDiv for Particuar option input
              <InputDiv
                key={ind}
                res={val}
                req={ind}
                disabled={!isEdit}
                answer={answer}
                handleChange={handleChangeOptions}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionComp;
