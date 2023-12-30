import s from "./LoginPage.module.scss";
import st from '../Main/Main.module.scss';
import keyCarriers from '../../assets/people-carry-key.svg';
import keyLock from '../../assets/key-lock.svg';
import googleSign from '../../assets/google-sign.png';
import facebookSign from '../../assets/facebook-sign.png';
import yandexSign from '../../assets/yandex-sign.png';
import React, {useState} from "react";
import {useAppDispatch} from "../../hooks/hooks";
import localStorage from "redux-persist/es/storage";
import {authorize} from "../../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {getLimitInfo} from "../../redux/slices/eventFiltersSlice";
import {IAuthCredentials} from "../../types";
import api from "../../api/http";

type TInputForm = {
    login?: string,
    password?: string
}

export default function LoginPage() {

    const [form, setForm] = useState<TInputForm>({
        login: '',
        password: ''
    })

    const [isLoginValid, setIsLoginValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [error, setError] = useState({
        state: false,
        message: false
    });

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    async function verifyRequisites(
        credentials: IAuthCredentials,
    ): Promise<void> {
        try {
            await api.post(
                `/api/v1/account/login`,
                credentials
            )
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.accessToken);
                        localStorage.setItem('expire', response.data.expire!);
                        dispatch(authorize({
                            accessToken: `Bearer ${response.data.accessToken!}`,
                            expire: response.data.expire!
                        }))
                    } else return;
                })
        } catch (e: any) {
            console.log(e.message);
        }
    }

    async function getInfo() {
        try {
            await verifyRequisites({login: form.login!, password: form.password!})

            const token = await localStorage.getItem('token') as string;

            await validateLogin();
            await validatePassword();

            if (token) {
                navigate('/dashboard');
                api.get("/api/v1/account/info")
                    .then((data) => dispatch(getLimitInfo({
                        eventFiltersInfo: {
                            usedCompanyCount: data.data.eventFiltersInfo.usedCompanyCount,
                            companyLimit: data.data.eventFiltersInfo.companyLimit
                        }
                    })))
            } else {
                setError({state: true, message: false})
            }

            if (error.state) {
                setError({state: true, message: true});
            }
        } catch (e: any) {
            console.log(e.message)
        }
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
    }

    async function validatePassword() {
        if (form.password!.length < 6) {
            setIsPasswordValid(false);
            setError({state: true, message: false})
        } else {
            setIsPasswordValid(true);
        }
    }

    async function validateLogin() {
        if (form.login!.length < 6) {
            setIsLoginValid(false);
            setError({state: true, message: false})
        } else {
            setIsLoginValid(true);
        }
    }

    return (
        <div className={s.root}>
            <div>
                <div>
                    <p className={s.paragraph}>please log in to subscribe <br/> to your
                        tariff </p>
                    <img className={s['key-carriers-img']} src={keyCarriers} alt='keyCarriers'/>
                </div>
            </div>
            <img className={s['key-lock']} src={keyLock} alt='key lock'/>
            <div className={s['login-form-container']}>
                <div className={s['login-signup-container']}>
                    <span className={s['login-signup-container__login']}>Log In</span>
                    <span className={s['login-signup-container__signup']}>Register</span>
                </div>
                <div className={s['form-container']}>
                    <form className={s['form-container__form']}>
                        <div className={s['form__email-input-container']}>
                            <label htmlFor='input'>Login or phone number:</label>
                            <input className={!error.state ? s['form__input'] : s['form__input_error']} type="email"
                                   id="input" value={form.login}
                                   onInput={handleFormInput}/>
                            {!isLoginValid && error.state &&
                              <span className={s.errorMessage}>The minimum of 6 symbols required</span>}
                        </div>
                        <div className={s['form__password-input-container']}>
                            <label htmlFor='password'>Password</label>
                            <input className={!error.state ? s['form__input'] : s['form__input_error']}
                                   type="password" id="password" value={form.password}
                                   onInput={handleFormInput}/>
                            {!isPasswordValid && error.state &&
                              <span className={s.errorMessage}>The minimum of 6 symbols required</span>}
                            {isLoginValid && isPasswordValid && error.message &&
                              <span className={s.errorMessage}>Wrong login or password</span>}
                        </div>
                    </form>
                </div>
                <button type='submit' className={st.loginButton} onClick={getInfo}>
                    Log In
                </button>
                <span><a href='/login' style={
                    {
                        textDecoration: 'underline',
                        color: 'blue',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }
                }>Restore password</a></span>
                <div className={s['alternative-login']}>
                    <span style={{fontSize: '16px', color: 'rgba(148, 148, 148, 1)'}}>Log in via:</span>
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