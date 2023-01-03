import * as AppActions  from './app.actions'
import {ActionReducerMap, createReducer, on} from '@ngrx/store';
export const TwitterDataFeatureKey = 'twitterData';

export interface AppState {}

export interface TwitterDataState {
    tweetData: object[]
}

//set initial state of twitter data
export const initialTwitterDataState: TwitterDataState = {tweetData: undefined};

// when 'twitterDataLoaded' action is dispatched we will update the store with the new data
export const twitterDataReducer = createReducer(initialTwitterDataState,
    on(AppActions.twitterDataLoaded, (state, action) =>
    { return {tweetData: action.tweetData}
    })
);


export const reducers: ActionReducerMap<AppState> = {
    twitterData: twitterDataReducer
};



