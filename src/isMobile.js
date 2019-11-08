// @flow
const { userAgent }: { userAgent: string } = navigator;
const android: boolean = !!userAgent.match(/Android/i);
const blackBerry: boolean = !!userAgent.match(/BlackBerry/i);
const ios: boolean = !!userAgent.match(/iPhone|iPad|iPod/i);
const opera: boolean = !!userAgent.match(/Opera Mini/i);
const windows: boolean =
  !!userAgent.match(/IEMobile/i) || !!userAgent.match(/WPDesktop/i);
const any: boolean = android || blackBerry || ios || opera || windows;
const isMobile: Object = {
  android,
  blackBerry,
  ios,
  opera,
  windows,
  any
};

export default isMobile;
