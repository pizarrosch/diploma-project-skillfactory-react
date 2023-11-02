import s from "../SearchForm/SearchForm.module.scss";
import checkmark from "../../assets/checkmark.svg";
import React from "react";
import {useAppSelector} from "../../hooks/hooks";
import {RootState} from "../../redux/store";

type TCheckboxProps = {
    children: string,
    id: number,
    onClick: (e: React.MouseEvent) => void,
    isChecked: boolean
}

export default function Checkbox({children, id, onClick, isChecked}: TCheckboxProps) {

    const checkboxStatus = useAppSelector((state: RootState) => state.checkboxStatus);

    return (
        <div className={s['checkbox-options-container__option']} id={id.toString()} onClick={onClick}>
            <div className={s['checkbox-input']} >
                {
                    isChecked ? <img className={s.checkmark} src={checkmark} alt='checkmark'/> : ''
                }
            </div>
            <span>{children}</span>
        </div>
    )
}