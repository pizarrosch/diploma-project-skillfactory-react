import s from "../ResultsPage/ResultsPage.module.scss";
import st from '../Main/Main.module.scss';
import React, {useState} from "react";
import woman from '../../assets/woman-with-magnifying-glass.svg';
import leftArrow from "../../assets/left-arrow.svg";
import rightArrow from "../../assets/arrow-right.svg";
import {statData} from "../../data";
import {
    TArticle,
    TSearchResults,
    TStatResults,
    TTotalDocsResult,
} from "../../types";
import ArticleCard from "../ArticleCard/ArticleCard";
import {useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../redux/store";
import {ThreeDots} from "react-loader-spinner";

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
    const [maxResultsNumber, setMaxResultsNumber] = useState(10);

    const stats: TSearchResults = useAppSelector((state: RootState) => state.stats);
    const articlesIDs = useAppSelector((state: RootState) => state.objects);
    const articles: TArticle[] = useAppSelector((state: RootState) => state.articles);

    let slicedArticles = articles.slice(0, maxResultsNumber);

    function getMoreArticles() {
        setMaxResultsNumber(prev => prev + 10)
    }

    return (
        <div>
            <div className={s.firstBlock}>
                <div className={s.paragraphContainer}>
                    <div>
                        <p className={s.paragraph}>Searching. Wait for results</p>
                        <p className={s.text}>Search can take some time, we ask for your patience.</p>
                    </div>
                </div>
                <img className={s.woman} src={woman} alt='woman'/>
            </div>
            <div className={s.statsContainer}>
                <span className={s.stats}>General summary</span>
                <span className={s.foundItems}>{stats[0]?.data?.length} data found</span>
            </div>
            <div className={s.slider}>
                <img className={s.leftArrow} src={leftArrow} alt='left'/>
                <div className={s.cardsContainer}>

                    <div className={s.statNameContainer}>
                        <span>Range</span>
                        <span>Total</span>
                        <span>Risks</span>
                    </div>
                    {
                        stats.length === 0 ?
                            'В данном промежутке времени информация отсутствует' :
                            stats ?
                                stats[0].data?.map((stat: TTotalDocsResult, id) => {
                                    const date = new Date(stat.date);
                                    return <StatsCard range={date.toLocaleDateString('ru-Ru')}
                                                      total={stats[0].data[id]?.value!}
                                                      risks={stats[1].data[id]?.value!}/>
                                })
                                :
                                <div>
                                    <ThreeDots
                                        height="40"
                                        width="30"
                                        radius="9"
                                        color="black"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                </div>
                    }
                </div>
                <img className={statData.length > 8 ? s.activeRightArrow : s.rightArrow} src={rightArrow} alt='right'/>
            </div>
            <div className={s.statsContainer}>
                <span className={s.stats}>List of documents</span>
            </div>
            <div className={s.articleCardWrapper}>
                {
                    articlesIDs ? slicedArticles.map((article, id) => {
                        return <ArticleCard ok={article.ok} id={id}/>
                    }) : 'No articles found in the given time range'
                }
            </div>
            <div className={s.buttonContainer}>
                {slicedArticles.length === articles.length ? '' :
                    <button className={st.showMoreButton} onClick={getMoreArticles}>Show more</button>}
            </div>
        </div>
    )
}