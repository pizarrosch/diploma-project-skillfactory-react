import React, {ChangeEvent, useState} from "react";
import s from './SearchForm.module.scss';
import st from '../Main/Main.module.scss';
import checkmark from '../../assets/checkmark.svg';
import document from '../../assets/Document.svg';
import folders from '../../assets/Folders.svg';
import manLookingOut from '../../assets/man-looking-out.svg';
import {Link} from "react-router-dom";
import axios from "axios";
import {TArticle, TEncodedIds, TSearchData, TSearchResults} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../redux/store";
import localStorage from "redux-persist/es/storage";
import {getStats} from "../../redux/slices/statsSlice";
import {getItems} from "../../redux/slices/objectsSlice";
import {Root} from "react-dom/client";
import {getArticles} from "../../redux/slices/articlesSlice";

export default function SearchForm() {

    const [isChecked, setIsChecked] = useState(false);
    const [innValue, setInnValue] = useState('');
    const [docsAmount, setDocsAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const checkboxStatus = useAppSelector((state: RootState) => state.checkbox);
    const objectsArr = useAppSelector((state: RootState) => state.objects.items);

    const encodedIds = objectsArr.map((item) => item.encodedId)
    const dispatch = useAppDispatch();

    const SEARCH_DATA: TSearchData = {
        intervalType: 'month',
        attributeFilters: {
            excludeTechNews: checkboxStatus.excludeTechNews,
            excludeDigests: checkboxStatus.excludeDigests,
            excludeAnnouncements: checkboxStatus.excludeAnnouncements
        },
        histogramTypes: [
            'totalDocuments',
            'riskFactors'
        ],
        limit: Number(docsAmount),
        similarMode: 'none',
        searchContext: {
            targetSearchEntitiesContext: {
                targetSearchEntities: [
                    {
                        inn: Number(innValue),
                        type: 'company',
                        inBusinessNews: checkboxStatus.inBusinessNews,
                        maxFullness: checkboxStatus.maxFullness
                    }
                ]
            },
            onlyMainRole: checkboxStatus.onlyMainRole,
            tonality: "any",
            onlyWithRiskFactors: checkboxStatus.onlyWithRiskFactors,
        },
        sortDirectionType: "asc",
        sortType: "issueDate",
        issueDateInterval: {
            startDate: startDate, //&& date.toISOString().slice(0, -5) + '+03:00'
            endDate: endDate //&& date.toISOString().slice(0, -5) + '+03:00'
        }
    }

    async function searchDocs(searchData: TSearchData): Promise<void> {
        const token = await localStorage.getItem('token');
        try {
            await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms',
               searchData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                )
                .then(response => dispatch(getStats(response.data.data.map((resultData: TSearchResults[]) => resultData))));
        } catch (err: any) {
            alert (err.message)
        }
    }

    async function searchObjects(searchData: TSearchData): Promise<void> {
        const token = await localStorage.getItem('token');
        try {
            await axios.post('https://gateway.scan-interfax.ru/api/v1/objectsearch',
                searchData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
                .then(response => dispatch(getItems(response.data)));
        } catch (err: any) {
            alert (err.message)
        }
    }

    async function getDocs(ids: TEncodedIds): Promise<void> {
        const token = await localStorage.getItem('token');
        try {
            await axios.post('https://gateway.scan-interfax.ru/api/v1/documents',
                ids,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
                .then(response => dispatch(getArticles(response.data)));
        } catch (err: any) {
            alert (err.message)
        }
    }

    async function sendData() {

        await searchDocs(SEARCH_DATA);
        await searchObjects(SEARCH_DATA);
        await getDocs({ids: encodedIds});
    }

    function handleCheck(e: React.MouseEvent) {
        const target = e.currentTarget as HTMLDivElement
        if (target.dataset.index === target.id) {
            target.id && setIsChecked(prev => !prev)
        } else return;
    }

    function handleInnValue(e: React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setInnValue(target.value);
    }

    function handleDocsAmount(e: React.ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setDocsAmount(target.value);
    }

    function getStartDate(e: ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setStartDate(target.value);
    }

    function getEndDate(e: ChangeEvent) {
        const target = e.target as HTMLInputElement;
        setEndDate(target.value);
    }

    function focus(e: React.FocusEvent) {
        const target = e.target as HTMLInputElement;

        return target.type = 'date';
    }

    return (
        <div className={s.root}>
            <div>
                <div className={s['paragraph-container']}>
                    <div>
                        <p className={s.paragraph}>Найдите необходимые <br/> данные в пару кликов.</p>
                        <p className={s.text}>Задайте параметры поиска. <br/> Чем больше заполните, тем точнее поиск</p>
                    </div>
                </div>
                <div className={s.container}>
                    <div>
                        <form className={s['form-container']}>
                            <div className={s['input-container']}>
                                <label htmlFor='inn'>ИНН компании*</label>
                                <input
                                    className={s.input}
                                    type='number'
                                    placeholder='10 цифр'
                                    maxLength={10} id='inn'
                                    value={innValue}
                                    onChange={handleInnValue}
                                />
                            </div>
                            <div className={s['input-container']}>
                                <label htmlFor='selectTon'>Тональность</label>
                                <select style={{appearance: 'none', paddingLeft: '15px'}} className={s.input}
                                        id='selectTon'>
                                    <option>Любая</option>
                                </select>
                                <div className={s['dropdown-arrow']}></div>
                            </div>
                            <div className={s['input-container']}>
                                <label htmlFor='amount'>Количество документов в выдаче*</label>
                                <input
                                    className={s.input}
                                    type="number" max={1000}
                                    id='amount'
                                    placeholder='От 1 до 1000'
                                    value={docsAmount}
                                    onChange={handleDocsAmount}
                                />
                            </div>
                            <div style={{marginTop: '14px'}} className={s['input-container']}>
                                <label htmlFor='range'>Диапазон поиска*</label>
                                <div className={s['date-range-container']}>
                                    <input type='text' className={s['date-input']} placeholder='Дата начала'
                                           onFocus={focus} onChange={getStartDate}/>
                                    <div style={{right: '210px'}} className={s['dropdown-arrow']}></div>
                                    <input type='text' className={s['date-input']} placeholder='Дата конца'
                                           onFocus={focus} onChange={getEndDate}/>
                                    <div style={{right: '8px'}} className={s['dropdown-arrow']}></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className={s['checkbox-button-container']}>
                        <div className={s['checkbox-options-container']}>
                            <div className={s['checkbox-options-container__option']}>
                                <div className={s['checkbox-input']} id='1' data-index='1' onClick={handleCheck}>
                                    {isChecked && <img className={s.checkmark} src={checkmark} alt='checkmark'/>}
                                </div>
                                <span>Признак максимальной полноты</span>
                            </div>
                            <div className={s['checkbox-options-container__option']} onClick={handleCheck}>
                                <div className={s['checkbox-input']} id='2'>
                                    {isChecked && <img className={s.checkmark} src={checkmark} alt='checkmark'/>}
                                </div>
                                <span>Упоминания в бизнес-контексте</span>
                            </div>
                            <div className={s['checkbox-options-container__option']}>
                                <div className={s['checkbox-input']} id='3'/>
                                <label htmlFor='Главная роль в публикации'>Главная роль в публикации</label>
                            </div>
                            <div className={s['checkbox-options-container__option']}>
                                <div className={s['checkbox-input']} id='4'/>
                                <label htmlFor='Публикации только с риск-факторами'>Публикации только с
                                    риск-факторами</label>
                            </div>
                            <div className={s['checkbox-options-container__option']}>
                                <div className={s['checkbox-input']} id='5'/>
                                <label htmlFor='Включать технические новости рынков'>Включать технические новости
                                    рынков</label>
                            </div>
                            <div className={s['checkbox-options-container__option']}>
                                <div className={s['checkbox-input']} id='6'/>
                                <label htmlFor='Включать анонсы и календари'>Включать анонсы и календари</label>
                            </div>
                            <div className={s['checkbox-options-container__option']}>
                                <div className={s['checkbox-input']} id='7'/>
                                <label htmlFor='Включать сводки новостей'>Включать сводки новостей</label>
                            </div>
                        </div>
                        <div className={s['button-container']}>
                            <Link to={'/results'}>
                                <button className={st.searchButton} onClick={sendData}>
                                    Поиск
                                </button>
                            </Link>
                            <p style={{fontSize: '14px', color: 'rgba(148, 148, 148, 1)'}}>* Обязательные к заполнению
                                поля</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s['image-container']}>
                <div className={s['image-container__images-on-the-top']}>
                    <img src={document} alt='document'/>
                    <img src={folders} alt='folders'/>
                </div>
                <div style={{marginLeft: '60px'}}>
                    <img src={manLookingOut} alt='manLookingOut'/>
                </div>
            </div>
        </div>
    )
}