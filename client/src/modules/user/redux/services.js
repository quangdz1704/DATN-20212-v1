import { sendRequest } from '../../../helpers/requestHelper';

export const userServices = {
    getUsers,
    deleteUser,
    createUser,
    editUser
}

function getUsers(queryData) {
    return sendRequest(
        {
            url: `${process.env.REACT_APP_SERVER}/users`,
            method: "GET",
            params: {
                name: queryData?.name ? queryData.name : "",
                page: queryData?.page ? queryData.page : null,
                perPage: queryData?.perPage ? queryData.perPage : null
            }
        },
        false,
        true,
        "manage_user"
    );
}

function deleteUser(id) {
    return sendRequest(
        {
            url: `${process.env.REACT_APP_SERVER}/users/${id}`,
            method: "DELETE"
        },
        true,
        true,
        "manage_user"
    )
}

function createUser(data) {
    return sendRequest(
        {
            url: `${process.env.REACT_APP_SERVER}/users`,
            method: "POST",
            data: data
        },
        true,
        true,
        "manage_user"
    )
}

function editUser(id, data) {
    return sendRequest(
        {
            url: `${process.env.REACT_APP_SERVER}/users/${id}`,
            method: "PATCH",
            data: data
        },
        true,
        true,
        "manage_user"
    )
}