import React from "react";
import logo from "@/assets/images/logo.svg";
import "./index.less";
//<img src={logo} className="sidebar-logo" alt="logo" />
const Logo = () => {
  return (
    <div className="sidebar-logo-container">
        <img src={logo} style={{width:200,height:80}} onclick="./dashboard" alt="logo" />
    </div>
  );
};

export default Logo;
