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
			}

			a {
				color: inherit;
				text-decoration: none;
			}

			* {
				box-sizing: border-box;
			}
			/* Do not remove this is for the builder */
			.react-grid-item.cssTransforms {
				transition-property: none !important;
			}
			.textStyles {
				margin: 0;
			}
			.textStyles blockquote {
				border-left: 4px solid #ccc;
				margin-bottom: 5px;
				margin-top: 5px;
				padding-left: 16px;
			}
			.textStyles p {
				margin: 0;
			}

			.textStyles h1 {
				font-family: 'Helvetica; Arial; sans-serif';
				font-size: 6em;
				margin: 0;
				font-weight: 300;
			}
			.textStyles h2 {
				font-size: 4em;
				margin: 0;
				font-weight: 300;
			}
			.textStyles h3 {
				font-size: 3em;
				margin: 0;
				font-weight: 300;
			}
			.textStyles h4 {
				font-size: 2em;
				margin: 0;
				font-weight: 300;
			}
			.textStyles h5 {
				font-size: 1.5em;
				margin: 0;
				font-weight: 300;
			}
			.textStyles h6 {
				font-size: 1.2em;
				margin: 0;
				font-weight: 300;
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
			@media (max-width: 700px) {
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

export const htmlWrapper = (body) => `
<!DOCTYPE html>
<html>
${header}
<body>
${body}
</body>
</html>
`
