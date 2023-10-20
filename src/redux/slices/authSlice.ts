import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'authorization',
    initialState: false,
    reducers: {
        authorize: (state: boolean, action: PayloadAction<boolean>) => {
            return action.payload;
        }
    }
})

export const {authorize} = authSlice.actions;