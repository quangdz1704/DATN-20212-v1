
import {
    sendRequest
} from '../../../helpers/requestHelper';

export const ChartService = {
    getPowerData
};

function getPowerData() {
    return sendRequest({
        url: `${process.env.REACT_APP_SERVER}/chart/power`,
        method: 'GET',
    }, false, false, 'auth');
}