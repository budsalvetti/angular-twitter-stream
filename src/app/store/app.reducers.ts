import * as AppActions  from './app.actions'
import {ActionReducerMap, createReducer, on} from '@ngrx/store';
import {TwitterDataModel} from "../model/twitter-data.model";

export const TwitterDataFeatureKey = 'twitterData';

export interface AppState {}

//set initial state of twitter data
export const initialTwitterDataState: TwitterDataModel = {tweetData: undefined};

// when 'twitterDataLoaded' action is dispatched we will update the store with the new data
export const twitterDataReducer = createReducer(initialTwitterDataState,
    on(AppActions.twitterDataLoaded, (state, action) =>
    { return {tweetData: action.tweetData}
    })
);


export const reducers: ActionReducerMap<AppState> = {
    twitterData: twitterDataReducer
};



