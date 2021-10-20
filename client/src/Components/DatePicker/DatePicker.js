import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {FormGroup} from "react-bootstrap";

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);

        this.state = {
            selectedDay: '',
            today: new Date()
        };
    }

    handleDayClick(day, { selected }) {
        this.setState({
            selectedDay: selected ? '' : day,
        });
        this.props.setDateSelected(selected ? '' : day)
    }

    render() {
        return (
            <FormGroup>
                <DayPicker
                    fromMonth={this.state.today}
                    fixedWeeks
                    selectedDays={this.state.selectedDay}
                    onDayClick={this.handleDayClick}
                    initialMonth={this.state.today}
                    disabledDays={[{daysOfWeek: [0,6]}, {before: this.state.today }]}
                />
                <p>{this.state.selectedDay ? this.state.selectedDay.toLocaleDateString() : 'Please select a date.'}</p>
            </FormGroup>
        );
    }
}

export default DatePicker