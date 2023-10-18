import s from '../../components/Main/Main.module.scss';
import st from './Tariff.module.scss';
import checkmark from '../../assets/checkmark.svg';
import {TTariffCard} from "../../types";
import React from 'react';

export default function TariffCard(
    {
        tariffTitle,
        tariffDescription,
        actualPrice,
        oldPrice,
        monthlyRate,
        tariffOptions,
        backgroundColor,
        color,
        src
    }: TTariffCard
) {
    return (
        <div className={st.root}>
            <div style={
                {
                    backgroundColor: `${backgroundColor}`,
                    color: `${color}`
                }
            } className={st['tariff-title']}>
                <div>
                    <h2 className={st['tariff-title__title']}>{tariffTitle}</h2>
                    <span className={st['tariff-title__description']}>{tariffDescription}</span>
                </div>
                <img className={st['tariff-title__image']} src={src} alt='lamp'/>
            </div>
            <div className={st['tariff-details-container']}>
                <div className={st['current-tariff-icon']}>Текущий тариф</div>
                <div className={st['price-container']}>
                    <span className={st['price-container__actual-price']}>{actualPrice}</span>
                    <span className={st['price-container__old-price']}>{oldPrice}</span>
                </div>
                <span style={{paddingLeft: '30px'}} className={st['eighteen-px-text']}>{monthlyRate}</span>
            </div>
            <div className={st['tariff-options']}>
                <h6 style={{fontSize: '20px', fontWeight: 500, marginBottom: '10px'}}>В тариф входит:</h6>
                <div className={st['tariff-options__option']}>
                    <img src={checkmark} alt='checkmark'/>
                    <span className={st['eighteen-px-text']}>{tariffOptions.firstOption}</span>
                </div>
                <div className={st['tariff-options__option']}>
                    <img src={checkmark} alt='checkmark'/>
                    <span className={st['eighteen-px-text']}>{tariffOptions.secondOption}</span>
                </div>
                <div className={st['tariff-options__option']}>
                    <img src={checkmark} alt='checkmark'/>
                    <span className={st['eighteen-px-text']}>{tariffOptions.thirdOption}</span>
                </div>
            </div>
            <button className={s.seeDetailsButton}>Перейти в личный кабинет</button>
        </div>)
}