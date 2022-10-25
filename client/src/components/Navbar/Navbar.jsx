import React from "react";
import "./Navbar.css";

function Navbar({ score }) {
  return (
    <section className="navbar-container">
      <div className="navbar-items">
        <div className="logo">QuizTime</div>
        <div className="score">
          Score: {score}
          &nbsp; &nbsp; &nbsp;
        </div>
      </div>
    </section>
  );
}

export default Navbar;
