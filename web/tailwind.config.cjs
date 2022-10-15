/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.tsx'
	],
	theme: {
		extend: {
			fontFamily: {
				sans: 'Roboto, sans-serif',
			},
			colors: {
				gray: {
					100: '#E1E1E6',
					200: '#C4C4CC',
					300: '#8D8D99',
					500: '#323238',
					600: '#29292E',
					700: '#121214',
					900: '#09090A'
				},
				yellow: {
					500: '#FFBE0B',
					600: '#EEAD0A'
				},
				orange: {
					500: '#FB5607',
					600: '#EA4506'
				},
				pink: {
					500: '#FF006E',
					600: '#EE005D'
				},
				purple: {
					500: '#8338EC',
					600: '#7227DB'
				},
				blue: {
					500: '#3A86FF',
					600: '#2975EE'
				}
			},
		},
	},
	plugins: [],
}
