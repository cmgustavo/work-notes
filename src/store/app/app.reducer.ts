import {AppActionType, AppActionTypes, AppStatus} from './app.types';

export const AppReduxPersistBlackList: (keyof AppState)[] = ['appStatus'];

export interface AppState {
  appStatus: AppStatus;
}

const initialState: AppState = {
  appStatus: 'loading',
};

export const AppReducer = (
  state: AppState = initialState,
  action: AppActionType,
): AppState => {
  switch (action.type) {
    case AppActionTypes.APP_SUCCESS:
      return {
        ...state,
        appStatus: 'success',
      };
    case AppActionTypes.APP_FAILED:
      return {
        ...state,
        appStatus: 'failed',
      };
    default:
      return state;
  }
};
