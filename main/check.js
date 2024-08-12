const motionDisabled = window.matchMedia('(prefers-reduced-motion: reduce)');
const ua = window.navigator.userAgent;
const iOS = ua.match(/Macintosh/i) || ua.match(/iPad/i) || ua.match(/iPhone/i);
const webkit = ua.match(/WebKit/i);
const iOSSafari = iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/EdgiOS/i) && !ua.match(/Chrome/i) && !ua.match(/Edg/i);
const safariVersionMatch = ua.match(/Version\/(\d+(\.\d+)?)/);
export const oldSafariVersion =  iOSSafari && parseFloat(safariVersionMatch[1]) < 17; 
export const noMotion  = motionDisabled.matches;