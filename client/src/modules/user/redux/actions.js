import { userConstant } from './constants';
import { userServices } from './services';

export const userActions = {
    getUsers,
    deleteUser,
    createUser,
    editUser
}

function getUsers(queryData) {
    return (dispatch) => {
        dispatch({
            type: userConstant.GET_ALL_USERS_REQUEST
        });

        userServices
            .getUsers(queryData)
            .then((res) => {
                dispatch({
                    type: userConstant.GET_ALL_USERS_SUCCESS,
                    payload: res.data.content
                });
            })
            .catch((error) => {
                dispatch({
                    type: userConstant.GET_ALL_USERS_FAILURE,
                    error
                });
            });
    }
}

function deleteUser(id) {
    return (dispatch) => {
        dispatch({
            type: userConstant.DELETE_USER_REQUEST
        });

        userServices
            .deleteUser(id)
            .then((res) => {
                dispatch({
                    type: userConstant.DELETE_USER_SUCCESS,
                    payload: res.data.content
                });
            })
            .catch((error) => {
                dispatch({
                    type: userConstant.DELETE_USER_FAILURE,
                    error
                });
            });
    }
}

function createUser(data) {
    return (dispatch) => {
        dispatch({
            type: userConstant.CREATE_USER_REQUEST
        });
        userServices
            .createUser(data)
            .then((res) => {
                dispatch({
                    type: userConstant.CREATE_USER_SUCCESS,
                    payload: res.data.content
                });
            })
            .catch((error) => {
                dispatch({
                    type: userConstant.CREATE_USER_FAILURE,
                    error
                });
            });
    }
}

function editUser(id, data) {
    return (dispatch) => {
        dispatch({
            type: userConstant.EDIT_USER_REQUEST
        });
        userServices
            .editUser(id, data)
            .then((res) => {
                dispatch({
                    type: userConstant.EDIT_USER_SUCCESS,
                    payload: res.data.content
                });
            })
            .catch((error) => {
                dispatch({
                    type: userConstant.EDIT_USER_FAILURE,
                    error
                });
            });
    }
}