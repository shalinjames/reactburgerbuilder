import React, { Component } from "react";

import Hoc from "../Hoc/hoc";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount(nextState, nextProps) {
      this.reqInterceptor = axios.interceptors.request.use(
        req => {
          this.setState({ error: null });
          return req;
        },
        error => {
          this.setState({ error: error });
        }
      );
      this.resInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Hoc>
          <Modal
            show={this.state.error}
            modelClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : ""}
          </Modal>
          <WrappedComponent {...this.props} />
        </Hoc>
      );
    }
  };
};
export default withErrorHandler;
