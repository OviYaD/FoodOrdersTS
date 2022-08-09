import ReactDOM from "react-dom/client";
import "./index.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { RecoilRoot } from "recoil";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
