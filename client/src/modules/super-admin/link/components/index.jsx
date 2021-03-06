import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';

import { LinkActions } from '../redux/actions';

import { ToolTip, SearchBar, DataTableSetting, PaginateBar } from '../../../../common-components';

import LinkInfoForm from './linkInfoForm';
import { getTableConfiguration } from '../../../../helpers/tableConfiguration';
class ManageLink extends Component {
    constructor(props) {
        super(props);
        const tableId = "table-manage-link";
        const defaultConfig = { limit: 10 }
        const limit = getTableConfiguration(tableId, defaultConfig).limit;

        this.state = {
            tableId,
            limit: limit,
            page: 1,
            option: "url", // Mặc định tìm kiếm theo tên
            value: ""
        }
    }

    setOption = (title, option) => {
        this.setState({
            [title]: option
        });
    }

    searchWithOption = () => {
        let { option, value, limit } = this.state;
        const params = {
            type: "active",
            limit,
            page: 1,
            key: option,
            value
        };
        this.props.getLinks(params);
    }

    setPage = (page) => {
        this.setState({ page });
        let { limit, option, value } = this.state;
        const params = {
            type: "active",
            limit,
            page,
            key: option,
            value
        };
        this.props.getLinks(params);
    }

    setLimit = (number) => {
        this.setState({ limit: number });
        let { page, option, value } = this.state;
        const params = {
            type: "active",
            limit: number,
            page,
            key: option,
            value
        };
        this.props.getLinks(params);
    }

    componentDidMount() {
        let { page, limit } = this.state;
        this.props.getLinks({ type: "active" });
        this.props.getLinks({ type: "active", page, limit });
    }

    // Cac ham xu ly du lieu voi modal
    handleEdit = (link) => {
        this.setState({
            currentRow: link
        }, () => window.$('#modal-edit-link').modal('show'));
    }

    render() {
        const { translate, link } = this.props;
        const { currentRow, tableId } = this.state;

        return (
            <div className="box" style={{ minHeight: '450px' }}>
                <div className="box-body">
                    <React.Fragment>
                        {/* Form hỉnh sửa thông tin   */}
                        {
                            currentRow &&
                            <LinkInfoForm
                                linkId={currentRow._id}
                                linkUrl={currentRow.url}
                                linkDescription={currentRow.description}
                                linkRoles={currentRow.roles.map(role => role && role.roleId ? role.roleId._id : null)}
                            />
                        }

                        {/* Thanh tìm kiếm */}
                        <SearchBar
                            columns={[
                                { title: translate('manage_link.url'), value: 'url' },
                                { title: translate('manage_link.category'), value: 'category' },
                                { title: translate('manage_link.description'), value: 'description' },
                            ]}
                            option={this.state.option}
                            setOption={this.setOption}
                            search={this.searchWithOption}
                        />

                        {/* Bảng dữ liệu */}
                        <table className="table table-hover table-striped table-bordered" id={tableId}>
                            <thead>
                                <tr>
                                    <th>{translate('manage_link.url')}</th>
                                    <th>{translate('manage_link.category')}</th>
                                    <th>{translate('manage_link.description')}</th>
                                    <th>{translate('manage_link.roles')}</th>
                                    <th style={{ width: "120px" }}>
                                        {translate('table.action')}
                                        <DataTableSetting
                                            columnArr={[
                                                translate('manage_link.url'),
                                                translate('manage_link.category'),
                                                translate('manage_link.description'),
                                                translate('manage_link.roles')
                                            ]}
                                            setLimit={this.setLimit}
                                            tableId={tableId}
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    link.listPaginate && link.listPaginate.length > 0 && link.listPaginate.map(link =>
                                        <tr key={link._id}>
                                            <td>{link.url}</td>
                                            <td>{link.category}</td>
                                            <td>{link.description}</td>
                                            <td><ToolTip dataTooltip={link.roles.map(role => role && role.roleId ? role.roleId.name : "")} /></td>
                                            <td style={{ textAlign: 'center' }}>
                                                <a className="edit" onClick={() => this.handleEdit(link)}><i className="material-icons">edit</i></a>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        {
                            link.isLoading ?
                                <div className="table-info-panel">{translate('confirm.loading')}</div> :
                                link.listPaginate && link.listPaginate.length === 0 && <div className="table-info-panel">{translate('confirm.no_data')}</div>
                        }
                        {/* PaginateBar */}
                        <PaginateBar display={link.listPaginate.length} total={link.totalDocs} pageTotal={link.totalPages} currentPage={link.page} func={this.setPage} />
                    </React.Fragment>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { link } = state;
    return { link };
}

const getState = {
    getLinks: LinkActions.get,
    destroy: LinkActions.destroy,
}

export default connect(mapState, getState)(withTranslate(ManageLink));