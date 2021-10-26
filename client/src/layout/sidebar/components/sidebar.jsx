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
                                    <p style={{ fontSize: "10px" }}>
                                        <i className="fa fa-circle text-success"></i> Online{" "}
                                    </p>
                                )}
                            </div>
                        </div>
                        <ul className="sidebar-menu" data-widget="tree" ref="sideBarMenu">
                            {/* Trang chủ */}
                            <Item
                                item={{
                                    name: "menu.home",
                                    path: "/home",
                                    icon: "fa fa-home",
                                }}
                            />

                            {/* Trang chủ */}
                            {this.currentRole === "ADMIN" && <Item
                                item={{
                                    name: "menu.user_menu",
                                    path: "/users",
                                    icon: "fa fa-user",
                                }}
                            />
                            }

                            {/* Tài khoản cá nhân */}
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

                            {/* Quản trị của system admin */}
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

                            {/* CRUD ví dụ theo 2 mô hình lấy dữ liệu */}
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


                            {/* Hướng dẫn sử dụng */}
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
        // Tìm active menu
        let activeElement = this.findActiveMenu(this.refs.sideBarMenu);

        if (activeElement !== null) {
            // Update style của các menu cha
            this.updateParentMenus(activeElement);
        }

        /**
         * Fix bug khi menu quá dài, div content-wrapper không dài theo, dẫn đến footer không đặt ở cuối trang
         * Xem code AdminLTE
         */
        window.$(".sidebar-menu").layout();
        window.$(".sidebar-menu").data("lte.layout").fix();
    }
    componentDidMount() {
        /**
         * Yêu cầu AdminLTE tạo lại menu. Ý nghĩa: Khắc phục lỗi với menu của template AdminLTE như sau.
         * Do AdminLTE chỉ quét 1 lần (sự kiện onload) element có data là data-widget = tree để xử lý sự kiện collapse, expand menu
         * Nên khi chọn 1 menu item để chuyển trang, side menu được tạo lại, không được xử lý sự kiện nữa
         * Xem thêm trong adminlte.min.js
         */
        window.$(".sidebar-menu").tree();
    }
}

const mapStates = (state) => state;

const dispatchStateToProps = {};

export default connect(mapStates, dispatchStateToProps)(withTranslate(SideBar));
