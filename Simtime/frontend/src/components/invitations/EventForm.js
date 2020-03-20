import React, { Component } from "react";
import { connect } from "react-redux";
import { addEvent } from "../../actions/events";
import PropTypes from "prop-types";

export class EventForm extends Component {
  // static propTypes = {
  //   addEvent: PropTypes.func.isRequired,
  //   auth: PropTypes.object.isRequired,
  //   event: PropTypes.shape({
  //     host: PropTypes.string,
  //     event_name: PropTypes.string,
  //     event_at: PropTypes.string,
  //     status: PropTypes.string,
  //     message: PropTypes.string
  //   })
  // };

  static propTypes = {
    addEvent: PropTypes.func,
    auth: PropTypes.object,
    event: PropTypes.shape({
      host: PropTypes.string,
      event_name: PropTypes.string,
      event_at: PropTypes.string,
      status: PropTypes.string,
      message: PropTypes.string
    })
  };

  static defaultProps = {
    addEvent: addEvent,
    auth: { user: { id: "", username: "" } },
    event: {
      host: null,
      event_name: "",
      event_at: "",
      status: "CLOSED",
      message: ""
    }
  };

  state = this.props.event;

  //functions
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (host, status) => {
    return e => {
      e.preventDefault();

      const { event_name, event_at, status, message } = this.state;

      const event = {
        host,
        event_name,
        event_at,
        status,
        message
      };

      this.props.addEvent(event);

      this.setState({
        event_name: "",
        event_at: "",
        status: "CLOSED",
        message: ""
      });

      console.log("submit Event");
    };
  };

  render() {
    const { event_name, event_at, message } = this.state;
    const { user } = this.props.auth;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>ADD Event</h2>
        <form onSubmit={this.handleSubmit(user.id, status)}>
          <div className="form-group">
            <label>Host </label>
            <input
              type="text"
              name="host"
              onChange={this.onChange}
              value={user.username}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Event Name </label>
            <input
              type="text"
              name="event_name"
              onChange={this.onChange}
              value={event_name}
            />
          </div>
          <div className="form-group">
            <label>Date </label>
            <input
              type="datetime-local"
              name="event_at"
              onChange={this.onChange}
              value={event_at}
            />
          </div>

          {/* status - 전역에서 공통으로 사용하도록 설정하기 (db화?)*/}
          <div className="form-group">
            <label>Status</label>
            <input
              type="radio"
              name="status"
              onChange={this.onChange}
              value="OPEN"
            />
            OPEN
            <input
              type="radio"
              name="status"
              onChange={this.onChange}
              value="CLOSED"
              checked
            />
            CLOSED
            <input
              type="radio"
              name="status"
              onChange={this.onChange}
              value="PENDING"
            />
            PENDING
          </div>

          <div className="form-group">
            <label>Message</label>
            <input
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
            />
          </div>

          {/* <div className="form-group">
            <label>Select Friends</label>
            <select multiple className="form-control" name="guests">
              {guests.map(guest => (
                <option key={guest}>{guest}</option>
              ))}
            </select>
          </div> */}

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

//후에 친구 목록 getFriends 만들어야함!
export default connect(mapStateToProps, { addEvent })(EventForm);
