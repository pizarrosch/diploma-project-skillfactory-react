import React from 'react';
import s from '../Navigation.module.scss';
import {Link} from "react-router-dom";
import {authorize} from "../../../redux/slices/authSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import avatar from '../../../assets/avatar.png';
import {RootState} from "../../../redux/store";
import {EventFilter, TEventFiltersInfo} from "../../../types";

export default function NavigationAuthorized() {

    const dispatch = useAppDispatch();
    const authorized = useAppSelector((state: RootState) => state.authorization);
    const tariffLimits: TEventFiltersInfo = useAppSelector((state: RootState) => state.tariffLimits)

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
            <div className={s.stats}>
                <div className={s.usedCompaniesWrapper}>
                    <span className={s.usedCompanies}>Использовано компаний</span>
                    <span className={s.usedCompaniesAmount}>{authorized && tariffLimits.eventFiltersInfo.usedCompanyCount}</span>
                </div>
                <div className={s.companiesLimitWrapper}>
                    <span className={s.companiesLimit}>Лимит по компаниям</span>
                    <span className={s.limitAmount}>{authorized && tariffLimits.eventFiltersInfo.companyLimit}</span>
                </div>
            </div>
            <div className={s.loginMenu}>
                <div className={s.userNameWrapper}>
                    <span className={s.userName}>Zaur S.</span>
                    <span className={s.logOut} onClick={() => dispatch(authorize(''))}>Выйти</span>
                </div>
                <div>
                    <img src={avatar} alt='avatar' />
                </div>
            </div>
        </div>
    )
}