import React from "react";
import s from './ArticleCard.module.scss';
import st from '../Main/Main.module.scss';
import articleImage1 from '../../assets/article-card-img-1.png';
import {TArticle} from "../../types";
import {unescape} from "querystring";

export default function ArticleCard({ok}: TArticle) {

    const xmlString = ok.content.markup;
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, 'text/xml');

    const date = new Date (ok.issueDate);

    let paragraph = '';
    const paragraphTags = doc.getElementsByTagName('sentence');

    for (let i = 0; i < paragraphTags.length; i++) {
        const newText = paragraphTags[i].childNodes[0].textContent!.replace('&lt;', '<')
        paragraph += newText
        // paragraph.replace(/&gt;/g, '<')
    }

    return (
        <div className={s.root}>
            <div className={s.sourceContainer}>
                <span>{date.toLocaleDateString('ru-Ru')}</span>
                <span className={s.source}>{ok.source.name}</span>
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
                <span className={s.wordCount}>{ok.attributes.wordCount} слов</span>
            </div>
        </div>
    )
}