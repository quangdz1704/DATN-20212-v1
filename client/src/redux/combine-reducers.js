import { IntlReducer as Intl } from 'react-redux-multilingual';
import { combineReducers } from 'redux';
import { clearStorage } from '../config';
import { auth } from '../modules/auth/redux/reducers';
//example1
import { example1 } from "../modules/example/example1/redux/reducers";
//example2
import { example2 } from "../modules/example/example2/redux/reducers";
import { newsFeeds } from "../modules/home/redux/reducers";
import { notifications } from '../modules/notification/redux/reducers';
import { socket } from '../modules/socket/redux/reducers';
import { component } from '../modules/super-admin/component/redux/reducers';
import { link } from '../modules/super-admin/link/redux/reducers';
import { modelConfiguration } from '../modules/super-admin/module-configuration/redux/reducers';
import { department } from '../modules/super-admin/organizational-unit/redux/reducers';
import { role } from '../modules/super-admin/role/redux/reducers';
import { system } from '../modules/super-admin/system/redux/reducers';
import { user } from '../modules/super-admin/user/redux/reducers';
import { company } from '../modules/system-admin/company/redux/reducers';
import { rootRoles } from "../modules/system-admin/root-role/redux/reducers";
import { systemComponents } from "../modules/system-admin/system-component/redux/reducers";
import { systemLinks } from '../modules/system-admin/system-link/redux/reducers';
import { systemSetting } from '../modules/system-admin/system-setting/redux/reducers';

const appReducer = combineReducers({
    socket,
    //system
    systemSetting,
    company,
    systemLinks,
    rootRoles,
    systemComponents,

    //admin
    system,
    user,
    role,
    link,
    component,
    department,
    modelConfiguration,

    notifications,
    auth,


    //example1
    example1,

    //example2
    example2,

    Intl,

    newsFeeds
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined;
        clearStorage();
    }

    return appReducer(state, action);
}

export default rootReducer;