import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TArticle} from "../../types";

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: [{
        ok: {
            attributes: {
                isAnnouncement: false,
                isDigest: false,
                isTechNews: false,
                wordCount: 0
            },
            title: {
                text: ''
            },
            content: {
                markup: ''
            },
            issueDate: '',
            source: {
                name: ''
            },
            url: ''
        }
    }] as TArticle[],
    reducers: {
        getArticles: (state: TArticle[], action: PayloadAction<TArticle[]>) => {
            return action.payload;
        },
    }
})

export const {getArticles} = articlesSlice.actions;