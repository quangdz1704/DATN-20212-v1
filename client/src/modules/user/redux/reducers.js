import { userConstant } from './constants';

var findIndex = (array, id) => {
    var result = -1;
    array.forEach((value, index) => {
        if (value._id === id) {
            result = index;
        }
    });
    return result;
}

const initialState = {
    lists: [],
    user: {},
    isLoading: true,
    error: null,
    totalList: 0,
}

export function user(state = initialState, action) {
    let index = -1;
    switch (action.type) {
        case userConstant.GET_ALL_USERS_REQUEST:
        case userConstant.DELETE_USER_REQUEST:
        case userConstant.CREATE_USER_REQUEST:
        case userConstant.EDIT_USER_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case userConstant.GET_ALL_USERS_FAILURE:
        case userConstant.DELETE_USER_FAILURE:
        case userConstant.CREATE_USER_FAILURE:
        case userConstant.EDIT_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case userConstant.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                lists: action.payload.data,
                totalList: action.payload.totalList,
                isLoading: false
            }
        case userConstant.DELETE_USER_SUCCESS:
            return {
                ...state,
                lists: state.lists.filter(example => (example?._id !== action.payload?._id)),
                isLoading: false
            }
        case userConstant.CREATE_USER_SUCCESS:
            console.log('1111', action.payload);
            return {
                ...state,
                lists: [
                    ...state.lists,
                    action.payload.newUser
                ],
                isLoading: false
            }
        case userConstant.EDIT_USER_SUCCESS:
            index = findIndex(state.lists, action.payload._id);
            if (index !== -1) {
                state.lists[index] = action.payload
            }
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}