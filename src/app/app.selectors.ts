import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TwitterDataState,TwitterDataFeatureKey} from './reducers';

export const selectTwitterDataState = createFeatureSelector<TwitterDataState>(TwitterDataFeatureKey);

// create a memoized function so that the Objservable
// map operation will not be executed unless there is a change to state['twitterData']
export const twitterDataSelector = createSelector(
    selectTwitterDataState,
    (twitterData) => twitterData
);