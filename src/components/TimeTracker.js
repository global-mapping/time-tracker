import React, { Component } from "react";
import { connect } from "react-redux";
import Day from "./Day";
import { saveTimeSheets as saveTimeSheetsAction } from "../actions";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");
const numDays = new Array(7);
numDays.fill(1);

class TimeTracker extends Component {
  logout = e => {
    e.preventDefault();
    this.props.auth.logout();
  };

  handleSave = async () => {
    const { timeSheets, saveTimeSheets } = this.props;
    await saveTimeSheets(timeSheets);
  };

  getDateKey = date => `${date.year()}-${date.month() + 1}-${date.date()}`;

  render() {
    const today = moment();
    const start = moment()
      .subtract(1, "week")
      .startOf("isoWeek")
      .subtract(1, "day");

    let curr = start;
    return (
      <div className="flex-column flex-center">
        <div className="header flex-center">
          <span>Global Mapping Time Tracker</span>
          <div className="button -blue center" onClick={this.handleSave}>
            Guardar
          </div>
          <span>Hola, Juan</span>
          <div className="button -salmon center" onClick={this.logout}>
            Cerrar Sesión
          </div>
        </div>
        <div className="flex-row week">
          {numDays.map((i, k) => {
            curr = curr.add(1, "day");
            return (
              <Day
                key={`day_week1_${k}`}
                title={curr.format("dddd, D MMM YYYY")}
                dateKey={this.getDateKey(curr)}
              />
            );
          })}
        </div>
        <div className="flex-row week">
          {numDays.map((i, k) => {
            curr = curr.add(1, "day");
            return (
              <Day
                key={`day_week2_${k}`}
                title={curr.format("dddd, D MMM YYYY")}
                dateKey={this.getDateKey(curr)}
                isToday={today.isSame(curr, "day")}
              />
            );
          })}
        </div>
        <div className="flex-row week">
          {numDays.map((i, k) => {
            curr = curr.add(1, "day");
            return (
              <Day
                key={`day_week3_${k}`}
                title={curr.format("dddd, D MMM YYYY")}
                dateKey={this.getDateKey(curr)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => ({
  timeSheets: data.timeSheets
});

const mapDispatchToProps = dispatch => ({
  saveTimeSheets: timesheets => dispatch(saveTimeSheetsAction(timesheets))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeTracker);
