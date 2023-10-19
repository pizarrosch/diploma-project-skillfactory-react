import React from "react";
import Header from "./components/Header/Header";
import s from './App.module.scss';
import Footer from "./components/Footer/Footer";
import {Routes, Route, Navigate} from "react-router";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from './components/Main/MainPage';

function App() {
    return (
        <div className={s.root}>
            <Header/>
            <Routes>
                <Route path='/' element={<Navigate to='/dashboard' />} />
                <Route
                path='/dashboard'
                element={<MainPage/>}
                />
                <Route
                path='/login'
                element={<LoginPage />}
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
