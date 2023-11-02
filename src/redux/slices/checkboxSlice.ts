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
}

export const checkboxStatusSlice = createSlice({
    name: 'checkboxStatus',
    initialState: [] as TCheckboxStatus[],
    reducers: {
        checkStatus: (state: TCheckboxStatus[], action: PayloadAction<TCheckboxStatus>) => {
            let itemIndex = state.findIndex((item: TCheckboxStatus) => item.id === action.payload.id);
            state.splice(itemIndex, 1, {
                active: action.payload.active,
                id: action.payload.id
            });
        },
        initializeStatus: (state: TCheckboxStatus[], action: PayloadAction<TCheckboxStatus>) => {
            state.push({
                active: action.payload.active,
                id: action.payload.id
            });
        },
        deleteStatus: (state: TCheckboxStatus[], action: PayloadAction<number>) => {
            let itemIndex = state.findIndex((item: TCheckboxStatus) => item.id === action.payload);
            state.splice(itemIndex, 1);
        }
    }
})

export const checkboxOptionsSlice = createSlice({
    name: 'checkboxOptions',
    initialState:  {
        maxFullness: false,
        onlyMainRole: false,
        onlyWithRiskFactors: false,
        inBusinessNews: false,
        excludeAnnouncements: false,
        excludeDigests: false,
        excludeTechNews: false
    } as TCheckBoxFilter,
    reducers: {
        checkOptions: (state: TCheckBoxFilter, action: PayloadAction<TCheckBoxFilter>) => {
            return action.payload;
        }
    }
})

export const {initializeStatus, checkStatus, deleteStatus   } = checkboxStatusSlice.actions;
export const {checkOptions} = checkboxOptionsSlice.actions;