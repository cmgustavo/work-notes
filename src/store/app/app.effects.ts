import {Effect} from '../index';
import {appSuccess, appFailed} from './index';

export const initialize =
  (): Effect<Promise<any>> => async (dispatch, getState) => {
    const {APP} = getState();
    try {
      dispatch(appSuccess());
    } catch (error: any) {
      dispatch(appFailed());
    }
  };
