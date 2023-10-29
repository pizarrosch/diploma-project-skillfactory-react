import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TAttributeFilters, TIssueDateInterval} from '../../types';

type TCheckBoxFilter = {
    maxFullness: boolean,
    onlyWithRiskFactors: boolean,
    onlyMainRole: boolean,
    inBusinessNews: boolean,
} & TAttributeFilters

export const checkboxSlice = createSlice({
    name: 'checkbox',
    initialState:  {
        inBusinessNews: false,
        onlyWithRiskFactors: false,
        maxFullness: false,
        onlyMainRole: false,
        excludeAnnouncements: false,
        excludeDigests: false,
        excludeTechNews: false,
    } as TCheckBoxFilter,
    reducers: {
        check: (state: TCheckBoxFilter, action: PayloadAction<TCheckBoxFilter>) => {
            return action.payload;
        }
    }
})

export const {check} = checkboxSlice.actions;