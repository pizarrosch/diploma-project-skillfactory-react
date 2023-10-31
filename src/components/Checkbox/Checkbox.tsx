import s from "../SearchForm/SearchForm.module.scss";
import checkmark from "../../assets/checkmark.svg";
import React from "react";

export default function Checkbox({children}: {children: string}) {
    return (
        <div className={s['checkbox-options-container__option']}>
            <div className={s['checkbox-input']} >
                {<img className={s.checkmark} src={checkmark} alt='checkmark'/>}
            </div>
            <span>{children}</span>
        </div>
    )
}