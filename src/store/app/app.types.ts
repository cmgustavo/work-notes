import {ColorSchemeName} from 'react-native';
export type AppStatus = 'loading' | 'success' | 'failed';

export enum AppActionTypes {
  APP_SUCCESS = 'APP/SUCCESS',
  APP_FAILED = 'APP/APP_FAILED',
  APP_THEME = 'APP/THEME',
}

interface AppSuccess {
  type: typeof AppActionTypes.APP_SUCCESS;
}

interface AppFailed {
  type: typeof AppActionTypes.APP_FAILED;
}

interface AppColorScheme {
  type: typeof AppActionTypes.APP_THEME;
  payload: ColorSchemeName;
}

export type AppActionType = AppSuccess | AppFailed | AppColorScheme;
