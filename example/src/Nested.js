import React, { Component } from "react";
import Modal from "wil-react-modal";

export default class Nested extends Component {
  render() {
    return (
      <div>
        <div>
          <button type="button" onClick={() => Modal.open("nested1")}>
            Modal nested
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
      </div>
    );
  }
}
