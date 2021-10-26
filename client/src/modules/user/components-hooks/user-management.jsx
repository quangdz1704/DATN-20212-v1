import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { DataTableSetting, DeleteNotification, PaginateBar } from "../../../common-components";
import { getTableConfiguration } from '../../../helpers/tableConfiguration';
import { userActions } from "../redux/actions";
import { UserCreateForm } from "./user-create-form";
import { UserDetailInfo } from "./user-detail";
import { UserEditForm } from "./user-edit-form";
import { UserImportForm } from "./user-import-form";




function UserManagementTable(props) {
    const getTableId = "table-manage-user-hooks";
    const defaultConfig = { limit: 5 }
    const getLimit = getTableConfiguration(getTableId, defaultConfig).limit;

    // Khởi tạo state
    const [state, setState] = useState({
        name: "",
        page: 1,
        perPage: getLimit,
        tableId: getTableId,
    })

    const { user, translate } = props;
    const { name, page, perPage, currentRow, curentRowDetail, tableId } = state;

    useEffect(() => {
        props.getUsers({ name, page, perPage });
    }, [])

    /**
     * Hàm xử lý khi tên ví dụ thay đổi
     * @param {*} e 
     */
    const handleChangeExampleName = (e) => {
        const { value } = e.target;
        setState({
            ...state,
            name: value
        });
    }


    /**
     * Hàm xử lý khi click nút tìm kiếm
     */
    const handleSubmitSearch = () => {
        props.getUsers({
            name,
            perPage,
            page: 1
        });
        setState({
            ...state,
            page: 1
        });
    }


    /**
     * Hàm xử lý khi click chuyển trang
     * @param {*} pageNumber Số trang định chuyển
     */
    const setPage = (pageNumber) => {
        setState({
            ...state,
            page: parseInt(pageNumber)
        });

        props.getUsers({
            name,
            perPage,
            page: parseInt(pageNumber)
        });
    }


    /**
     * Hàm xử lý thiết lập giới hạn hiển thị số bản ghi
     * @param {*} number số bản ghi sẽ hiển thị
     */
    const setLimit = (number) => {
        setState({
            ...state,
            perPage: parseInt(number),
            page: 1
        });
        props.getUsers({
            name,
            perPage: parseInt(number),
            page: 1
        });
    }


    /**
     * Hàm xử lý khi click xóa 1 ví dụ
     * @param {*} id của ví dụ cần xóa
     */
    const handleDelete = (id) => {
        props.deleteUser(id);
        props.getUsers({
            name,
            perPage,
            page: user && user.lists && user.lists.length === 1 ? page - 1 : page
        });
    }


    /**
     * Hàm xử lý khi click edit một ví vụ
     * @param {*} user thông tin của ví dụ cần chỉnh sửa
     */
    const handleEdit = (user) => {
        setState({
            ...state,
            currentRow: user
        });
        window.$('#modal-edit-user-hooks').modal('show');
    }

    /**
     * Hàm xử lý khi click xem chi tiết một ví dụ
     * @param {*} user thông tin của ví dụ cần xem
     */
    const handleShowDetailInfo = (user) => {
        console.log('quang', user);
        setState({
            ...state,
            curentRowDetail: user,
        });
        window.$(`#modal-detail-info-user-hooks`).modal('show')
    }

    let lists = [];
    if (user) {
        lists = user.lists
    }

    const totalPage = user && Math.ceil(user.totalList / perPage);
console.log('statge', state);
    return (
        <React.Fragment>
            <UserEditForm
                id={currentRow && currentRow._id}
                currentUser={currentRow}
            />

            <UserDetailInfo
                id={curentRowDetail && curentRowDetail._id}
                currentUser={curentRowDetail}
            />

            <UserCreateForm
                page={page}
                perPage={perPage}
            />

            <UserImportForm
                page={page}
                perPage={perPage}
            />

            <div className="box-body qlcv">
                <div className="form-inline">
                    {/* Button thêm mới */}
                    <div className="dropdown pull-right" style={{ marginBottom: 15 }}>
                        <button 
                        type="button" 
                        className="btn btn-success dropdown-toggle pull-right" 
                        onClick={() => window.$('#modal-create-user-hooks').modal('show')} 
                        data-toggle="dropdown" aria-expanded="true" 
                        title={"Thêm mới"} >
                            Thêm mới
                        </button>
                        {/* <ul className="dropdown-menu pull-right" style={{ marginTop: 0 }}>
                            <li><a style={{ cursor: 'pointer' }} onClick={() => window.$('#modal-import-file-example-hooks').modal('show')} title={translate('manage_example.add_multi_example')}>
                                {translate('human_resource.salary.add_import')}</a></li>
                            <li><a style={{ cursor: 'pointer' }} onClick={() => window.$('#modal-create-example-hooks').modal('show')} title={translate('manage_example.add_one_example')}>
                                {translate('manage_example.add_example')}</a></li>
                        </ul> */}
                    </div>

                    {/* Tìm kiếm */}
                    <div className="form-group">
                        <label className="form-control-static">Name</label>
                        <input type="text" className="form-control" name="name" onChange={handleChangeExampleName} placeholder="Name..." autoComplete="off" />
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-success" title={translate('manage_example.search')} onClick={() => handleSubmitSearch()}>{translate('manage_example.search')}</button>
                    </div>
                </div>

                {/* Danh sách các ví dụ */}
                <div id="manage-user-wrapper">
                    <table id={tableId} className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="col-fixed" style={{ width: 60 }}>{translate('manage_example.index')}</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th style={{ width: "120px", textAlign: "center" }}>{translate('table.action')}
                                    <DataTableSetting
                                        tableId={tableId}
                                        tableContainerId="manage-user-wrapper"
                                        tableWidth={"calc(100% + 200px)"}
                                        columnArr={[
                                            translate('manage_example.index'),
                                            "Name",
                                            "Email",
                                            "Role",
                                        ]}
                                        setLimit={setLimit}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(lists && lists.length !== 0) &&
                                lists.map((u, index) => (
                                    <tr key={index}>
                                        <td>{index + 1 + (page - 1) * perPage}</td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.role}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <a className="edit text-green" style={{ width: '5px' }} title={translate('manage_example.detail_info_example')} onClick={() => handleShowDetailInfo(u)}><i className="material-icons">visibility</i></a>
                                            <a className="edit text-yellow" style={{ width: '5px' }} title={translate('manage_example.edit')} onClick={() => handleEdit(u)}><i className="material-icons">edit</i></a>
                                            {u.role !== "ADMIN" && <DeleteNotification
                                                content={translate('manage_example.delete')}
                                                data={{
                                                    id: u._id,
                                                    info: u.name
                                                }}
                                                func={handleDelete}
                                            />}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    {/* PaginateBar */}
                    {user && user.isLoading ?
                        <div className="table-info-panel">{translate('confirm.loading')}</div> :
                        (typeof lists === 'undefined' || lists.length === 0) && <div className="table-info-panel">{translate('confirm.no_data')}</div>
                    }
                </div>
                <PaginateBar
                    pageTotal={totalPage ? totalPage : 0}
                    currentPage={page}
                    display={lists && lists.length !== 0 && lists.length}
                    total={user && user.totalList}
                    func={setPage}
                />
            </div>
        </React.Fragment>
    )
}

function mapState(state) {
    const user = state.user;
    return { user }
}

const actions = {
    getUsers: userActions.getUsers,
    deleteUser: userActions.deleteUser
}

const connectedUserManagementTable = connect(mapState, actions)(withTranslate(UserManagementTable));
export { connectedUserManagementTable as UserManagementTable };

