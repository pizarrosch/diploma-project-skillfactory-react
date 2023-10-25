import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TEventFiltersInfo} from "../../types";

export const eventFiltersSlice = createSlice({
    name: 'tariffLimits',
    initialState: {
        eventFiltersInfo: {
            usedCompanyCount: 0,
            companyLimit: 0
        }
    } as TEventFiltersInfo,
    reducers: {
        getLimitInfo: (state: TEventFiltersInfo, action: PayloadAction<TEventFiltersInfo>) => {
            return action.payload;
        }
    }
})

export const {getLimitInfo} = eventFiltersSlice.actions;