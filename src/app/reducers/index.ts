import * as AppActions  from '../app.actions'
import {ActionReducer, ActionReducerMap, createReducer, on} from '@ngrx/store';
export const TwitterDataFeatureKey = 'twitterData';
import {TwitterDataModel} from "../model/twitter-data.model";

export interface AppState {}
const initialAppState: AppState = {};

export interface TwitterDataState {
    twitterData: string[]
}

//set initial state of twitter data
export const initialTwitterDataState: TwitterDataState = {twitterData: undefined};

// when 'twitterDataLoaded' action is dispatched we will update the store with the new data
export const twitterDataReducer = createReducer(initialTwitterDataState,
    on(AppActions.twitterDataLoaded, (state, action) =>
    { return {twitterData: action.twitterData}
    })
);


export const reducers: ActionReducerMap<AppState> = {
    twitterData: twitterDataReducer
};

// this is for debugging purposed and will log to the console the before and after states
// for each action dispatched
export function logger(reducer:ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        console.log("state before: ", state);
        console.log("action", action);
        return reducer(state, action);
    }

}

