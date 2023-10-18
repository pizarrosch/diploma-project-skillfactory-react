import React from "react";
import Header from "./components/Header/Header";
import s from './App.module.scss';
import MainPage from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className={s.root}>
            <Header/>
            <MainPage/>
            <Footer />
        </div>
    );
}

export default App;
