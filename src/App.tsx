import React from "react";
import Header from "./components/Header/Header";
import s from './App.module.scss';
import MainPage from "./components/Main/Main";

function App() {
  return (
    <div className={s.root}>
      <Header />
        <MainPage />
    </div>
  );
}

export default App;
