import ReactGA from 'react-ga';

const initHorjar = (
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
			(h.hj.q = h.hj.q || []).push(arguments);
		};
	h._hjSettings = { hjid: process.env.NEXT_PUBLIC_HOTJAR_TRACKING, hjsv: 6 };
	a = o.getElementsByTagName('head')[0];
	r = o.createElement('script');
	r.async = 1;
	r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
	a.appendChild(r);
};

export const InitializeAnalytics = async () => {
	if (!process.env.NEXT_PUBLIC_GA_TRACKING) return;
	ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING);
	initHorjar();
	ReactGA.pageview('/');
};

export const AnalyticsEvent = (category, action) => {
	console.log({ ReactGA });
	ReactGA.event({
		category: category,
		action: action,
	});
};
