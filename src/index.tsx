import MainPage from "pages/MainPage";
import React from "react";
import { render } from "react-dom";

render(<MainPage />, document.getElementById('root'));

if(module.hot) {
    module.hot.accept();
  }