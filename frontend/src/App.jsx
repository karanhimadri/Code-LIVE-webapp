import React from "react";
import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeEditor from "./Pages/CodeEditorPage/CodeEditor";
import Homepage from "./Pages/HomePage/Homepage";

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Homepage/>} />
          <Route path="/code-editor" element={<CodeEditor/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
