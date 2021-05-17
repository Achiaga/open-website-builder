const header = `
 <head>
    <meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<style>
		html,
		body {
			padding: 0;
			margin: 0;
			font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
				Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
			overflow-x: hidden;
			background-color: #f8f9fb;
			font-weight: 300;
		}
		
		a {
			color: inherit;
			text-decoration: none;
		}
		
		* {
			box-sizing: border-box;
		}
		
		.textStyles blockquote {
			border-left: 4px solid #ccc;
			margin-bottom: 5px;
			margin-top: 5px;
			padding-left: 16px;
		}
		
		.textStyles h1 {
			font-size: 6em;
		}
		.textStyles h2 {
			font-size: 4em;
		}
		.textStyles h3 {
			font-size: 3em;
		}
		.textStyles h4 {
			font-size: 2em;
		}
		.textStyles h5 {
			font-size: 1.5em;
		}
		.textStyles h6 {
			font-size: 1.2em;
		}
		.textStyles .ql-align-center {
			text-align: center;
		}
		.textStyles .ql-align-justify {
			text-align: justify;
		}
		.textStyles .ql-align-right {
			text-align: right;
		}
		.mobile {
			display: none !important;
		}
		.desktop {
			display: grid !important;
		}
		@media (max-width: 900px) {
			.textStyles h1 {
				font-size: 4.5em;
			}
			.textStyles h2 {
				font-size: 2.8em;
			}
			.textStyles h3 {
				font-size: 2em;
			}
			.textStyles h4 {
				font-size: 1.5em;
			}
			.textStyles h5 {
				font-size: 1.2em;
			}
		}
		@media (max-width: 600px) {
			.textStyles h1 {
				font-size: 5em;
			}
			.textStyles h2 {
				font-size: 3em;
			}
			.textStyles h3 {
				font-size: 2em;
			}
			.textStyles h4 {
				font-size: 1.7em;
			}
			.textStyles h5 {
				font-size: 1.2em;
			}
			.mobile {
				display: grid !important;
			}
			.desktop {
				display: none !important;
				font-size: 13px;
			}
		}
		@media (max-width: 340px) {
			.textStyles h1 {
				font-size: 5em;
			}
			.textStyles h2 {
				font-size: 3em;
			}
			.textStyles h3 {
				font-size: 2em;
			}
			.textStyles h4 {
				font-size: 1.7em;
			}
			.textStyles h5 {
				font-size: 1.2em;
			}
			.mobile {
				display: grid !important;
			}
			.desktop {
				display: none !important;
				font-size: 13px;
			}
		}
		@media (max-width: 375px) {
			.textStyles h1 {
				font-size: 5.5em;
			}
			.textStyles h2 {
				font-size: 3.5em;
			}
			.textStyles h3 {
				font-size: 2.5em;
			}
			.textStyles h4 {
				font-size: 2em;
			}
			.textStyles h5 {
				font-size: 1.7em;
			}
			.mobile {
				display: grid !important;
			}
			.desktop {
				display: none !important;
				font-size: 13px;
			}
		}
		
		</style>
	</head>`

const flurlyScripts = `
<script src="https://js.stripe.com/v3/"></script>
<script
	src="https://flurly.com/flurly-checkout.js"
	crossorigin="cors"
></script>`
export const htmlWrapper = (body, hasFlurlyLink) => `
<!DOCTYPE html>
<html>
${header}
<body>
${body}
${hasFlurlyLink ? flurlyScripts : ''}
</body>
</html>
`
