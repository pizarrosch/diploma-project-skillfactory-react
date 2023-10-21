import React from "react";
import s from './ArticleCard.module.scss';
import st from '../Main/Main.module.scss';
import articleImage1 from '../../assets/article-card-img-1.png';

export default function ArticleCard() {
    return (
        <div className={s.root}>
            <div className={s.sourceContainer}>
                <span>21.10.2023</span>
                <span className={s.source}>Комсомольская правда KP.RU</span>
            </div>
            <h2 className={s.title}>Скиллфэктори - лучшая онлайн-школа <br/> для будущих айтишников</h2>
            <div className={s.categoryContainer}>
                <span className={s.category}>Технические новости</span>
            </div>
            <img className={s.articleImage} src={articleImage1} alt=''/>
            <p className={s.paragraph}>SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. С 2016
                года обучение прошли 20 000+ человек из 40 стран с 4 континентов, самому взрослому студенту сейчас 86
                лет. Выпускники работают в Сбере, Cisco, Bayer, Nvidia, МТС, Ростелекоме, Mail.ru, Яндексе, Ozon и
                других топовых компаниях.</p>
            <p className={s.paragraph}>Принципы SkillFactory: акцент на практике, забота о студентах и ориентир на
                трудоустройство. 80% обучения — выполнение <br/> упражнений и реальных проектов. Каждого студента поддерживают
                менторы, 2 саппорт-линии и комьюнити курса. А карьерный центр помогает составить резюме, подготовиться к
                собеседованиям и познакомиться с IT-рекрутерами.</p>
            <div className={s.cardFooter}>
                <button className={st.readSourceButton}>Читать в источнике</button>
                <span className={s.paragraph}>2 543 слова</span>
            </div>
        </div>
    )
}