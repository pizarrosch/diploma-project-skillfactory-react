import React from 'react';
import s from '../Navigation.module.scss';
import {Link} from "react-router-dom";
import {authorize} from "../../../redux/slices/authSlice";
import {useAppDispatch} from "../../../hooks/hooks";

export default function Navigation() {

    const dispatch = useAppDispatch();

    return (
        <div className={s.root}>
            <nav className={s.navigation}>
                <ul className={s['navigation-list']}>
                        <li className={s['navigation-list__item']}>
                            <Link to={'/dashboard'}>
                            Главная
                            </Link>
                        </li>
                    <li className={s['navigation-list__item']}>Тарифы</li>
                    <li className={s['navigation-list__item']}>FAQ</li>
                </ul>
            </nav>
            <div className={s.loginMenu}>
                <span className={s.register}>Зарегистрироваться</span>
                <span className={s.separator}>|</span>
                <button className={s.loginButton}>
                    <Link to={'/login'} onClick={() => dispatch(authorize(true))}>
                        Войти
                    </Link>
                </button>
            </div>
        </div>
    )
}