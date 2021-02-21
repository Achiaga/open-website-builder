import Head from 'next/head';
import { initLiveChatScript } from '../../utils/analytics';

const Header = () => {
	return (
		<Head>
			<meta
				name='google-site-verification'
				content='UadvCpBK-LYrfPuloDtGWCqlJeQKDZUy3XtQH0wOZ8E'
			/>
			<title>Standout Resume</title>
			<link rel='icon' href='/favicon.ico' />
			<script
				defer
				dangerouslySetInnerHTML={{
					__html: initLiveChatScript,
				}}
			/>
		</Head>
	);
};

export default Header;
