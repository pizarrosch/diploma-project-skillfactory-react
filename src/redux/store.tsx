import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./slices/authSlice";
import {eventFiltersSlice} from "./slices/eventFiltersSlice";
import {checkboxSlice} from "./slices/checkboxSlice";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const reducer = combineReducers({
    authorization: authSlice.reducer,
    tariffLimits: eventFiltersSlice.reducer,
    checkbox: checkboxSlice.reducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // @ts-ignore
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store)
