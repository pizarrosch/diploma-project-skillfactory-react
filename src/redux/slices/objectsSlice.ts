import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TObjectItems} from "../../types";


export const objectsSlice = createSlice({
    name: 'objects',
    initialState: {
        items: [],
        mappings: []
    } as TObjectItems,
    reducers: {
        getItems: (state: TObjectItems, action: PayloadAction<TObjectItems>) => {
            return action.payload;
        },
    }
})

export const {getItems} = objectsSlice.actions;