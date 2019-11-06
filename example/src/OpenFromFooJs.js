import React, { Component } from "react";
import Modal from "wil-react-modal";
import Foo from "./Foo";

export default class OpenFromFooJs extends Component {
  render() {
    return (
      <div>
        <Foo buttonText="Open Modal Basic From Foo.js and send payload" />
        <Modal displayName="foo" animationType="zoom" onOpenEnd={console.log}>
          {({ payload }) => (
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
                  Modal.close("foo");
                }}
              >
                Close
              </button>
              <h3>Open Modal From Foo.js</h3>
              <p>Payload: {JSON.stringify(payload)}</p>
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
