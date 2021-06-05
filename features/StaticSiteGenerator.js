const styles = `
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

.textStyles blockquote {
  border-left: 4px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 16px;
}

.textStyles h1 {
  font-size: 6em;
  margin: 0 !important;
  padding: 0 !important;
  font-weight: 300 !important;
}
.textStyles h2 {
  font-size: 4em;
  margin: 0 !important;
  padding: 0 !important;
  font-weight: 300 !important;
}
.textStyles h3 {
  font-size: 3em;
  margin: 0 !important;
  padding: 0 !important;
  font-weight: 300 !important;
}
.textStyles h4 {
  font-size: 2em;
  margin: 0 !important;
  padding: 0 !important;
  font-weight: 300 !important;
}
.textStyles h5 {
  font-size: 1.5em;
  margin: 0 !important;
  padding: 0 !important;
  font-weight: 300 !important;
}
.textStyles h6 {
  font-size: 1.2em;
  margin: 0 !important;
  padding: 0 !important;
  font-weight: 300 !important;
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
    font-size: 9em;
  }
  .textStyles h2 {
    font-size: 6em;
  }
  .textStyles h3 {
    font-size: 5em;
  }
  .textStyles h4 {
    font-size: 4em;
  }
  .textStyles h5 {
    font-size: 3em;
  }
  .textStyles h6 {
    font-size: 2.5em;
  }
  .mobile {
    display: grid !important;
  }
  .desktop {
    display: none !important;
    font-size: 13px;
  }
}
@media (max-width: 700px) {
  .textStyles h1 {
    font-size: 9em;
  }
  .textStyles h2 {
    font-size: 6em;
  }
  .textStyles h3 {
    font-size: 5em;
  }
  .textStyles h4 {
    font-size: 4em;
  }
  .textStyles h5 {
    font-size: 3em;
  }
  .textStyles h6 {
    font-size: 2.3em;
  }
  .mobile {
    display: grid !important;
  }
  .desktop {
    display: none !important;
    font-size: 13px;
  }
}
@media (max-width: 600px) {
  .textStyles h1 {
    font-size: 7em;
  }
  .textStyles h2 {
    font-size: 5em;
  }
  .textStyles h3 {
    font-size: 4em;
  }
  .textStyles h4 {
    font-size: 3em;
  }
  .textStyles h5 {
    font-size: 2.5em;
  }
  .textStyles h6 {
    font-size: 1.9em;
  }
  .mobile {
    display: grid !important;
  }
  .desktop {
    display: none !important;
    font-size: 13px;
  }
}

@media (max-width: 500px) {
  .textStyles h1 {
    font-size: 6.5em;
  }
  .textStyles h2 {
    font-size: 4.5em;
  }
  .textStyles h3 {
    font-size: 3.5em;
  }
  .textStyles h4 {
    font-size: 2.5em;
  }
  .textStyles h5 {
    font-size: 2em;
  }
  .textStyles h6 {
    font-size: 1.6em;
  }
  .mobile {
    display: grid !important;
  }
  .desktop {
    display: none !important;
    font-size: 13px;
  }
}
@media (max-width: 450px) {
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
    font-size: 1.7em;
  }
  .textStyles h6 {
    font-size: 1.4em;
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
  .textStyles h6 {
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

 `

const header = `
 <head>
    <meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<style>	${styles} </style>
	</head>`

const flurlyScripts = `
<script src="https://js.stripe.com/v3/"></script>
<script src="https://flurly.com/flurly-checkout.js" crossorigin="cors"></script>`

const gumroadScript = `
<script src="https://gumroad.com/js/gumroad.js"></script>`

export const htmlWrapper = (body, hasFlurlyLink, hasGumroadLink) => {
  return `
<!DOCTYPE html>
<html>
${header}
<body>
${body}
${hasFlurlyLink ? flurlyScripts : ''}
${hasGumroadLink ? gumroadScript : ''}
</body>
</html>
`
}
