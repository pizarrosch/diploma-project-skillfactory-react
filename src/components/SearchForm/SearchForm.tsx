import React, {useState} from "react";
import s from './SearchForm.module.scss';
import st from '../Main/Main.module.scss';
import checkmark from '../../assets/checkmark.svg';
import document from '../../assets/Document.svg';
import folders from '../../assets/Folders.svg';
import manLookingOut from '../../assets/man-looking-out.svg';
import {Link} from "react-router-dom";
import {RootState} from "../../redux/store";

export default function SearchForm() {

    const [isChecked, setIsChecked] = useState(false);

    function handleCheck(e: React.MouseEvent) {
        const target = e.currentTarget as HTMLDivElement
        if (target.dataset.index === target.id) {
            target.id && setIsChecked(prev => !prev)
        } else return;
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
                                <input className={s.input} type='number' placeholder='10 цифр' maxLength={10} id='inn'/>
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
                                <input className={s.input} type="number" max={1000} id='amount'
                                       placeholder='От 1 до 1000'/>
                            </div>
                            <div style={{marginTop: '14px'}} className={s['input-container']}>
                                <label htmlFor='range'>Диапазон поиска*</label>
                                <div className={s['date-range-container']}>
                                    <input type='text' className={s['date-input']} placeholder='Дата начала'
                                           onFocus={focus}/>
                                    <div style={{right: '210px'}} className={s['dropdown-arrow']}></div>
                                    <input type='text' className={s['date-input']} placeholder='Дата конца'
                                           onFocus={focus}/>
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
                                <button className={st.searchButton}>
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