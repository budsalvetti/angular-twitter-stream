import {createAction, props} from "@ngrx/store";
import {TwitterDataModel} from "../model/twitter-data.model";

export const twitterDataLoaded = createAction("[WebSocketService] Constructor()", props<TwitterDataModel>());


