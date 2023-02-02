import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
class Layout extends Component {
  state = {};
  render() {
    return (
      <main>
        <Navbar />
        <Outlet />
      </main>
    );
  }
}

export default Layout;
