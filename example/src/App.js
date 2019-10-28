import React, { Component } from "react";
import Foo from "./Foo";
import Modal from "wil-react-modal";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div>
          <button onClick={() => Modal.open("basic")}>Modal Basic</button>
        </div>
        <Modal displayName="basic" animationType="fade" onOpenEnd={console.log}>
          <div style={{ backgroundColor: "#fff", padding: 30 }}>
            <h2>Modal Basic</h2>
            <button type="button" onClick={() => Modal.close("basic")}>
              Close
            </button>
          </div>
        </Modal>

        <br />
        <br />
        <Foo buttonText="Open Modal Basic From Foo.js" />
        <br />
        <br />

        <button type="button" onClick={() => Modal.open("login")}>
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            Modal.open("register");
          }}
        >
          Register
        </button>
        <Modal displayName="login" placement="center" animationType="zoom">
          <div
            style={{
              backgroundColor: "#fff",
              maxWidth: 500,
              padding: 20,
              margin: 10
            }}
          >
            <button
              type="button"
              onClick={() => {
                Modal.close("login");
              }}
            >
              Close
            </button>
            <h3>Login</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book. Lorem Ipsum is simply dummy text
              of the printing and typesetting industry. Lorem Ipsum has been the
              industry standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type
              specimen book. Lorem Ipsum is simply dummy text of the printing
              and typesetting industry. Lorem Ipsum has been the industry
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type specimen
              book. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book.
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <button
              type="button"
              onClick={() => {
                Modal.close("login");
                Modal.open("register");
              }}
            >
              Register
            </button>
          </div>
        </Modal>
        <Modal displayName="register" placement="center" animationType="zoom">
          <div
            style={{
              backgroundColor: "#fff",
              maxWidth: 500,
              padding: 20,
              margin: 10
            }}
          >
            <button
              type="button"
              onClick={() => {
                Modal.close("register");
              }}
            >
              Close
            </button>
            <h3>Register</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <button
              type="button"
              onClick={() => {
                Modal.close("register");
                Modal.open("login");
              }}
            >
              Login
            </button>
          </div>
        </Modal>

        <div>
          <h2>Modal</h2>
          <button
            type="button"
            onClick={() => {
              Modal.open("aaa");
            }}
          >
            Open
          </button>
        </div>
        <Modal
          displayName="aaa"
          placement="center"
          animationType="fadeLeft"
          underlayColor="red"
        >
          <div
            style={{
              backgroundColor: "#fff",
              maxWidth: 500,
              padding: 20,
              margin: 10
            }}
          >
            <button
              type="button"
              onClick={() => {
                Modal.close("aaa");
              }}
            >
              Close
            </button>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </div>
        </Modal>

        <div>
          <h2>Modal Test FullScreen</h2>
          <button type="button" onClick={() => Modal.open("demoFadeDown")}>
            Open
          </button>
        </div>
        <Modal
          fullScreen
          displayName="demoFadeDown"
          placement="center"
          animationType="fadeDown"
          underlayColor="transparent"
        >
          <div
            style={{
              backgroundColor: "#000",
              width: "100%",
              height: "100%"
            }}
          >
            <button type="button" onClick={() => Modal.close("demoFadeDown")}>
              Close
            </button>
          </div>
        </Modal>

        <div>
          <h2>Modal Nested</h2>
          <button type="button" onClick={() => Modal.open("nested1")}>
            Open
          </button>
        </div>
        <Modal displayName="nested1" placement="center" animationType="zoom">
          <div
            style={{
              backgroundColor: "#fff",
              maxWidth: 500,
              padding: 20,
              margin: 10
            }}
          >
            <h2>Modal Center</h2>
            <button type="button" onClick={() => Modal.close("nested1")}>
              Close
            </button>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <div>
              <button type="button" onClick={() => Modal.open("nested2")}>
                Open Modal Nested
              </button>
            </div>
            <Modal
              displayName="nested2"
              placement="top"
              animationType="slideUp"
            >
              <div
                style={{
                  backgroundColor: "#fff"
                }}
              >
                <h2>Modal Top</h2>
                <div>
                  <button type="button" onClick={() => Modal.open("nested3")}>
                    Open Modal Nested
                  </button>
                </div>
                <Modal
                  displayName="nested3"
                  placement="right"
                  animationType="slideRight"
                >
                  <div
                    style={{
                      backgroundColor: "#fff",
                      width: 200,
                      height: "100%"
                    }}
                  >
                    <h2>Modal Right</h2>
                    <button
                      type="button"
                      onClick={() => Modal.close("nested3")}
                    >
                      Close
                    </button>
                  </div>
                </Modal>
                <button type="button" onClick={() => Modal.close("nested2")}>
                  Close
                </button>
              </div>
            </Modal>
          </div>
        </Modal>

        <Modal
          displayName="ads"
          isVisible
          underlayEnabled={false}
          placement="bottom"
          animationType="slideDown"
          scrollTargetEnabled
        >
          <div
            style={{
              backgroundColor: "#000",
              color: "#fff"
            }}
          >
            <h2>Modal auto visible</h2>
            <button type="button" onClick={() => Modal.close("ads")}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
