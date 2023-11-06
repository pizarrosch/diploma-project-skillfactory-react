import s from "./LoginPage.module.scss";
import st from '../Main/Main.module.scss';
import keyCarriers from '../../assets/people-carry-key.svg';
import keyLock from '../../assets/key-lock.svg';
import googleSign from '../../assets/google-sign.png';
import facebookSign from '../../assets/facebook-sign.png';
import yandexSign from '../../assets/yandex-sign.png';
import React, {useEffect, useState} from "react";
import {verifyRequisites} from "../../api/auth";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import localStorage from "redux-persist/es/storage";
import {authorize} from "../../redux/slices/authSlice";
import {RootState} from "../../redux/store";
import {Link} from "react-router-dom";
import {getLimitInfo} from "../../redux/slices/eventFiltersSlice";
import axios from "axios";
import {TEventFiltersInfo} from "../../types";

const LOGIN = process.env.USER_LOGIN as string;
const PASSWORD = process.env.USER_PASSWORD as string;

export default function LoginPage() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginValid, setIsLoginValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const dispatch = useAppDispatch();
    const authorized = useAppSelector((state: RootState) => state.authorization);

    async function getInfo() {
        await getVerificationStatus();
        const token = await localStorage.getItem('token');
        axios.get("https://gateway.scan-interfax.ru/api/v1/account/info", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token!}`
            },
        })

            .then((data: axios.AxiosResponse<TEventFiltersInfo>) => dispatch(getLimitInfo({
                eventFiltersInfo: {
                    usedCompanyCount: data.data.eventFiltersInfo.usedCompanyCount,
                    companyLimit: data.data.eventFiltersInfo.companyLimit
                }
            })))

        login.length === 0 && setIsLoginValid(false);
        password.length === 0 && setIsPasswordValid(false);
    }

    useEffect(() => {
        validateLogin();
        validatePassword();
    }, [login, password]);

    function handleEmailInput(e: React.FormEvent) {
        const target = e.target as HTMLInputElement;
        setLogin(target.value);
    }

    function handlePasswordInput(e: React.FormEvent) {
        const target = e.target as HTMLInputElement;
        setPassword(target.value);
    }

    function validatePassword() {
        if (password.length < 6) {
            setIsPasswordValid(false)
        } else {
            setIsPasswordValid(true);
        }
    }

    function validateLogin() {
        if (login.length < 6) {
            setIsLoginValid(false)
        } else {
            setIsLoginValid(true)
        }
    }

    useEffect(() => {
        !login && setIsLoginValid(false);
    }, [login]);

    async function getVerificationStatus() {
        if (login === 'sf_student9' && password === 'DTdEwAn') {
            await verifyRequisites({login: `${login}`, password: `${password}`});
            const token = await localStorage.getItem('token');
            const expirationDate = await localStorage.getItem('expire');

            dispatch(authorize({
                accessToken: `Bearer ${token!}`,
                // @ts-ignore
                expire: expirationDate
            }))
        } else {
            alert('Your login or password are incorrect')
        }
    }

    return (
        <div className={s.root}>
            <div>
                <div>
                    <p className={s.paragraph}>Для оформления подписки <br/> на тариф,
                        необходимо <br/> авторизоваться.</p>
                    <img className={s['key-carriers-img']} src={keyCarriers} alt='keyCarriers'/>
                </div>
            </div>
            <img className={s['key-lock']} src={keyLock} alt='key lock'/>
            <div className={s['login-form-container']}>
                <div className={s['login-signup-container']}>
                    <span className={s['login-signup-container__login']}>Войти</span>
                    <span className={s['login-signup-container__signup']}>Зарегистрироваться</span>
                </div>
                <div className={s['form-container']}>
                    <form className={s['form-container__form']}>
                        <div className={s['form__email-input-container']}>
                            <label htmlFor='input'>Логин или номер телефона:</label>
                            <input className={isLoginValid ? s['form__input'] : s['form__input_error']} type="email" id="input" value={login}
                                   onInput={handleEmailInput}/>
                            {!isLoginValid && <span className={s.errorMessage}>Пожалуйста, введите правильный логин</span>}
                        </div>
                        <div className={s['form__password-input-container']}>
                            <label htmlFor='password'>Пароль</label>
                            <input className={isPasswordValid ? s['form__input'] : s['form__input_error']} type="password" id="password" value={password}
                                   onInput={handlePasswordInput}/>
                            {!isPasswordValid && <span className={s.errorMessage}>Пожалуйста, введите правильный пароль</span>}
                        </div>
                    </form>
                </div>
                <Link to={login ? '/dashboard' : '/login'}>
                    <button type='submit' className={st.loginButton} onClick={getInfo}>
                        Войти
                    </button>
                </Link>
                <span><a href='/login' style={
                    {
                        textDecoration: 'underline',
                        color: 'blue',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }
                }>Восстановить пароль</a></span>
                <div className={s['alternative-login']}>
                    <span style={{fontSize: '16px', color: 'rgba(148, 148, 148, 1)'}}>Войти через:</span>
                    <div className={s['account-name-container']}>
                        <div className={s['account-name']}>
                            <img src={googleSign} alt='google'/>
                        </div>
                        <div className={s['account-name']}>
                            <img src={facebookSign} alt='facebook'/>
                        </div>
                        <div className={s['account-name']}>
                            <img src={yandexSign} alt='yandex'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}