import translate from "translate";
import { useState, useEffect } from "react";

translate.engine = "google";
translate.key = process.env.GOOGLE_KEY;

const Span = (props) => {
  const [text, setText] = useState(props.children);

  useEffect(() => {
    (async () => {
      if (text) {
        let language = localStorage.getItem("language");
        translate(text, language ? language : "en").then((result) =>
          setText(result)
        );
      }
    })();
  }, []);
  return (
    <>
      <span key={text} {...props}>
        {text}
      </span>
    </>
  );
};

export { Span };
