export const initHorjar = (
  h = window,
  o = document,
  t = 'https://static.hotjar.com/c/hotjar-',
  j = '.js?sv=',
  a,
  r
) => {
  h.hj =
    h.hj ||
    function () {
      ;(h.hj.q = h.hj.q || []).push(arguments)
    }
  h._hjSettings = { hjid: process.env.NEXT_PUBLIC_HOTJAR_TRACKING, hjsv: 6 }
  a = o.getElementsByTagName('head')[0]
  r = o.createElement('script')
  r.async = 1
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
  a.appendChild(r)
}

export const initLiveChatScript = `var _smartsupp = _smartsupp || {};
_smartsupp.key = 'f20b0b447f0ec1947a94002f36323972fbdd06db';
window.smartsupp||(function(d) {
	var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
	s=d.getElementsByTagName('script')[0];c=d.createElement('script');
	c.type='text/javascript';c.charset='utf-8';c.async=true;
	c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);`
export const initGoogleAnalytics = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process?.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
  page_path: window.location.pathname,
});
`

// log the pageview with their URL
export const pageview = (url) => {
  if (process?.env?.NODE_ENV === 'development') return
  if (window) {
    window.gtag('config', process?.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
  }
}

// log specific events happening.
export const event = ({ action, params }) => {
  if (process?.env?.NODE_ENV === 'development') return
  if (window) {
    window.gtag('event', action, params)
  }
}
