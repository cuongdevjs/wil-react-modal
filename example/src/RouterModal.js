import React, { Component } from "react";
import Modal from "wil-react-modal";
import dataPosts from "./dataPosts";

export default class RouterModal extends Component {
  render() {
    return (
      <div>
        <div>
          <button
            onClick={() =>
              Modal.open("post1", {
                historyPushTitle: "Router Modal Post 1",
                historyPushUrl: "router-modal-post1.html"
              })
            }
          >
            Router Modal
          </button>
        </div>
        {dataPosts.map(post => {
          return (
            <Modal displayName={post.id} fullScreen underlayColor="#fff">
              <div className="router-modal">
                <button
                  className="router-modal__close"
                  type="button"
                  onClick={() => Modal.close(post.id)}
                >
                  Close
                </button>
                <div className="react-modal__content">
                  <button
                    type="button"
                    onClick={() => {
                      Modal.close(post.id);
                      Modal.open(post.next.to, {
                        historyPushTitle: post.next.title,
                        historyPushUrl: post.next.url
                      });
                    }}
                  >
                    {post.next.title}
                  </button>
                  <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </div>
              </div>
            </Modal>
          );
        })}
      </div>
    );
  }
}
