import React from "react";
import Header from "./components/Header/unauthorized/Header";
import HeaderAuthorized from "./components/Header/authorized/HeaderAuthorized";
import s from './App.module.scss';
import Footer from "./components/Footer/Footer";
import {Routes, Route, Navigate} from "react-router";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from './components/Main/MainPage';
import SearchForm from "./components/SearchForm/SearchForm";
import {useAppSelector} from "./hooks/hooks";

function App() {

    const authorized = useAppSelector((state) => state.authorization);

    return (
        <div className={s.root}>
            {authorized === true ? <HeaderAuthorized /> : <Header/>}
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
                <Route
                    path='/searchForm'
                    element={<SearchForm />}
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
