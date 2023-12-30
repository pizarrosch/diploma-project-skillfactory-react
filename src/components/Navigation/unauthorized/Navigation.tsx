import React from 'react';
import s from '../Navigation.module.scss';
import {Link} from "react-router-dom";
import menuCake from "../../../assets/options-cake.svg";

export default function Navigation() {

    return (
        <div className={s.rootUnauth}>
            <nav className={s.navigation}>
                <ul className={s['navigation-list']}>
                    <li className={s['navigation-list__item']}>
                        <Link to={'/dashboard'}>
                            Main page
                        </Link>
                    </li>
                    <li className={s['navigation-list__item']}>Tariffs</li>
                    <li className={s['navigation-list__item']}>FAQ</li>
                </ul>
            </nav>
            <div className={s.menuWrapper}>
                <div className={s.loginMenu}>
                    <span className={s.register}>Register</span>
                    <span className={s.separator}>|</span>
                    <button className={s.loginButton}>
                        <Link to={'/login'}>
                            Log In
                        </Link>
                    </button>
                </div>
                <img className={s.menuCake} src={menuCake} alt=''/>
            </div>
        </div>
    )
}