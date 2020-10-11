import React from "react";
import DatePicker from "react-datepicker";

import { FormGroup, Label, InputGroupAddon, InputGroupText } from "reactstrap";

require("react-datepicker/dist/react-datepicker.css");
// import { Form } from 'formik';
import moment from "moment";

export default class PortDate extends React.Component {

  constructor(props) {
    super(props);
  const dateValue = props.initialDate
    ? moment(this.props.initialDate).toDate()
    : "";
    this.state = {
      dateValue
    };
  }

  handleChange = (date) => {
     
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;

    this.setState({
      dateValue: date,
    });
    setFieldTouched(name, true, true);
    setFieldValue(name, date, true);
  
   // debugger;
  };

  render() {
    const {
      label,
      field,
      form: { touched, errors },
    } = this.props;

    return (
      <FormGroup>
        <Label>{label}</Label>
        <div className="input-group">
          <Label>
            <DatePicker
              selected={this.state.dateValue}
              onChange={this.handleChange}
              peekNextMounth
              showMonthDropdown
              showYearDropdown
              maxDate={new Date()}
              dropdownMode="select"
              className="form-control"
            />
          </Label>
        </div>
        {touched[field.name] && errors[field.name] && (
          <div className="error">{errors[field.name]}</div>
        )}
      </FormGroup>
    );
  }
}


