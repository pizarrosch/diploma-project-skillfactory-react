import React, {useEffect} from "react";
import Header from "./components/Header/unauthorized/Header";
import HeaderAuthorized from "./components/Header/authorized/HeaderAuthorized";
import s from './App.module.scss';
import Footer from "./components/Footer/Footer";
import {Routes, Route, Navigate} from "react-router";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from './components/Main/MainPage';
import SearchForm from "./components/SearchForm/SearchForm";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import ResultsPage from "./components/ResultsPage/ResultsPage";
import {RootState} from "./redux/store";
import localStorage from "redux-persist/es/storage";
import axios from "axios";
import {TEventFiltersInfo} from "./types";
import {getLimitInfo} from "./redux/slices/eventFiltersSlice";

function App() {

    const authorized = useAppSelector((state: RootState) => state.authorization);
    const dispatch = useAppDispatch();

    async function getInfo() {
        const token = await localStorage.getItem('token');
        axios.get("https://gateway.scan-interfax.ru/api/v1/account/info", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token!}`
            },
        })

            .then((data: axios.AxiosResponse<TEventFiltersInfo>) => authorized && dispatch(getLimitInfo({
                eventFiltersInfo: {
                    usedCompanyCount: data.data.eventFiltersInfo.usedCompanyCount,
                    companyLimit: data.data.eventFiltersInfo.companyLimit
                }
            })))
    }

    useEffect(() => {
        authorized.accessToken && getInfo();
    }, [authorized.accessToken]);

    return (
        <div className={s.root}>
            {authorized.accessToken ? <HeaderAuthorized /> : <Header/>}
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
                <Route
                    path='/results'
                    element={<ResultsPage />}
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
