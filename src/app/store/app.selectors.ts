import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TwitterDataFeatureKey} from './app.reducers';
import {TwitterDataModel} from "../model/twitter-data.model";

export const selectTwitterDataState = createFeatureSelector<TwitterDataModel>(TwitterDataFeatureKey);

// create a memoized function so that the Observable
// map operation will not be executed unless there is a change to state['twitterData']
export const twitterDataSelector = createSelector(
    selectTwitterDataState,
    (twitterData) => twitterData
);