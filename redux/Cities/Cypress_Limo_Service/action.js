import * as api from "../../../api";
import { CmsActionTypes } from "./types";

// action creators

// get fleet
export const getCypressLimoPage = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCypressLimoPage();
    dispatch({
      type: CmsActionTypes.FETCH_CYPRESS_LIMO_PAGE,
      payload: data.modifiedResponse,
    });
  } catch (error) {
    
    dispatch({
      type: CmsActionTypes.FETCH_CYPRESS_LIMO_PAGE_ERROR,
      payload: error.message,
    });
  }
};
