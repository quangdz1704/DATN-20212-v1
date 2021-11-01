import React from 'react';
import { withTranslate } from "react-redux-multilingual";
import { UserManagementTable } from './user-management';

function UserManagement() {
    return (
        <div className="box" style={{ minHeight: "450px" }}>
            <div className="box-body">
                <UserManagementTable />
            </div>
        </div>
    );
}

export default (withTranslate(UserManagement));