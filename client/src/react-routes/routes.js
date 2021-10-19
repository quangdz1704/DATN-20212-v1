import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "../layout/layout";
import Login from "../modules/auth/components/login";
import ResetPassword from "../modules/auth/components/resetPassword";
import { Home } from "../modules/home/components";
import { Introduction } from "../modules/intro/components";
import { NotFound } from "../modules/not-found/components";
import ManageComponent from "../modules/super-admin/component/components";
import ManageLink from "../modules/super-admin/link/components";
import ManageDepartment from "../modules/super-admin/organizational-unit/components";
import ManageRole from "../modules/super-admin/role/components";
import ManageSystem from "../modules/super-admin/system/components";
import ManageUser from "../modules/super-admin/user/components";
import { Company } from "../modules/system-admin/company/components";
import ManageRoleDefault from "../modules/system-admin/root-role/components";
import ComponentsDefaultManagement from "../modules/system-admin/system-component/components";
import { ManageLinkSystem } from "../modules/system-admin/system-link/components";
import { SystemSetting } from "../modules/system-admin/system-setting/components";
import { AuthRoute } from "./authRoute";
import { PrivateRoute } from "./privateRoute";

class Routes extends Component {
    render() {
        const {
            auth,
            company,
            user,
            role,
            link,
            component,
            department,
            employeesManager,
        } = this.props;
        const { password2AlreadyExists, autoRedirectAfterQuestionAnswer } = auth;
        return (
            <React.Fragment>
                <Switch>
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/"
                        component={Introduction}
                    />
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/login"
                        component={Login}
                    />
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/reset-password"
                        component={ResetPassword}
                    />
                    <PrivateRoute
                        isLoading={false}
                        key={"manage_system"}
                        arrPage={[
                            {
                                link: "#",
                                name: "system_administration",
                                icon: "fa fa-key",
                            },
                            {
                                link: "/system/settings",
                                name: "manage_system",
                                icon: "fa fa-gears",
                            },
                        ]}
                        // type='system-admin'
                        auth={auth}
                        exact={true}
                        link={"/system/settings"}
                        path={"/system/settings"}
                        pageName={"manage_system"}
                        layout={Layout}
                        component={SystemSetting}
                    />
                    <PrivateRoute
                        isLoading={this.props.rootRoles.isLoading}
                        key={"manage_roles_default"}
                        arrPage={[
                            {
                                link: "#",
                                name: "system_administration",
                                icon: "fa fa-key",
                            },
                            {
                                link: "/system/roles-default-management",
                                name: "manage_role",
                                icon: "fa fa-lock",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/system/roles-default-management"}
                        path={"/system/roles-default-management"}
                        pageName={"manage_role"}
                        layout={Layout}
                        component={ManageRoleDefault}
                    />
                    <PrivateRoute
                        isLoading={this.props.systemLinks.isLoading}
                        key={"manage_links_default"}
                        arrPage={[
                            {
                                link: "#",
                                name: "system_administration",
                                icon: "fa fa-key",
                            },
                            {
                                link: "/system/links-default-management",
                                name: "manage_link",
                                icon: "fa fa-link",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/system/links-default-management"}
                        path={"/system/links-default-management"}
                        pageName={"manage_link"}
                        layout={Layout}
                        component={ManageLinkSystem}
                    />
                    <PrivateRoute
                        isLoading={this.props.systemComponents.isLoading}
                        key={"manage_components_default"}
                        arrPage={[
                            {
                                link: "#",
                                name: "system_administration",
                                icon: "fa fa-key",
                            },
                            {
                                link: "/system/components-default-management",
                                name: "manage_component",
                                icon: "fa fa-object-group",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/system/components-default-management"}
                        path={"/system/components-default-management"}
                        pageName={"manage_component"}
                        layout={Layout}
                        component={ComponentsDefaultManagement}
                    />
                    <PrivateRoute
                        isLoading={auth.isLoading}
                        key={"home"}
                        arrPage={[
                            { link: "/home", name: "home", icon: "fa fa-home" },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/home"}
                        path={"/home"}
                        pageName={"home"}
                        layout={Layout}
                        component={Home}
                    />
                    <PrivateRoute
                        isLoading={this.props.company.isLoading}
                        key={"companies-management"}
                        arrPage={[
                            {
                                link: "/system/companies-management",
                                name: "manage_company",
                                icon: "fa fa-building",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/system/companies-management"}
                        path={"/system/companies-management"}
                        pageName={"manage_company"}
                        layout={Layout}
                        component={Company}
                    />
                    <PrivateRoute
                        isLoading={this.props.system.isLoading}
                        key={"system-management"}
                        arrPage={[
                            {
                                link: "#",
                                name: "system_administration",
                                icon: "fa fa-key",
                            },
                            {
                                link: "/system-management",
                                name: "manage_system",
                                icon: "fa fa-database",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/system-management"}
                        path={"/system-management"}
                        pageName={"manage_system"}
                        layout={Layout}
                        component={ManageSystem}
                    />
                    <PrivateRoute
                        isLoading={this.props.user.isLoading}
                        key={"users-management"}
                        arrPage={[
                            {
                                link: "#",
                                name: "system_administration",
                                icon: "fa fa-key",
                            },
                            {
                                link: "/users-management",
                                name: "manage_user",
                                icon: "fa fa-users",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/users-management"}
                        path={"/users-management"}
                        pageName={"manage_user"}
                        layout={Layout}
                        component={ManageUser}
                    />
                    <PrivateRoute
                        isLoading={this.props.role.isLoading}
                        arrPage={[
                            {
                                link: "#",
                                name: "system_administration",
                                icon: "fa fa-key",
                            },
                            {
                                link: "/roles-management",
                                name: "manage_role",
                                icon: "fa fa-lock",
                            },
                        ]}
                        key={"roles-management"}
                        auth={auth}
                        exact={true}
                        link={"/roles-management"}
                        path={"/roles-management"}
                        pageName={"manage_role"}
                        layout={Layout}
                        component={ManageRole}
                    />
                    <PrivateRoute
                        isLoading={this.props.link.isLoading}
                        key={"links-management"}
                        arrPage={[
                            {
                                link: "#",
                                name: "system_administration",
                                icon: "fa fa-key",
                            },
                            {
                                link: "/links-management",
                                name: "manage_link",
                                icon: "fa fa-link",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/links-management"}
                        path={"/links-management"}
                        pageName={"manage_link"}
                        layout={Layout}
                        component={ManageLink}
                    />
                    <PrivateRoute
                        isLoading={this.props.department.isLoading}
                        key={"departments-management"}
                        arrPage={[
                            {
                                link: "#",
                                name: "system_administration",
                                icon: "fa fa-key",
                            },
                            {
                                link: "/departments-management",
                                name: "manage_department",
                                icon: "fa fa-sitemap",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/departments-management"}
                        path={"/departments-management"}
                        pageName={"manage_department"}
                        layout={Layout}
                        component={ManageDepartment}
                    />
                    <PrivateRoute
                        isLoading={this.props.component.isLoading}
                        key={"components-management"}
                        arrPage={[
                            {
                                link: "#",
                                name: "system_administration",
                                icon: "fa fa-key",
                            },
                            {
                                link: "/components-management",
                                name: "manage_component",
                                icon: "fa fa-object-group",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/components-management"}
                        path={"/components-management"}
                        pageName={"manage_component"}
                        layout={Layout}
                        component={ManageComponent}
                    />

                    {/* NOT FOUND */}
                    <Route component={NotFound}></Route>
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, null)(Routes);
