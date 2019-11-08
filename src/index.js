// @flow
import React, { PureComponent } from "react";
import { createPortal } from "react-dom";
import sleep from "./sleep";
import Emitter from "./emitter";
import isMobile from "./isMobile";
import styles from "./styles.css";

type Props = {
  children: React$Node | (({ payload: any, countDown: number }) => React$Node),
  fullScreen: boolean,
  onOpen: (payload: any) => void,
  onOpenEnd: (payload: any) => void,
  onCloseEnd: () => void,
  placement: "center" | "top" | "right" | "bottom" | "left",
  scrollTarget: string,
  underlayColor: string,
  underlayEnabled: boolean,
  isVisible: boolean,
  scrollTargetEnabled: boolean,
  displayName: string,
  animationDuration: number,
  openTimeout: number,
  autoCloseTimeout: number,
  modalContainerClassName: string,
  modalContainerStyle: Object,
  // eslint-disable-next-line flowtype/space-after-type-colon
  animationType:
    | "none"
    | "fade"
    | "fadeUp"
    | "fadeDown"
    | "fadeLeft"
    | "fadeRight"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "zoom"
};

type State = {
  isAnimated: boolean,
  isVisible: boolean,
  modalId: number,
  scrollBarContentWidth: number,
  scrollY: number,
  payload: any,
  countDown: number
};

const Event: Object = new Emitter();
const ONE_SECOND: number = 1000;
const titleTag: ?HTMLElement = document.querySelector("title");

export default class Modal extends PureComponent<Props, State> {
  static defaultProps = {
    onOpen: (payload: any): void => {},
    onOpenEnd: (payload: any): void => {},
    onCloseEnd: (): void => {},
    fullScreen: false,
    displayName: "",
    placement: "center",
    animationType: "none",
    scrollTarget: "window",
    underlayColor: "rgba(0, 0, 0, 0.5)",
    underlayEnabled: true,
    isVisible: false,
    scrollTargetEnabled: false,
    animationDuration: 300,
    openTimeout: 0,
    autoCloseTimeout: 0,
    modalContainerClassName: "",
    modalContainerStyle: {}
  };

  static open = (displayName: string, state: Object): void => {
    Event.emit(`${displayName}_open`, { displayName, state });
  };

  static close = (displayName: string): void => {
    Event.emit(`${displayName}_close`, displayName);
  };

  state = {
    isAnimated: false,
    isVisible: false,
    modalId: 0,
    scrollBarContentWidth: 0,
    scrollY: 0,
    payload: null,
    countDown: 0
  };

  _open: number;

  _close: number;

  _modalContent: ?HTMLElement;

  _interval: Function;

  _linkBack = window.location.href;

  _titleBack = titleTag ? titleTag.innerText : "";

  async componentDidMount(): Promise<void> {
    const { displayName }: Props = this.props;
    this._open = Event.once(`${displayName}_open`, this._handleEventOpen);
    this._close = Event.once(`${displayName}_close`, this._handleEventClose);
    this._setStartAutoCloseTimeout();
    this._setVisibleModalWithPropVisible("open");
  }

  async componentDidUpdate(prevProps: Props): Promise<void> {
    const { isVisible }: Props = this.props;
    if (prevProps.isVisible !== isVisible) {
      this._setVisibleModalWithPropVisible("all");
    }
  }

  componentWillUnmount(): void {
    Event.off(this._open);
    Event.off(this._close);
    if (isMobile.ios) {
      window.removeEventListener("touchmove", this._fixDisableScrollMobile);
      window.removeEventListener("scroll", this._fixDisableScrollMobile);
    }
    this._interval && clearInterval(this._interval);
    this._interval = null;
  }

  _setModalContentRef = (c: ?HTMLElement): void => {
    this._modalContent = c;
  };

  _setStartAutoCloseTimeout = (): void => {
    const { autoCloseTimeout }: Props = this.props;
    this.setState({
      countDown: autoCloseTimeout
    });
  };

  _setVisibleModalWithPropVisible = (type: string): void => {
    const { isVisible }: Props = this.props;
    if (isVisible) {
      type !== "close" && this._handleOpenModal();
    } else {
      type !== "open" && this._handleCloseModal();
    }
  };

  _setModalVisible = async (value: boolean): Promise<void> => {
    await this.setState({
      isVisible: value
    });
  };

  _setModalAnimated = async (value: boolean): Promise<void> => {
    await this.setState({
      isAnimated: value
    });
  };

  _setModalId = async (): Promise<void> => {
    const date: Object = new Date();
    await this.setState({
      modalId: date.getTime()
    });
  };

  _getUrl = (historyPushUrl: string): string => {
    if (historyPushUrl.search(/^http|wwww\./g) !== -1) {
      return historyPushUrl;
    }
    if (historyPushUrl.search(/^\//g) !== -1) {
      return this._linkBack + historyPushUrl;
    }
    return this._linkBack.match(/.*\//g)[0] + historyPushUrl;
  };

  _handleEventOpen = async ({
    displayName: _displayName,
    state = {}
  }: {
    displayName: string,
    state: Object
  }): Promise<void> => {
    const { displayName }: Props = this.props;
    const { payload }: Object = state;
    if (_displayName === displayName) {
      await this._setModalVisible(true);
      this.setState({
        payload
      });
      this._handleOpenModal(state);
    }
  };

  _handleEventClose = async (_displayName: string): Promise<void> => {
    const { displayName }: Props = this.props;
    if (_displayName === displayName) {
      this._handleCloseModal();
    }
  };

  _setScrollBarOverflow = (overflow: string, paddingRight: number): void => {
    const { scrollTarget }: Props = this.props;
    const $scrollTarget: ?HTMLElement =
      scrollTarget === "window"
        ? document.body
        : document.querySelector(scrollTarget);
    if ($scrollTarget) {
      $scrollTarget.style.overflow = overflow;
      $scrollTarget.style.paddingRight = !!paddingRight
        ? `${paddingRight}px`
        : "";
    }
  };

  _getScrollBarWidth = (scrollTarget: string | ?HTMLElement): number => {
    if (!scrollTarget) {
      return 0;
    }
    if (scrollTarget === "window") {
      return document.documentElement
        ? window.innerWidth - document.documentElement.clientWidth
        : 0;
    }
    if (scrollTarget instanceof Node) {
      return scrollTarget.offsetWidth - scrollTarget.clientWidth;
    }
    const $scrollTarget: ?HTMLElement = document.querySelector(scrollTarget);
    return $scrollTarget
      ? $scrollTarget.offsetWidth - $scrollTarget.clientWidth
      : 0;
  };

  _getLengthModals = (): number => {
    const $modals: Array<?HTMLElement> = [
      ...document.querySelectorAll(".__wil_modal__")
    ];
    return $modals.filter(($modal: ?HTMLElement): boolean => {
      return !!$modal && $modal.getAttribute("data-static") !== "true";
    }).length;
  };

  _getScrollY = (): number => {
    const { scrollTarget }: Props = this.props;
    if (scrollTarget === "window") {
      return window.scrollY;
    }
    const $element: ?HTMLElement = document.querySelector(scrollTarget);
    return $element ? $element.scrollTop : 0;
  };

  _setScrollY = async (): Promise<void> => {
    await this.setState({
      scrollY: this._getScrollY()
    });
  };

  _setCountDown = (callback: Function): Promise<void> => {
    return new Promise((resolve: Function): void => {
      this._interval = setInterval(async (): Promise<void> => {
        await this.setState((prevState: State): {
          countDown: $PropertyType<State, "countDown">
        } => ({
          countDown: prevState.countDown - 1
        }));
        const { countDown }: State = this.state;
        if (countDown === 0) {
          resolve();
          if (callback) callback();
          clearInterval(this._interval);
          this._interval = null;
        }
      }, ONE_SECOND);
    });
  };

  _handleOpenModal = async (state: Object = {}): Promise<void> => {
    const {
      scrollTargetEnabled,
      onOpen,
      onOpenEnd,
      animationType,
      scrollTarget,
      animationDuration,
      openTimeout,
      autoCloseTimeout
    }: Props = this.props;
    const { payload }: Object = state;
    await sleep(openTimeout * ONE_SECOND);
    await this._setScrollY();
    await this._setModalId();
    if (this._getLengthModals() === 1 && !scrollTargetEnabled) {
      this._setScrollBarOverflow(
        "hidden",
        this._getScrollBarWidth(scrollTarget)
      );
    }
    await this._setModalVisible(true);
    onOpen(payload);
    await sleep(animationType === "none" ? 0 : 50);
    await this._setModalAnimated(true);
    this.setState({
      scrollBarContentWidth: this._getScrollBarWidth(this._modalContent)
    });
    await sleep(animationType === "none" ? 0 : animationDuration);
    if (isMobile.ios) {
      window.addEventListener("touchmove", this._fixDisableScrollMobile);
      window.addEventListener("scroll", this._fixDisableScrollMobile);
    }
    onOpenEnd(payload);
    if (autoCloseTimeout > 0 && !this._interval) {
      this._setCountDown(this._handleCloseModal);
    }
    this._historyPushUrl(state);
  };

  _handleCloseModal = async (): Promise<void> => {
    const {
      scrollTargetEnabled,
      animationType,
      onCloseEnd,
      animationDuration
    }: Props = this.props;
    await this._setModalAnimated(false);
    await sleep(animationType === "none" ? 0 : animationDuration);
    if (this._getLengthModals() === 1 && !scrollTargetEnabled) {
      this._setScrollBarOverflow("", 0);
    }
    await this._setModalVisible(false);
    if (isMobile.ios) {
      window.removeEventListener("touchmove", this._fixDisableScrollMobile);
      window.removeEventListener("scroll", this._fixDisableScrollMobile);
    }
    this._interval && clearInterval(this._interval);
    this._interval = null;
    this._setStartAutoCloseTimeout();
    onCloseEnd();
    window.history.pushState({}, "", this._linkBack);
    titleTag && (titleTag.innerText = this._titleBack);
  };

  _historyPushUrl = (state: Object): void => {
    const { payload, historyPushUrl = "", historyPushTitle }: Object = state;
    if (!!historyPushUrl) {
      const url: string = this._getUrl(historyPushUrl);
      if (titleTag && historyPushTitle) {
        titleTag.innerText = historyPushTitle;
      }
      window.history.pushState({}, "", url);
    }
  };

  _fixDisableScrollMobile = (event: SyntheticEvent<any>): void => {
    const { scrollTarget, scrollTargetEnabled }: Props = this.props;
    const { scrollY, isVisible }: State = this.state;
    if (isVisible && !scrollTargetEnabled) {
      event.preventDefault();
      if (scrollTarget === "window") {
        window.scrollTo(0, scrollY);
      } else {
        const $element: ?HTMLElement = document.querySelector(scrollTarget);
        $element && ($element.scrollTop = scrollY);
      }
    }
  };

  _renderModalPortal = (): React$Node => {
    const { scrollTargetEnabled }: Props = this.props;
    const { modalId, isVisible }: State = this.state;
    if (!isVisible || !modalId) {
      return null;
    }
    return createPortal(
      <div
        id={`__wil_modal_${modalId}__`}
        className="__wil_modal__"
        data-static={scrollTargetEnabled}
      >
        {this._renderModal()}
      </div>,
      document.body ? document.body : window
    );
  };

  _renderUnderlay = (): React$Node => {
    const {
      underlayColor,
      underlayEnabled,
      animationType,
      animationDuration,
      autoCloseTimeout
    }: Props = this.props;
    const { scrollBarContentWidth }: State = this.state;
    if (!underlayEnabled) {
      return null;
    }
    return (
      <div
        className={styles.underlay}
        style={{
          backgroundColor: underlayColor,
          right: !!scrollBarContentWidth ? scrollBarContentWidth : 0,
          ...(animationType === "none"
            ? { transition: "none" }
            : { transition: `opacity ${animationDuration}ms ease` })
        }}
        role="presentation"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(!autoCloseTimeout ? { onClick: this._handleCloseModal } : {})}
      />
    );
  };

  _renderModal = (): React$Node => {
    const {
      children,
      underlayEnabled,
      placement,
      animationType,
      fullScreen,
      animationDuration,
      modalContainerClassName,
      modalContainerStyle
    }: Props = this.props;
    const { isAnimated, payload, countDown }: State = this.state;
    const isCenter: boolean = placement === "center";
    const fullScreenClassName: string =
      underlayEnabled || isCenter ? styles.fullScreen : "";
    const animatedClassName: string = isAnimated ? styles.animated : "";
    const className: string = `${styles.modalContentWrapper} ${
      styles[placement]
    } ${animatedClassName} ${
      animationType ? styles[animationType] : ""
    } ${fullScreenClassName} ${modalContainerClassName}`.trim();
    return (
      <div className={className} style={modalContainerStyle}>
        <div ref={this._setModalContentRef} className={styles.modalContent}>
          {this._renderUnderlay()}
          <div
            className={styles.modalContentInner}
            style={{
              ...(fullScreen ? { width: "100%", height: "100%" } : {}),
              ...(animationType === "none"
                ? { transition: "none" }
                : { transition: `all ${animationDuration}ms ease` })
            }}
          >
            {typeof children === "function"
              ? children({ payload, countDown })
              : children}
          </div>
        </div>
      </div>
    );
  };

  render(): React$Node {
    return this._renderModalPortal();
  }
}
