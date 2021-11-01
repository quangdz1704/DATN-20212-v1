import { ChartConstants } from "./constants";

export const CallApiStatus = {
    INITIALIZED: 0,
    CALLING: 1,
    FINISHED: 2,
}
var initState = {
    power: []
}

export function chart(state = initState, action) {

    switch (action.type) {
        case ChartConstants.GET_POWER_DATA_REQUEST:
        case ChartConstants.GET_CURRENT_DATA_REQUEST:
        case ChartConstants.GET_VOLTAGE_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        // Request success
        case ChartConstants.GET_POWER_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                power: action.payload
            };

        case ChartConstants.GET_CURRENT_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                current: action.payload
            };

        case ChartConstants.GET_VOLTAGE_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                voltage: action.payload
            };


        //Request fail
        case ChartConstants.GET_POWER_DATA_FAILE:
        case ChartConstants.GET_CURRENT_DATA_FAILE:
        case ChartConstants.GET_VOLTAGE_DATA_FAILE:
            return {
                ...state,
                isLoading: false,
            };


        default:
            return {
                ...state
            };
    }
}