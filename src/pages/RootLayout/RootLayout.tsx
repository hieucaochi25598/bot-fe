import React from "react";
import Logo from "../../assets/logo.svg";

import "./RootLayout.css";
import { Button } from "antd";

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
          <Button
            style={{
              width: 122,
              height: 48,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              border: "1.5px solid #272833",
              fontFamily: "Porter Sans Block",
              fontSize: 20,
              fontWeight: 400,
              marginRight: 16,
              boxShadow: "0px 4px 4px 0px #000000",
            }}
          >
            DATA
          </Button>
          <Button
            style={{
              width: 122,
              height: 48,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              border: "1.5px solid #272833",
              fontFamily: "Porter Sans Block",
              fontSize: 20,
              fontWeight: 400,
              marginRight: 16,
              boxShadow: "0px 4px 4px 0px #000000",
            }}
          >
            AI
          </Button>
          <Button
            style={{
              width: 122,
              height: 48,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              fontFamily: "Porter Sans Block",
              fontSize: 20,
              fontWeight: 400,
              border: "1.5px solid #272833",
              boxShadow: "0px 4px 4px 0px #000000",
            }}
          >
            BOT
          </Button>
        </div>
      </div>
      <div
        style={{
          width: '65vw',
          height: '70vh',
          backgroundColor: "#ffffff",
          borderRadius: 24,
          border: "2px solid #272833",
          margin: "auto",
          marginTop: 16,
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
      </div>
      <Button
        style={{
          width: 177,
          height: 60,
          borderRadius: 8,
          border: "1px solid #ffffff",
          boxShadow: "0px 4px 4px 0px #000000",
          fontFamily: "Porter Sans Block",
          fontSize: 20,
          alignSelf: "center",
          marginTop: 16,
          backgroundColor: "#272833",
          color: "#ffffff",
        }}
      >
        PLAY
      </Button>
    </div>
  );
};

export default RootLayout;
