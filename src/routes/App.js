import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./home/HomePage";
import {NewTodoPage} from "./new/NewTodoPage";
import {EditTodoPage} from "./edit/EditTodoPage";

export const App = () => {

  return(
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/new" element={<NewTodoPage />}></Route>
        <Route path="/edit/:id" element={<EditTodoPage />}></Route>
        <Route path="*" element={<p>Not Found</p>}></Route>
      </Routes>
    </HashRouter>
  );

}