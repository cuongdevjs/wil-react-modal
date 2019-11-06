import React, { Component } from "react";
import Modal from "wil-react-modal";
import Foo from "./Foo";

export default class Basic extends Component {
  render() {
    return (
      <div>
        <div>
          <button onClick={() => Modal.open("basic")}>Modal Basic</button>
        </div>
        <Modal displayName="basic">
          <div style={{ backgroundColor: "#fff", padding: 30 }}>
            <h2>Basic Modal</h2>
            <button type="button" onClick={() => Modal.close("basic")}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
