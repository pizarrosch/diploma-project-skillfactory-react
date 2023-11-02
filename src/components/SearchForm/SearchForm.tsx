import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import s from './SearchForm.module.scss';
import st from '../Main/Main.module.scss';
import document from '../../assets/Document.svg';
import folders from '../../assets/Folders.svg';
import manLookingOut from '../../assets/man-looking-out.svg';
import {Link} from "react-router-dom";
import axios from "axios";
import {TEncodedIds, TSearchData, TSearchResults} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../redux/store";
import localStorage from "redux-persist/es/storage";
import {getStats} from "../../redux/slices/statsSlice";
import {getItems} from "../../redux/slices/objectsSlice";
import {getArticles} from "../../redux/slices/articlesSlice";
import {count} from "../../redux/slices/eventFiltersSlice";
import {checkboxData} from "../../data";
import Checkbox from "../Checkbox/Checkbox";
import {checkOptions, checkStatus, deleteStatus} from "../../redux/slices/checkboxSlice";
import checkmark from "../../assets/checkmark.svg";

export default function SearchForm() {

    const [isChecked, setIsChecked] = useState(false);
    const [innValue, setInnValue] = useState('');
    const [docsAmount, setDocsAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const checkboxOptions = useAppSelector((state: RootState) => state.checkboxOptions);
    const checkboxStatus = useAppSelector((state: RootState) => state.checkboxStatus);
    const objectsArr = useAppSelector((state: RootState) => state.objects.items);
    const usedLimit = useAppSelector((state: RootState) => state.tariffLimits.eventFiltersInfo.usedCompanyCount);

    const encodedIds = objectsArr.map((item) => item.encodedId)
    const dispatch = useAppDispatch();

    const SEARCH_DATA: TSearchData = {
        intervalType: 'month',
        attributeFilters: {
            excludeTechNews: checkboxOptions[4].status,
            excludeDigests: checkboxOptions[6].status,
            excludeAnnouncements: checkboxOptions[5].status
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
                        inBusinessNews: checkboxOptions[1].status,
                        maxFullness: checkboxOptions[0].status
                    }
                ]
            },
            onlyMainRole: checkboxOptions[2].status,
            tonality: "any",
            onlyWithRiskFactors: checkboxOptions[3].status,
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
                .then(response => {
                    dispatch(getStats(response.data.data.map((resultData: TSearchResults[]) => resultData)));
                    dispatch(count())
                });
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
        const target = e.currentTarget as HTMLDivElement;
       checkboxStatus.map((checkbox, id) => {
           const statusIndex = checkboxStatus.findIndex(status => status.id === checkbox.id);
           if (Number(target.id) === statusIndex && !checkbox.active && !checkboxOptions[id].status) {
                dispatch(checkStatus({
                   active: true,
                   id: id
               }));

                dispatch(checkOptions({
                    status: true,
                    id: id,
                    option: checkboxData[id].english
                }))
           } else if (Number(target.id) === statusIndex && checkbox.active && checkboxOptions[id].status) {
               dispatch(checkStatus({
                   active: false,
                   id: id
               }));

               dispatch(checkOptions({
                   status: false,
                   id: id,
                   option: checkboxData[id].english
               }))
           } else if (Number(target.id) === statusIndex && !checkbox.active && checkboxOptions[id].status) {
               dispatch(checkOptions({
                   status: false,
                   id: id,
                   option: checkboxData[id].english
               }))

               dispatch(checkStatus({
                   active: true,
                   id: id
               }));
           } else if (Number(target.id) === statusIndex && checkbox.active && !checkboxOptions[id].status) {
               dispatch(checkOptions({
                   status: true,
                   id: id,
                   option: checkboxData[id].english
               }))

               dispatch(checkStatus({
                   active: false,
                   id: id
               }));
           }
       })
    }

    function handleInnValue(e: React.ChangeEvent, ) {
        const target = e.target as HTMLInputElement;
        setInnValue(target.value);
    }

    function pasteInn(e:React.ClipboardEvent) {
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
                                    onPaste={pasteInn}
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
                            {checkboxData.map((item, id) => {
                                return (
                                    <>
                                        <Checkbox children={item.russian} id={id} onClick={handleCheck} isChecked={checkboxStatus[id].active}/>
                                    </>
                                    )
                                })}
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