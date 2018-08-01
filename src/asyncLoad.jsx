import React, { Component } from 'react';
export default function asyncLoad(cb) {
  return class AsyncComponent extends Component {
    state = {
      component: null,
    };
    async componentWillMount() {
      this.setState({
        component: (await cb()).default,
      });
    }
    render() {
      const { component: Cmp } = this.state;
      if (Cmp) {
        return <Cmp />;
      } else {
        return null;
      }
    }
  };
}