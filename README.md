# Wil React Modal
Modal Component For React

### Installation

**npm**

```bash
npm install wil-react-modal --save
```

**yarn**

```bash
yarn add wil-react-modal
```

**Example**

#### [https://codesandbox.io/s/wil-react-modal-u7cos](https://codesandbox.io/s/wil-react-modal-u7cos)

```js
import React from "react";
import Modal from "wil-react-modal";

class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => Modal.open("basic")}>Modal Basic</button>

        <Modal displayName="basic" animationType="zoom">
          <div style={{ backgroundColor: "#fff", padding: 30 }}>
            <h2>Modal Basic</h2>
            <button onClick={() => Modal.close("basic")}>Close</button>
          </div>
        </Modal>
      </div>
    )
  }
```

**API**

| Prop                  | Type                                | Default | Description |
| :---------            | :-------:                           | :-----: | :----------- |
| displayName             | `string`                     | -       | Modal name |
| placement             | `"center" | "top" | "right" | "bottom" | "left"`                     | `center`       | The position of the modal relative to the screen |
| animationType           | `"none" | "fade" | "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "slideUp" | "slideDown" | "slideLeft" | "slideRight" | "zoom"`                            | `none`    | animation for modal |
| underlayEnabled             | `boolean`                     | `true`       | On / off modal underlay |
| underlayColor             | `string`                     | `rgba(0, 0, 0, 0.5)`       | Set color for modal underlay |
| fullScreen             | `boolean`                     | `false`       | Content width 100% height 100% |
| scrollTarget             | `string`                     | `window`       | Toggle the scroll bar of the element. Example scrollTarget value: window, #root, ...  |
| scrollTargetEnabled             | `boolean`                     | `false`       | Allow toggle scroll bar  |
| onOpenEnd             | `() => void`                     | -       | Callback executed when modal open  |
| onCloseEnd             | `() => void`                     | -       | Callback executed when modal close  |
| isVisible             | `boolean`                     | -       | Set on / off modal. This attribute is needed when you want to open modal at the beginning without taking action  |

**Methods**

| Method                |  Description |
| :---------            | :----------- |
| open                  | Open modal with prop displayName Modal.open("displayName") |
| close                  | Close modal with prop displayName Modal.close("displayName") |
