import {Effect} from '../index';
import {appSuccess, appFailed} from './index';

export const initializeApp = (): Effect<Promise<any>> => async dispatch => {
  try {
    dispatch(appSuccess());
  } catch (error: any) {
    dispatch(appFailed());
  }
};
