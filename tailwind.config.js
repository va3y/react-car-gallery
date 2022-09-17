const baseSpacing = {
	0: "0px",
	8: "0.5rem",
	12: "0.75rem",
	24: "1.5rem",
	full: "100%",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			white: "#FFF",
			gray: "#EDEDED",
			text: "#4A4A4A",
			primary: "#EA7F28",
			"primary-dark": "#D37324",
			transparent: "transparent",
		},
		width: {
			...baseSpacing,
			button: "8rem",
			input: "12rem",
			screen: "100vw",
			image: "120px",
		},
		height: {
			...baseSpacing,
			button: "2rem",
			input: "2rem",
			header: "5rem",
			screen: "100vh",
			image: "80px",
		},
		spacing: baseSpacing,
		fontFamily: {
			sans: ["Roboto", "sans-serif"],
		},
		fontSize: {
			32: "2rem",
			18: "1.125rem",
			14: "0.875rem",
			12: "0.75rem",
		},
		extend: {
			transitionDelay: {
				400: "400ms",
			},
			maxWidth: {
				"page-wrapper": "800px",
			},
		},
	},
	plugins: [],
};
