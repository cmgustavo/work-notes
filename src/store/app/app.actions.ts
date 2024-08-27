import {AppActionType, AppActionTypes, AppTheme} from './app.types';

export const appSuccess = (): AppActionType => ({
  type: AppActionTypes.APP_SUCCESS,
});

export const appFailed = (): AppActionType => ({
  type: AppActionTypes.APP_FAILED,
});

export const appTheme = (theme: AppTheme): AppActionType => ({
  type: AppActionTypes.APP_THEME,
  payload: theme,
});
