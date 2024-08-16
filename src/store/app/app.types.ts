export type AppStatus = 'loading' | 'success' | 'failed';

export type AppTheme = 'light' | 'dark';

export enum AppActionTypes {
  APP_SUCCESS = 'APP/SUCCESS',
  APP_FAILED = 'APP/APP_FAILED',
}

interface AppSuccess {
  type: typeof AppActionTypes.APP_SUCCESS;
}

interface AppFailed {
  type: typeof AppActionTypes.APP_FAILED;
}

export type AppActionType = AppSuccess | AppFailed;
