import React, { Component } from "react";
import Modal from "wil-react-modal";

export default class FullScreen extends Component {
  render() {
    return (
      <div>
        <div>
          <button type="button" onClick={() => Modal.open("fullscreen")}>
            Modal FullScreen
          </button>
        </div>
        <Modal
          fullScreen
          displayName="fullscreen"
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
            <button type="button" onClick={() => Modal.close("fullscreen")}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
