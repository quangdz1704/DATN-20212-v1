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
            return {
                ...state,
                isLoading: true,
                error: null
            };


        case ChartConstants.GET_POWER_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                power: action.payload
            };


        case ChartConstants.GET_POWER_DATA_FAILE:
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