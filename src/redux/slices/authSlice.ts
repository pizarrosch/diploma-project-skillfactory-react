import {ActionCreator, ActionCreatorWithPayload, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'authorization',
    initialState: '',
    reducers: {
        authorize: (state: string, action: PayloadAction<string>) => {
            return action.payload;
        }
    }
})

export const {authorize} = authSlice.actions;