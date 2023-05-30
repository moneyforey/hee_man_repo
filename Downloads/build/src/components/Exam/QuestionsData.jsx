import { useEffect, useState } from "react";

import axios from "axios";
import QuestionCard from "./QuestionCard";
import LoaderComponent from "../Utils/LoaderComponent";

const initLoader = {
  isLoading: false,
  isError: false,
};

const QuestionsData = () => {
  const [data, setData] = useState();
  const [subjectId, setSubjectId] = useState();
  const [loader, setLoader] = useState(initLoader);
  const { isLoading, isError } = loader;

  useEffect(() => {
    const token = localStorage.getItem("token");
    getData(token);
  }, []);

  const getData = async (token) => {
    setLoader({
      ...loader,
      isLoading: true,
    });
    try {
      let res = await axios.post(
        `https://brainbucks.co.in/api/admin/get-question-bank?token=${token}`
      );
      if (res.data.status === "001") {
        setData(res.data.data);
        setLoader({
          ...loader,
          isLoading: false,
        });
      } else {
        setLoader({
          ...loader,
          isLoading: false,
        });
      }
    } catch {
      setLoader({
        ...loader,
        isLoading: false,
      });
    }
  };

  return (
    <>
      <div
        className="row"
        style={{
          height: "74vh",
          overflowY: "scroll",
        }}
      >
        {isLoading ? (
          <LoaderComponent />
        ) : (
          data?.map((res) => <QuestionCard key={res.id} {...res} />)
        )}
      </div>
    </>
  );
};

export default QuestionsData;
