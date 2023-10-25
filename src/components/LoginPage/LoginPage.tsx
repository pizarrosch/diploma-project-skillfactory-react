import s from "./LoginPage.module.scss";
import st from '../Main/Main.module.scss';
import keyCarriers from '../../assets/people-carry-key.svg';
import keyLock from '../../assets/key-lock.svg';
import googleSign from '../../assets/google-sign.png';
import facebookSign from '../../assets/facebook-sign.png';
import yandexSign from '../../assets/yandex-sign.png';
import React, {useEffect, useState} from "react";
import {verifyRequisites} from "../../api/auth";
import axios from "axios";
import {useAppDispatch} from "../../hooks/hooks";
import localStorage from "redux-persist/es/storage";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const token = localStorage.getItem('token');
    console.log(token)

    function handleEmailInput(e: React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setEmail(target.value);
    }

    function handlePasswordInput(e: React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setPassword(target.value);
    }

     function getInfo() {
        const res =  axios.get("https://gateway.scan-interfax.ru/api/v1/account/info", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiO…0OCJ9.GZzUUnio8_ulXvAuk_js3oo7BJjaZrBW2jQ3BPQ1KIM'
            },
        });

        console.log('result -->', res);
    }

    async function getVerificationStatus() {
        await verifyRequisites({login: `${email}`, password: `${password}`});
         getInfo();
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
                            <input className={s['form__input']} type="email" id="input" value={email} onChange={handleEmailInput}/>
                        </div>
                        <div className={s['form__password-input-container']}>
                            <label htmlFor='password'>Пароль</label>
                            <input className={s['form__input']} type="password" id="password" value={password} onChange={handlePasswordInput}/>
                        </div>
                    </form>
                </div>
                <button type='submit' className={st.loginButton} onClick={getVerificationStatus}>Войти</button>
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