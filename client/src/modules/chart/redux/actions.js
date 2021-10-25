import { ChartConstants } from "./constants";
import { ChartService } from "./services";
export const PowerActions = {
    getPowerData
}


function getPowerData() {
    return dispatch => {
        dispatch({ type: ChartConstants.GET_POWER_DATA_REQUEST });
        ChartService.getPowerData()
            .then(res => {
                dispatch({
                    type: ChartConstants.GET_POWER_DATA_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: ChartConstants.GET_POWER_DATA_FAILE });
            })
    }
}