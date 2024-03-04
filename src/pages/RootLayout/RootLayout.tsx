import React from "react";
import Logo from "../../assets/logo.svg";

import "./RootLayout.css";

const RootLayout: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#abf600",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          height: 77,
          marginTop: 34,
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ display: "flex" }}>
          <img src={Logo} alt="logo" />
          <div
            style={{
              width: 174,
              height: 20,
              fontFamily: "Zen Dots",
              alignSelf: "center",
              fontSize: 20,
              marginLeft: 16,
            }}
          >
            Connect AI
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "auto",
            marginBottom: "auto",
            marginRight: 200,
          }}
        >
          <button
            style={{
              width: 122,
              height: 50,
              backgroundColor: "#ffffff",
              borderRadius: 10,
              border: "none",
              fontFamily: "Zen Dots",
              fontSize: 20,
              marginRight: 16,
            }}
          >
            Start
          </button>
          <button
            style={{
              width: 122,
              height: 50,
              backgroundColor: "#ffffff",
              borderRadius: 10,
              border: "none",
              fontFamily: "Zen Dots",
              fontSize: 20,
              marginRight: 16,
            }}
          >
            Settings
          </button>
          <button
            style={{
              width: 122,
              height: 50,
              backgroundColor: "#ffffff",
              borderRadius: 10,
              border: "none",
              fontFamily: "Zen Dots",
              fontSize: 20,
            }}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
