import React, { Component } from "react";
import Modal from "wil-react-modal";
import Foo from "./Foo";

export default class Animation extends Component {
  renderModal = (title, displayName, animationType, duration = 300) => {
    return (
      <Modal
        displayName={displayName}
        animationType={animationType}
        animationDuration={duration}
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
              Modal.close(displayName);
            }}
          >
            Close
          </button>
          <h3>{title}</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </div>
      </Modal>
    );
  };
  render() {
    return (
      <div>
        <div>
          <button onClick={() => Modal.open("animation_fade")}>Fade</button>
          <button onClick={() => Modal.open("animation_fadeUp")}>
            Fade Up
          </button>
          <button onClick={() => Modal.open("animation_fadeDown")}>
            Fade Down
          </button>
          <button onClick={() => Modal.open("animation_fadeLeft")}>
            Fade Left
          </button>
          <button onClick={() => Modal.open("animation_fadeRight")}>
            Fade Right
          </button>
          <button onClick={() => Modal.open("animation_slideUp")}>
            Slide Up
          </button>
          <button onClick={() => Modal.open("animation_slideDown")}>
            Slide Down
          </button>
          <button onClick={() => Modal.open("animation_slideLeft")}>
            Slide Left
          </button>
          <button onClick={() => Modal.open("animation_slideRight")}>
            Slide Right
          </button>
          <button onClick={() => Modal.open("animation_zoom")}>Zoom</button>
          <button onClick={() => Modal.open("animation_duration")}>
            Animation duration example 1000ms
          </button>
        </div>
        {this.renderModal("Fade", "animation_fade", "fade")}
        {this.renderModal("Fade Up", "animation_fadeUp", "fadeUp")}
        {this.renderModal("Fade Up", "animation_fadeDown", "fadeDown")}
        {this.renderModal("Fade Up", "animation_fadeLeft", "fadeLeft")}
        {this.renderModal("Fade Up", "animation_fadeRight", "fadeRight")}
        {this.renderModal("Slide Up", "animation_slideUp", "slideUp")}
        {this.renderModal("Slide Up", "animation_slideDown", "slideDown")}
        {this.renderModal("Slide Up", "animation_slideLeft", "slideLeft")}
        {this.renderModal("Slide Up", "animation_slideRight", "slideRight")}
        {this.renderModal("Zoom", "animation_zoom", "zoom")}
        {this.renderModal(
          "Animation duration example 1000ms",
          "animation_duration",
          "fadeUp",
          1000
        )}
      </div>
    );
  }
}
