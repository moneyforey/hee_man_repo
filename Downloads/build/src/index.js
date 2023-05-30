import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./components/Utils/AuthContextProvider";
import {WithdrawalContextProvider} from "./components/Utils/WithdrawalContextProvider";

ReactDOM.render(
  <>
    <BrowserRouter>
    <AuthContextProvider>
      <WithdrawalContextProvider>
      <Suspense fallback={<h1>lodding.....</h1>}>
        <App />
      </Suspense>
      </WithdrawalContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
