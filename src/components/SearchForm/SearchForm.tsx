import React, {useState} from "react";
import s from './SearchForm.module.scss';
import st from '../Main/Main.module.scss';
import checkmark from '../../assets/checkmark.svg';

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
        <div className={s.container}>
            <div>
                <form className={s['form-container']}>
                    <div className={s['input-container']}>
                        <label htmlFor='inn'>ИНН компании*</label>
                        <input className={s.input} type='number' maxLength={10} id='inn'/>
                    </div>
                    <div>
                        <label htmlFor='selectTon'>Тональность</label>
                        <select className={s.input} id='selectTon'>
                            <option>Любая</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='amount'>Количество документов в выдаче*</label>
                        <input className={s.input} type="number" max={1000} id='amount'/>
                    </div>
                    <div>
                        <label htmlFor='range'>Диапазон поиска*</label>
                        <div className={s['date-range-container']}>
                            <input type='text' className={s['date-input']} placeholder='Дата начала' onFocus={focus}/>
                            <input type='text' id='range' className={s['date-input']} placeholder='Дата конца'
                                   onFocus={focus}/>
                        </div>
                    </div>
                </form>
            </div>
            <div className={s['checkbox-button-container']}>
                <div className={s['checkbox-options-container']}>
                    <div className={s['checkbox-options-container__option']}>
                        <div className={s['checkbox-input']} id='1' data-index='1' onClick={handleCheck}>
                            {isChecked && <img className={s.checkmark} src={checkmark} alt='checkmark' />}
                        </div>
                        <span>Признак максимальной полноты</span>
                    </div>
                    <div className={s['checkbox-options-container__option']} onClick={handleCheck}>
                        <div className={s['checkbox-input']} id='2'>
                            {isChecked && <img className={s.checkmark} src={checkmark} alt='checkmark' />}
                        </div>
                        <span>Упоминания в бизнес-контексте</span>
                    </div>
                    <div className={s['checkbox-options-container__option']}>
                        <div className={s['checkbox-input']} id='3'/>
                        <label htmlFor='Главная роль в публикации'>Главная роль в публикации</label>
                    </div>
                    <div className={s['checkbox-options-container__option']}>
                        <div className={s['checkbox-input']} id='4'/>
                        <label htmlFor='Публикации только с риск-факторами'>Публикации только с риск-факторами</label>
                    </div>
                    <div className={s['checkbox-options-container__option']}>
                        <div className={s['checkbox-input']} id='5'/>
                        <label htmlFor='Включать технические новости рынков'>Включать технические новости рынков</label>
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
                    <button className={st.searchButton}>Поиск</button>
                    <p style={{fontSize: '14px', color:'rgba(148, 148, 148, 1)'}}>* Обязательные к заполнению поля</p>
                </div>
            </div>
        </div>
    )
}