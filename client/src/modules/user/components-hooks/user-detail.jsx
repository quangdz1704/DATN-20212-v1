import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import withTranslate from 'react-redux-multilingual/lib/withTranslate';
import { DialogModal } from '../../../common-components';


const UserDetailInfo = (props) => {
    const [state, setState] = useState({
        id: undefined,
    })

    const { translate, user, currentUser, id } = props;

    // Nhận giá trị từ component cha
    useEffect(()=> {
        setState({
            ...state,
            id: id,
            name: currentUser?.name,
            email: currentUser?.email,
            phone: currentUser?.phone,
            role: currentUser?.role,
        })
    }, [id])

    const { name, email, phone, role } = state

    return (
        <React.Fragment>
            <DialogModal
                modalID={`modal-detail-info-user-hooks`} isLoading={user.isLoading}
                title={`Thông tin cá nhân: ${name}`}
                formID={`form-detail-user-hooks`}
                size={50}
                maxWidth={500}
                hasSaveButton={false}
                hasNote={false}
            >
                <form id={`form-detail-user-hooks`}>
                    {/* Tên */}
                    <div className={`form-group`}>
                        <label>Tên:</label>
                        <span> {name}</span>
                    </div>

                    {/* Email*/}
                    <div className={`form-group`}>
                        <label>Email:</label>
                        <span> {email}</span>
                    </div>
                     
                    {/* Số điện thoại */}
                    <div className={`form-group`}>
                        <label>Số điện thoại:</label>
                        <span> {phone}</span>
                    </div>
                    {/* Vai trò */}
                    <div className={`form-group`}>
                        <label>Vai trò:</label>
                        <span> {role}</span>
                    </div>
                </form>
            </DialogModal>
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    const user = state.user;
    return { user };
}

const connectedUserDetailInfo = React.memo(connect(mapStateToProps, null)(withTranslate(UserDetailInfo)));
export { connectedUserDetailInfo as UserDetailInfo };

