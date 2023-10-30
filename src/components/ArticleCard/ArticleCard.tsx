import React from "react";
import s from './ArticleCard.module.scss';
import st from '../Main/Main.module.scss';
import articleImage1 from '../../assets/article-card-img-1.png';
import {TArticle} from "../../types";

export default function ArticleCard({ok}: TArticle) {

    const xmlString = ok.content.markup;
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');

    let paragraph = '';
    const paragraphTags = doc.getElementsByTagName('sentence');

    for (let i = 0; i < paragraphTags.length; i++) {
        paragraph += paragraphTags[i].childNodes[0].nodeValue + '</br>'
    }

    return (
        <div className={s.root}>
            <div className={s.sourceContainer}>
                <span>21.10.2023</span>
                <span className={s.source}>Комсомольская правда KP.RU</span>
            </div>
            <h2 className={s.title}>{ok.title.text}</h2>
            <div className={s.categoryContainer}>
                            <span className={s.category}>
                                {ok.attributes.isTechNews ? 'Технические новости' :
                                    ok.attributes.isDigest ? 'Анонс' :
                                        ok.attributes.isAnnouncement ? 'Сводка новостей' :
                                            'Разное'
                                }
                            </span>
            </div>
            <img className={s.articleImage} src={ok.url} alt=''/>
            <p className={s.paragraph}>{paragraph}</p>
            <div className={s.cardFooter}>
                <button className={st.readSourceButton}>Читать в источнике</button>
                <span className={s.paragraph}>{ok.attributes.wordCount} слов</span>
            </div>
        </div>
    )
}