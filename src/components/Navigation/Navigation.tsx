import React from 'react';
import s from './Navigation.module.scss';

export default function Navigation() {
    return (
        <div className={s.root}>
            <nav className={s.navigation}>
                <ul className={s['navigation-list']}>
                        <li className={s['navigation-list__item']}>
                            <a href={'/'}>
                            Главная
                            </a>
                        </li>
                    <li className={s['navigation-list__item']}>Тарифы</li>
                    <li className={s['navigation-list__item']}>FAQ</li>
                </ul>
            </nav>
            <div className={s.loginMenu}>
                <span className={s.register}>Зарегистрироваться</span>
                <span className={s.separator}>|</span>
                <button className={s.loginButton}>
                    <a href={'/login'}>
                        Войти
                    </a>
                </button>
            </div>
        </div>
    )
}