import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslate } from 'react-redux-multilingual';
import { DepartmentActions } from '../redux/actions';
import { DialogModal, ButtonModal, ErrorLabel, SelectBox } from '../../../../common-components';
import ValidationHelper from '../../../../helpers/validationHelper';

class DepartmentCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            managers: [],
            deputyManagers: [],
            employees: []
        }
    }

    handleAddManager = (e) => {
        this.setState({
            managers: [...this.state.managers, '']
        });
    }

    handleChangeManager = (e, index) => {
        let { managers } = this.state;
        managers[index] = e.target.value;
        this.setState({ managers });
    }

    handleRemoveManager = (index) => {
        let { managers } = this.state;
        managers.splice(index, 1);
        this.setState({ managers });
    }

    handleAddDeputyManager = (e) => {
        this.setState({
            deputyManagers: [...this.state.deputyManagers, '']
        });
    }

    handleChangeDeputyManager = (e, index) => {
        let { deputyManagers } = this.state;
        deputyManagers[index] = e.target.value;
        this.setState({ deputyManagers });
    }

    handleRemoveDeputyManager = (index) => {
        let { deputyManagers } = this.state;
        deputyManagers.splice(index, 1);
        this.setState({ deputyManagers });
    }

    handleAddEmployee = (e) => {
        this.setState({
            employees: [...this.state.employees, '']
        });
    }

    handleChangeEmployee = (e, index) => {
        let { employees } = this.state;
        employees[index] = e.target.value;
        this.setState({ employees });
    }

    handleRemoveEmployee = (index) => {
        let { employees } = this.state;
        employees.splice(index, 1);
        this.setState({ employees });
    }

    /**
     * Validate form
     */
    isFormValidated = () => {
        let { departmentName, departmentDescription } = this.state;
        let { translate } = this.props;
        if (!ValidationHelper.validateName(translate, departmentName).status || !ValidationHelper.validateDescription(translate, departmentDescription).status) return false;
        return true;
    }

    /**
     * Th???c hi???n th??m ????n v??? m???i
     */
    save = () => {
        if (this.isFormValidated()) {
            return this.props.create({
                name: this.state.departmentName,
                description: this.state.departmentDescription,
                managers: this.state.managers,
                deputyManagers: this.state.deputyManagers,
                employees: this.state.employees,
                parent: this.state.departmentParent
            });
        }
    }

    handleParent = (value) => {
        this.setState({
            departmentParent: value[0]
        });
    }

    handleName = (e) => {
        let { value } = e.target;
        let { translate } = this.props;
        let { message } = ValidationHelper.validateName(translate, value, 4, 255);
        this.setState({
            departmentName: value,
            departmentNameError: message
        });
    }

    handleDescription = (e) => {
        let { value } = e.target;
        let { translate } = this.props;
        let { message } = ValidationHelper.validateDescription(translate, value);
        this.setState({
            departmentDescription: value,
            departmentDescriptionError: message
        });
    }

    render() {
        const { translate, department } = this.props;
        const { departmentNameError, departmentDescriptionError } = this.state;

        return (
            <React.Fragment>
                <DialogModal
                    isLoading={department.isLoading}
                    modalID="modal-create-department"
                    formID="form-create-department"
                    title={translate('manage_department.add_title')}
                    func={this.save}
                    disableSubmit={!this.isFormValidated()}
                >
                    {/* Form th??m ????n v??? m???i */}
                    <form id="form-create-department">

                        {/* Th??ng tin v??? ????n v??? */}
                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border"><span>{translate('manage_department.info')}</span></legend>

                            {/* T??n ????n v??? */}
                            <div className={`form-group ${!departmentNameError ? "" : "has-error"}`}>
                                <label>{translate('manage_department.name')}<span className="attention"> * </span></label>
                                <input type="text" className="form-control" onChange={this.handleName} />
                                <ErrorLabel content={departmentNameError} />
                            </div>

                            {/* M?? t??? v??? ????n v??? */}
                            <div className={`form-group ${!departmentDescriptionError ? "" : "has-error"}`}>
                                <label>{translate('manage_department.description')}<span className="attention"> * </span></label>
                                <textarea type="text" className="form-control" onChange={this.handleDescription} />
                                <ErrorLabel content={departmentDescriptionError} />
                            </div>

                            {/* ????n v??? cha */}
                            <div className="form-group">
                                <label>{translate('manage_department.parent')}</label>
                                <SelectBox
                                    id="create-organizational-unit"
                                    className="form-control select2"
                                    style={{ width: "100%" }}
                                    items={[
                                        { text: "Kh??ng c?? ph??ng ban cha" }, ...department.list.map(department => { return { value: department ? department._id : null, text: department ? department.name : "" } })
                                    ]}
                                    onChange={this.handleParent}
                                    multiple={false}
                                />
                            </div>
                        </fieldset>

                        {/* C??c ch???c danh c???a ????n v??? */}
                        <fieldset className="scheduler-border">
                            <legend className="scheduler-border"><span>{translate('manage_department.roles_of_department')}</span></legend>

                            {/* T??n ch???c danh cho tr?????ng ????n v??? */}
                            <div className="form-group">
                                <table className="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th><label>{translate('manage_department.manager_name')}</label></th>
                                            <th style={{ width: '40px' }} className="text-center"><a href="#add-manager" className="text-green" onClick={this.handleAddManager}><i className="material-icons">add_box</i></a></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.managers.length > 0 &&
                                            this.state.managers.map((manager, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder={translate('manage_department.manager_example')}
                                                            value={manager}
                                                            onChange={(e) => this.handleChangeManager(e, index)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <a href="#delete-manager"
                                                            className="text-red"
                                                            style={{ border: 'none' }}
                                                            onClick={() => this.handleRemoveManager(index)}><i className="fa fa-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            {/* T??n ch???c danh cho ph?? ????n v??? */}
                            <div className="form-group">
                                <table className="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th><label>{translate('manage_department.deputy_manager_name')}</label></th>
                                            <th style={{ width: '40px' }} className="text-center"><a href="#add-vicemanager" className="text-green" onClick={this.handleAddDeputyManager}><i className="material-icons">add_box</i></a></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.deputyManagers.length > 0 &&
                                            this.state.deputyManagers.map((vicemanager, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder={translate('manage_department.deputy_manager_example')}
                                                            value={vicemanager}
                                                            onChange={(e) => this.handleChangeDeputyManager(e, index)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <a href="#delete-vice-manager"
                                                            className="text-red"
                                                            style={{ border: 'none' }}
                                                            onClick={() => this.handleRemoveDeputyManager(index)}><i className="fa fa-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            {/* T??n ch???c danh cho nh??n vi??n ????n v??? */}
                            <div className="form-group">
                                <table className="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th><label>{translate('manage_department.employee_name')}</label></th>
                                            <th style={{ width: '40px' }} className="text-center"><a href="#add-employee" className="text-green" onClick={this.handleAddEmployee}><i className="material-icons">add_box</i></a></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.employees.length > 0 &&
                                            this.state.employees.map((employee, index) => {
                                                return <tr key={index}>
                                                    <td>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder={translate('manage_department.employee_example')}
                                                            value={employee}
                                                            onChange={(e) => this.handleChangeEmployee(e, index)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <a href="#delete-employee"
                                                            className="text-red"
                                                            style={{ border: 'none' }}
                                                            onClick={() => this.handleRemoveEmployee(index)}><i className="fa fa-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </fieldset>
                    </form>
                </DialogModal>
            </React.Fragment>
        );
    }
}

function mapState(state) {
    const { department } = state;
    return { department };
}

const getState = {
    create: DepartmentActions.create
}

export default connect(mapState, getState)(withTranslate(DepartmentCreateForm)); 
