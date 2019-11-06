import React from "react";
import Modal from "wil-react-modal";

function Foo({ buttonText }) {
  return (
    <div>
      <button
        onClick={() =>
          Modal.open("foo", { name: "Wil React Modal", author: "Wiloke" })
        }
      >
        {buttonText}
      </button>
    </div>
  );
}

export default Foo;
