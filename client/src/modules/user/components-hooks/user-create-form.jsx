import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { DialogModal, ErrorLabel, SelectBox } from '../../../common-components';
import { userActions } from '../redux/actions';

function UserCreateForm(props) {

    // Khởi tạo state
    const [state, setState] = useState({
        name: "",
        phone: "",
        email: "",
        role: "CUSTOMER",
        password: "electric123",
    })

    const { translate, user, page, perPage } = props;
    const { name, phone, email, password, role, errName, errPhone, errRole, errEmail } = state;


    /**
     * Hàm dùng để kiểm tra xem form đã được validate hay chưa
     */
    const isFormValidated = () => {
        const { errName, errPhone, errRole, errEmail } = state;
        if (errName || errPhone || errEmail || errRole) {
            return false;
        }
        return true;
    }


    /**
     * Hàm dùng để lưu thông tin của form và gọi service tạo mới ví dụ
     */
    const save = () => {
        if (isFormValidated()) {
            props.createUser({ name, email, password, phone, role });
            props.getUsers({
                name: "",
                page: page,
                perPage: perPage
            });
        }
    }


    /**
     * Hàm xử lý khi mô tả ví dụ thay đổi
     * @param {*} e 
     */
    const handlePhone = (e) => {
        const { value } = e.target;
        setState({
            ...state,
            phone: value
        });
    }

    /**
     * Hàm xử lý khi mô tả ví dụ thay đổi
     * @param {*} e 
     */
    const handleEmail = (e) => {
        const { value } = e.target;
        setState({
            ...state,
            email: value
        });
    }

    /**
     * Hàm xử lý khi mô tả ví dụ thay đổi
     * @param {*} e 
     */
    const handleName = (e) => {
        const { value } = e.target;
        setState({
            ...state,
            name: value
        });
    }

    const handleChangeRole = (value) => {
        setState(state => {
            return {
                ...state,
                role: value[0]
            }
        })
    }

    return (
        <React.Fragment>
            <DialogModal
                modalID="modal-create-user-hooks" isLoading={user.isLoading}
                formID="form-create-user-hooks"
                title="Tạo người dùng mới"
                msg_success={translate('manage_example.add_success')}
                msg_faile={translate('manage_example.add_fail')}
                func={save}
                disableSubmit={!isFormValidated()}
                size={50}
                maxWidth={500}
            >
                <form id="form-create-user-hooks" onSubmit={() => save(translate('manage_example.add_success'))}>
                    {/* Tên */}
                    <div className={`form-group ${!errName ? "" : "has-error"}`}>
                        <label>Tên<span className="text-red">*</span></label>
                        <input type="text" className="form-control" value={name} onChange={handleName}></input>
                        <ErrorLabel content={errName} />
                    </div>
                    {/* email */}
                    <div className={`form-group ${!errEmail ? "" : "has-error"}`}>
                        <label>Email<span className="text-red">*</span></label>
                        <input type="text" className="form-control" value={email} onChange={handleEmail}></input>
                        <ErrorLabel content={errEmail} />
                    </div>
                    {/* số đth */}
                    <div className={`form-group ${!errPhone ? "" : "has-error"}`}>
                        <label>Số điện thoại<span className="text-red">*</span></label>
                        <input type="text" className="form-control" value={phone} onChange={handlePhone}></input>
                        <ErrorLabel content={errPhone} />
                    </div>

                    {/* Vai trò */}
                    <div className={`form-group ${!errRole ? "" : "has-error"}`}>
                        <label>Vai trò<span className="text-red">*</span></label>
                        <SelectBox
                            id={"create-user-form"}
                            className="form-control select2"
                            style={{ width: "100%" }}
                            items={[
                                {value: "ADMIN", text: "Admin"},
                                {value: "CUSTOMER", text: "Customer"}
                            ]}
                            value={role}
                            onChange={(value) => handleChangeRole(value)}
                            multiple={false}
                        />
                        <ErrorLabel content={errRole} />
                    </div>
                </form>
            </DialogModal>
        </React.Fragment>
    );
}

function mapState(state) {
    const user = state.user;
    return { user }
}

const actions = {
    createUser: userActions.createUser,
    getUsers: userActions.getUsers,
}

const connectedUserCreateForm = connect(mapState, actions)(withTranslate(UserCreateForm));
export { connectedUserCreateForm as UserCreateForm };

