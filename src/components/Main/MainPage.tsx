import bgImage1 from '../../assets/Image 1.png';
import leftArrow from '../../assets/left-arrow.svg';
import rightArrow from '../../assets/arrow-right.svg';
import sittingMan from '../../assets/sitting-man.svg';
import s from './Main.module.scss';
import Card from "../Card/Card";
import {ImgSource, TTariffCard} from "../../types";
import TariffCard from "../TariffCard/TariffCard";
import {cardContents, tariffCardContents} from '../../data';
import React from 'react';
import {Link} from "react-router-dom";
import {RootState} from "../../redux/store";
import {useAppSelector} from "../../hooks/hooks";

export default function MainPage() {

    const authorized = useAppSelector((state: RootState) => state.authorization);

    return (
        <div className={s.root}>
            <div className={s.publicationSearchContainer}>
                <div>
                    <div>
                        <p className={s.paragraph}>сервис по поиску <br/> публикаций <br/> о компании <br/> по его ИНН
                        </p>
                        <p style={{fontSize: '20px'}}>Комплексный анализ публикаций, получение данных <br/> в формате
                            PDF на электронную почту.</p>
                    </div>
                    { authorized &&
                    <button className={s.getDataByInnButton}>
                        <Link to={'/searchForm'}>
                            Запросить данные
                        </Link>
                    </button>
                    }
                </div>
                <img src={bgImage1} alt='man pointing at the screen'/>
            </div>
            <div>
                <p style={{fontSize: '45px'}} className={s.paragraph}>Почему именно мы</p>
                <div className={s.slider}>
                    <img src={leftArrow} alt='left'/>
                    <div className={s.cardsContainer}>
                        {
                            cardContents.map((cardContent: ImgSource) => {
                                return <Card src={cardContent.src} text={cardContent.text}/>
                            })
                        }
                    </div>
                    <img src={rightArrow} alt='right'/>
                </div>
            </div>
            <img src={sittingMan} alt='sittingMan'/>
            <div>
                <p style={{fontSize: '45px'}} className={s.paragraph}>Наши тарифы</p>
                <div className={s.tariffCardsContainer}>
                    {
                        tariffCardContents.map((tariffCard: TTariffCard) => {
                            return <TariffCard
                                tariffTitle={tariffCard.tariffTitle}
                                tariffDescription={tariffCard.tariffDescription}
                                actualPrice={tariffCard.actualPrice}
                                oldPrice={tariffCard.oldPrice}
                                monthlyRate={tariffCard.monthlyRate}
                                tariffOptions={{
                                    firstOption: tariffCard.tariffOptions.firstOption,
                                    secondOption: tariffCard.tariffOptions.secondOption,
                                    thirdOption: tariffCard.tariffOptions.thirdOption
                                }}
                                backgroundColor={tariffCard.backgroundColor}
                                border={authorized ? tariffCard.border : ''}
                                color={tariffCard.color}
                                src={tariffCard.src}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}