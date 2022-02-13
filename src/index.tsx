import BookInfoPage from "pages/BookInfoPage";
import MainPage from "pages/MainPage";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path='/book/:id' element={<BookInfoPage />} />
    </Routes>
  </BrowserRouter>
  , document.getElementById('root'));

if(module.hot) {
    module.hot.accept();
  }