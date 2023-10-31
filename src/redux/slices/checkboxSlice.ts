import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TAttributeFilters} from '../../types';

type TCheckBoxFilter = {
    maxFullness: boolean,
    onlyWithRiskFactors: boolean,
    onlyMainRole: boolean,
    inBusinessNews: boolean,
} & TAttributeFilters

type TCheckboxStatus = {
    active: boolean,
    id: number
} & TCheckBoxFilter

export const checkboxSlice = createSlice({
    name: 'checkbox',
    initialState:  {} as TCheckboxStatus,
    reducers: {
        check: (state: TCheckboxStatus, action: PayloadAction<TCheckboxStatus>) => {
            return action.payload;
        }
    }
})

export const {check} = checkboxSlice.actions;