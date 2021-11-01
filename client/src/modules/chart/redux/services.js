
import {
    sendRequest
} from '../../../helpers/requestHelper';

export const ChartService = {
    getPowerData,
    getCurrentData,
    getVoltageData
};

function getPowerData() {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/chart/power`,
        method: 'GET',
    }, false, false, 'auth');
}

function getCurrentData() {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/chart/current`,
        method: 'GET',
    }, false, false, 'auth');
}

function getVoltageData() {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/chart/voltage`,
        method: 'GET',
    }, false, false, 'auth');
}