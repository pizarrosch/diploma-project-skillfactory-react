import s from "./LoginPage.module.scss";
import st from '../Main/Main.module.scss';
import keyCarriers from '../../assets/people-carry-key.svg';
import keyLock from '../../assets/key-lock.svg';
import googleSign from '../../assets/google-sign.png';
import facebookSign from '../../assets/facebook-sign.png';
import yandexSign from '../../assets/yandex-sign.png';
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import localStorage from "redux-persist/es/storage";
import {authorize} from "../../redux/slices/authSlice";
import {Link} from "react-router-dom";
import {getLimitInfo} from "../../redux/slices/eventFiltersSlice";
import {IAuthCredentials} from "../../types";
import api from "../../api/http";
import {RootState} from "../../redux/store";

type TInputForm = {
    login?: string,
    password?: string
}

export default function LoginPage() {

    const [form, setForm] = useState<TInputForm>({
        login: '',
        password: ''
    })
    // const [login, setLogin] = useState('');
    // const [password, setPassword] = useState('');
    const [isLoginValid, setIsLoginValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [error, setError] = useState({
        state: false,
        message: false
    });

    const dispatch = useAppDispatch();
    const auth = useAppSelector((state: RootState) => state.authorization);

    useEffect(() => {
        console.log(form.login);
        console.log(form.password)
    }, [form.login,form.password]);

    async function verifyRequisites(
        credentials: IAuthCredentials,
    ): Promise<void> {
        try {
            await api.post(
                `/api/v1/account/login`,
                credentials
            )
                .then((response) => {
                    localStorage.setItem('token', response.data.accessToken);
                    localStorage.setItem('expire', response.data.expire!);
                    dispatch(authorize({
                        accessToken: `Bearer ${response.data.accessToken!}`,
                        expire: response.data.expire!
                    }))
                })
        } catch (e: any) {
            console.log(e.message);
            setError({state: true, message: false});
        }
    }

    async function getInfo() {
        await verifyRequisites({login: form.login!, password: form.password!});
        api.get("/api/v1/account/info")
            .then((data) => dispatch(getLimitInfo({
                eventFiltersInfo: {
                    usedCompanyCount: data.data.eventFiltersInfo.usedCompanyCount,
                    companyLimit: data.data.eventFiltersInfo.companyLimit
                }
            })))

        validateLogin();
        validatePassword();
        if (!auth.accessToken && form.login === '' && form.password === '') {
            setError({state: false, message: false});
        } else if (!auth.accessToken && error.state) {
            setError({state: false, message: true});
        }
    //
    //     const localStorageToken = await localStorage.getItem('token') as string;
    //
    // if (localStorageToken) {
    //         setIsLoginValid(true);
    //         setIsPasswordValid(true);
    //     }
    }

    function handleFormInput(e: React.FormEvent) {
        const target = e.target as HTMLInputElement;

        if (target.type === 'email') {
            setForm({
                login: target.value,
                password: form.password
            })
        }

        if (target.type === 'password') {
            setForm({
                login: form.login,
                password: target.value
            })
        }

        if (error.state) {
                setIsLoginValid(true);
                setIsPasswordValid(true);
            }

        // setForm({
        //     login: target.type === 'login' && target.value,
        //     password: target.type === 'password' && target.value
        // });
        // if (error.state) {
        //     setIsLoginValid(true);
        //     setIsPasswordValid(true);
        // }
    }

    // function handlePasswordInput(e: React.FormEvent) {
    //     const target = e.target as HTMLInputElement;
    //     setPassword(target.value);
    //     if (error.state) {
    //         setIsLoginValid(true);
    //         setIsPasswordValid(true);
    //     }
    // }

    function validatePassword() {
        if (form.password!.length < 6) {
            setIsPasswordValid(false)
        } else {
            setIsPasswordValid(true);
        }
    }

    function validateLogin() {
        if (form.login!.length < 6) {
            setIsLoginValid(false)
        } else {
            setIsLoginValid(true)
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
                            <input className={isLoginValid ? s['form__input'] : s['form__input_error']} type="email"
                                   id="input" value={form.login}
                                   onInput={handleFormInput}/>
                            {!isLoginValid && error.state &&
                              <span className={s.errorMessage}>Пожалуйста, введите правильный логин</span>}
                        </div>
                        <div className={s['form__password-input-container']}>
                            <label htmlFor='password'>Пароль</label>
                            <input className={isPasswordValid ? s['form__input'] : s['form__input_error']}
                                   type="password" id="password" value={form.password}
                                   onInput={handleFormInput}/>
                            {!isPasswordValid && error.state &&
                              <span className={s.errorMessage}>Пожалуйста, введите правильный пароль</span>}
                            {error.state && <span className={s.errorMessage}>Неправильный логин или пароль</span>}
                        </div>
                    </form>
                </div>
                <Link to={isLoginValid && isPasswordValid ? '/dashboard' : '/login'}>
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