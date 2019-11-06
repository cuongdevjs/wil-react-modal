import React, { Component } from "react";
import Modal from "wil-react-modal";

export default class Placement extends Component {
  render() {
    return (
      <div>
        <div>
          <button onClick={() => Modal.open("placement_center")}>Center</button>
          <button onClick={() => Modal.open("placement_top")}>Top</button>
          <button onClick={() => Modal.open("placement_right")}>Right</button>
          <button onClick={() => Modal.open("placement_bottom")}>Bottom</button>
          <button onClick={() => Modal.open("placement_left")}>Left</button>
        </div>
        <Modal
          displayName="placement_center"
          animationType="zoom"
          placement="center"
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
                Modal.close("placement_center");
              }}
            >
              Close
            </button>
            <h3>Center</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </Modal>
        <Modal
          displayName="placement_top"
          animationType="slideUp"
          placement="top"
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: 20
            }}
          >
            <button
              type="button"
              onClick={() => {
                Modal.close("placement_top");
              }}
            >
              Close
            </button>
            <h3>Top</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </Modal>
        <Modal
          displayName="placement_right"
          animationType="slideRight"
          placement="right"
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: 20,
              width: 200,
              height: "100%"
            }}
          >
            <button
              type="button"
              onClick={() => {
                Modal.close("placement_right");
              }}
            >
              Close
            </button>
            <h3>Right</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </Modal>
        <Modal
          displayName="placement_bottom"
          animationType="slideDown"
          placement="bottom"
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: 20
            }}
          >
            <button
              type="button"
              onClick={() => {
                Modal.close("placement_bottom");
              }}
            >
              Close
            </button>
            <h3>Bottom</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </Modal>
        <Modal
          displayName="placement_left"
          animationType="slideLeft"
          placement="left"
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: 20,
              width: 200,
              height: "100%"
            }}
          >
            <button
              type="button"
              onClick={() => {
                Modal.close("placement_left");
              }}
            >
              Close
            </button>
            <h3>Left</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}
