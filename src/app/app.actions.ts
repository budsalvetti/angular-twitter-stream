import {createAction, props} from "@ngrx/store";

export const twitterDataLoaded = createAction("[WebSocketService] Constructor()", props<{twitterData: object[]}>());


