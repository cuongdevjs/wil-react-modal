import React, { Component } from "react";
import Modal from "wil-react-modal";

export default class CloseTimeOut extends Component {
  render() {
    const TIME_OPEN = 2; // Second
    const TIME_CLOSE = 5; // Second
    return (
      <div>
        <button type="button" onClick={() => Modal.open("modal")}>
          Open modal after 2s and auto close modal after 5s
        </button>
        <Modal
          displayName="modal"
          animationType="zoom"
          placement="center"
          isVisible
          openTimeout={TIME_OPEN}
          autoCloseTimeout={TIME_CLOSE}
        >
          {({ countDown }) => (
            <div
              style={{
                backgroundColor: "#fff",
                maxWidth: 500,
                padding: 20,
                margin: 10
              }}
            >
              <div
                style={{
                  width: countDown < TIME_CLOSE ? "100%" : 0,
                  height: 5,
                  backgroundColor: "red",
                  transition: `all ${TIME_CLOSE - 1}s linear`
                }}
              />
              <button
                type="button"
                onClick={() => {
                  Modal.close("modal");
                }}
              >
                Close
              </button>
              <h3>Close timeout {countDown}</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}
