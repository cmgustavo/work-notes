import {ColorSchemeName} from 'react-native';
import {Effect} from '../index';
import {appSuccess, appFailed, appTheme} from './index';

export const initializeApp =
  (): Effect<Promise<any>> => async (dispatch, getState) => {
    const {APP} = getState();
    try {
      dispatch(appSuccess());
    } catch (error: any) {
      dispatch(appFailed());
    }
  };
