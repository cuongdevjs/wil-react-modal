import React, { Component } from "react";
import Modal from "wil-react-modal";
import Foo from "./Foo";

export default class AutoVisible extends Component {
  render() {
    return (
      <div>
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
