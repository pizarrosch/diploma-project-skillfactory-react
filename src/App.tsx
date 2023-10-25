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

function App() {

    const authorized = useAppSelector((state: RootState) => state.authorization);
    const dispatch = useAppDispatch();

   // useEffect(() => {
   //      // const headers = { Authorization: `Bearer ${token}`};
   //      token && fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
   //          headers: {
   //              Authorization: `Bearer ${token}`
   //          }
   //      })
   //          .then((response) => response.json())
   //          .then(data => dispatch(getLimitInfo({
   //              companyLimit: data.companyLimit,
   //              usedCompanyCount: data.usedCompanyCount
   //          })))
   //  }, [dispatch, token]);



    return (
        <div className={s.root}>
            {authorized ? <HeaderAuthorized /> : <Header/>}
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
