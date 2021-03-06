import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { Link } from "react-router-dom";
import { getStorage } from "../../../config";
import GroupItem from "./groupItem";
import Item from "./item";

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.currentRole = getStorage("currentRole")
    }

    checkURL = (urlName, linkArr) => {
        var result = false;
        if (linkArr !== undefined) {
            linkArr.forEach((link) => {
                if (link.url === urlName) {
                    result = true;
                }
            });
        }

        return result;
    };

    render() {
        const { translate, auth } = this.props;
        const { user, links } = this.props.auth;
        return (
            <React.Fragment>
                <aside className="main-sidebar" style={{ minHeight: "100vh" }} >
                    <section className="sidebar">
                        <div className="user-panel" style={{ borderBottom: "0.2px solid #4B545C" }}>
                            <div className="pull-left image">
                                <img src={process.env.REACT_APP_SERVER + auth.user.avatar} className="img-circle" alt="User avatar" />
                            </div>
                            <div className="pull-left info">
                                <p>{user.name || user.firstName + " " + user.surName}</p>
                                {this.checkURL("/notifications", links) ? (
                                    <React.Fragment>
                                        <span
                                            style={{
                                                fontSize: "10px",
                                                marginRight: "10px",
                                            }}
                                        >
                                            <i className="fa fa-circle text-success"></i> Online{" "}
                                        </span>
                                        <Link to="/notifications">
                                            <i className="fa fa-bell text-yellow"></i>
                                            {translate("menu.notifications")}
                                        </Link>
                                    </React.Fragment>
                                ) : (
                                    <p style={{ fontSize: "10px" }} >
                                        <i className="fa fa-circle text-success"></i> Online{" "}
                                    </p>
                                )}
                            </div>
                        </div>
                        <ul className="sidebar-menu" data-widget="tree" ref="sideBarMenu">
                            {/* Trang ch??? */}
                            <Item
                                item={{
                                    name: "menu.home",
                                    path: "/home",
                                    icon: "fa fa-home",
                                }}
                            />

                            {/* Trang ch??? */}
                            {this.currentRole === "ADMIN" && <Item
                                item={{
                                    name: "menu.user_menu",
                                    path: "/users",
                                    icon: "fa fa-user",
                                }}
                            />
                            }

                            {/* T??i kho???n c?? nh??n */}
                            <GroupItem
                                groupItem={{
                                    name: "menu.account",
                                    icon: "fa fa-user-circle",
                                    list: [
                                        {
                                            name: "menu.detail_employee",
                                            icon: "fa fa-user-o",
                                            path: "/hr-detail-employee",
                                        },
                                        {
                                            name: "menu.update_employee",
                                            icon: "fa fa-pencil-square-o",
                                            path: "/hr-update-employee",
                                        },
                                        {
                                            name: "menu.annual_leave_personal",
                                            icon: "fa fa-calendar",
                                            path: "/hr-annual-leave-personal",
                                        },
                                    ],
                                }}
                            />

                            {/* Qu???n tr??? c???a system admin */}
                            <GroupItem
                                groupItem={{
                                    name: "menu.system_administration",
                                    icon: "fa fa-gears",
                                    list: [
                                        {
                                            name: "menu.manage_system",
                                            icon: "fa fa-gear",
                                            path: "/system/settings",
                                        },
                                        {
                                            name: "menu.manage_role",
                                            icon: "fa fa-lock",
                                            path: "/system/roles-default-management",
                                        },
                                        {
                                            name: "menu.manage_link",
                                            icon: "fa fa-link",
                                            path: "/system/links-default-management",
                                        },
                                        {
                                            name: "menu.manage_component",
                                            icon: "fa fa-object-group",
                                            path: "/system/components-default-management",
                                        },
                                    ],
                                }}
                            />

                            {/* CRUD v?? d??? theo 2 m?? h??nh l???y d??? li???u */}
                            <GroupItem
                                groupItem={{
                                    name: "menu.manage_examples",
                                    icon: "fa fa-edit",
                                    list: [
                                        {
                                            name: "menu.manage_examples_1",
                                            icon: "fa fa-circle",
                                            path: "/manage-examples-1",
                                        },
                                        {
                                            name: "menu.manage_examples_hooks_1",
                                            icon: "fa fa-circle",
                                            path: "/manage-examples-hooks-1",
                                        },
                                        {
                                            name: "menu.manage_examples_2",
                                            icon: "fa fa-adjust",
                                            path: "/manage-examples-2",
                                        },
                                        {
                                            name: "menu.manage_examples_hooks_2",
                                            icon: "fa fa-adjust",
                                            path: "/manage-examples-hooks-2",
                                        },
                                    ],
                                }}
                            />
                            {/* Bi????u ?????? */}
                            <GroupItem
                                groupItem={{
                                    name: "menu.dashboard",
                                    icon: "fa fa-edit",
                                    list: [
                                        {
                                            name: "menu.voltage_chart",
                                            icon: "fa fa-circle",
                                            path: "/voltage-chart",
                                        },
                                        {
                                            name: "menu.current_chart",
                                            icon: "fa fa-circle",
                                            path: "/current-chart",
                                        },
                                        {
                                            name: "menu.power_chart",
                                            icon: "fa fa-adjust",
                                            path: "/power-chart",
                                        },
                                    ],
                                }}
                            />


                            {/* H??????ng d????n s???? du??ng */}
                            {/* <Item
                                item={{
                                    name: "menu.user_guide",
                                    path: "/user-guide",
                                    icon: "fa fa-newspaper-o",
                                }}
                            /> */}
                        </ul>
                    </section>
                </aside>
            </React.Fragment>
        );
    }

    findActiveMenu = (element) => {
        if (element.nodeName === "LI" && element.className === "active") {
            return element;
        }
        for (let i = 0; i < element.childNodes.length; ++i) {
            let child = this.findActiveMenu(element.childNodes[i]);
            if (child !== null) {
                return child;
            }
        }
        return null;
    };

    updateParentMenus = (element) => {
        element = element.parentNode;
        if (window.$(element).attr("data-widget") === "tree") {
            return;
        }
        if (element.nodeName === "LI") {
            element.className = "active treeview menu-open";
        }
        this.updateParentMenus(element);
    };

    componentDidUpdate() {
        // T??m active menu
        let activeElement = this.findActiveMenu(this.refs.sideBarMenu);

        if (activeElement !== null) {
            // Update style c???a c??c menu cha
            this.updateParentMenus(activeElement);
        }

        /**
         * Fix bug khi menu qu?? d??i, div content-wrapper kh??ng d??i theo, d???n ?????n footer kh??ng ?????t ??? cu???i trang
         * Xem code AdminLTE
         */
        window.$(".sidebar-menu").layout();
        window.$(".sidebar-menu").data("lte.layout").fix();
    }
    componentDidMount() {
        /**
         * Y??u c???u AdminLTE t???o l???i menu. ?? ngh??a: Kh???c ph???c l???i v???i menu c???a template AdminLTE nh?? sau.
         * Do AdminLTE ch??? qu??t 1 l???n (s??? ki???n onload) element c?? data l?? data-widget = tree ????? x??? l?? s??? ki???n collapse, expand menu
         * N??n khi ch???n 1 menu item ????? chuy???n trang, side menu ???????c t???o l???i, kh??ng ???????c x??? l?? s??? ki???n n???a
         * Xem th??m trong adminlte.min.js
         */
        window.$(".sidebar-menu").tree();
    }
}

const mapStates = (state) => state;

const dispatchStateToProps = {};

export default connect(mapStates, dispatchStateToProps)(withTranslate(SideBar));
