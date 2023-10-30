import s from "../ResultsPage/ResultsPage.module.scss";
import st from '../Main/Main.module.scss';
import React from "react";
import woman from '../../assets/woman-with-magnifying-glass.svg';
import leftArrow from "../../assets/left-arrow.svg";
import rightArrow from "../../assets/arrow-right.svg";
import {statData} from "../../data";
import {
    TArticle,
    TSearchResults,
    TStatResults,
    TTotalDocsResult,
    TTotalDocsResultArray,
    TTotalDocuments
} from "../../types";
import ArticleCard from "../ArticleCard/ArticleCard";
import {useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../redux/store";

function StatsCard({range, total, risks}: TStatResults) {

    return (
        <>
            <div className={s.statsWrapper}>
                <span>{range}</span>
                <span>{total}</span>
                <span>{risks}</span>
            </div>
            <div className={s.separator}></div>
        </>
    )
}


export default function ResultsPage() {

    const stats: TSearchResults = useAppSelector((state: RootState) => state.stats);
    const articles: TArticle[] = useAppSelector((state: RootState) => state.articles);

    return (
        <div>
            <div className={s.firstBlock}>
                <div className={s.paragraphContainer}>
                    <div>
                        <p className={s.paragraph}>Ищем. Скоро <br/> будут результаты</p>
                        <p className={s.text}>Поиск может занять некоторое время, <br/> просим сохранять терпение.</p>
                    </div>
                </div>
                <img src={woman} alt='woman'/>
            </div>
            <div className={s.statsContainer}>
                <span className={s.stats}>Общая сводка</span>
                <span className={s.foundItems}>Найдено 4 221 вариантов</span>
            </div>
            <div className={s.slider}>
                <img className={s.leftArrow} src={leftArrow} alt='left'/>
                <div className={s.cardsContainer}>
                    <div className={s.statNameContainer}>
                        <span>Период</span>
                        <span>Всего</span>
                        <span>Риски</span>
                    </div>
                    {
                        stats.length === 0 ? 'В данном промежутке времени информация отсутствует' : stats && stats[0].data.map((stat: TTotalDocsResult) => {
                            return <StatsCard range={stat.date} total={stat.value} risks={stat.value}/>
                        })
                    }
                </div>
                <img className={statData.length > 8 ? s.activeRightArrow : s.rightArrow} src={rightArrow} alt='right'/>
            </div>
            <div className={s.statsContainer}>
                <span className={s.stats}>Список документов</span>
            </div>
            {
                articles.map(article => {
                    return <ArticleCard ok={article.ok} />
                })
            }
            <div className={s.buttonContainer}>
                <button className={st.showMoreButton}>Показать больше</button>
            </div>
        </div>
    )
}