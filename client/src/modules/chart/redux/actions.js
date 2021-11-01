import { ChartConstants } from "./constants";
import { ChartService } from "./services";
export const ChartActions = {
    getPowerData,
    getCurrentData,
    getVoltageData,
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

function getCurrentData() {
    return dispatch => {
        dispatch({ type: ChartConstants.GET_CURRENT_DATA_REQUEST });
        ChartService.getCurrentData()
            .then(res => {
                dispatch({
                    type: ChartConstants.GET_CURRENT_DATA_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: ChartConstants.GET_CURRENT_DATA_FAILE });
            })
    }
}

function getVoltageData() {
    return dispatch => {
        dispatch({ type: ChartConstants.GET_VOLTAGE_DATA_REQUEST });
        ChartService.getVoltageData()
            .then(res => {
                dispatch({
                    type: ChartConstants.GET_VOLTAGE_DATA_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(err => {
                dispatch({ type: ChartConstants.GET_CURRENT_DATA_FAILE });
            })
    }
}