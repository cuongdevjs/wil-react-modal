declare module "wil-react-modal" {
  export interface Props {
    children: React.ReactNode;
    onOpen(payload: any): void;
    onOpenEnd(payload: any): void;
    onCloseEnd(): void;
    fullScreen: boolean;
    placement: "center" | "top" | "right" | "bottom" | "left";
    scrollTarget: string;
    underlayColor: string;
    underlayEnabled: boolean;
    isVisible: boolean;
    scrollTargetEnabled: boolean;
    displayName: string;
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
      | "zoom";
  }

  export interface State {
    isAnimated: boolean;
    isVisible: boolean;
    modalId: number;
    scrollBarContentWidth: number;
  }

  export default class Modal<State extends object> {
    state: State;
    props: Props;
    public static open(displayName: string);
    public static close(displayName: string);
  }
}
