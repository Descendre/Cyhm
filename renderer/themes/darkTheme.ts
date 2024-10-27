'use client';
import { createTheme } from '@mui/material';
import {
	blue,
	grey,
	lightBlue,
	lime,
	pink,
	purple,
	red,
	teal,
} from '@mui/material/colors';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#747bff',
		},
		secondary: {
			main: '#303040',
		},
		layout: {
			editLayout: {
				header: {
					bg: '#101014',
					line: '#26262a',
					searchBar: {
						bg: '#161618',
					},
				},
				leftBar: {
					bg: '#101014',
					line: '#26262a',
					column: {
						bg: '#0a0a0a',
						line: '#161616',
						color: {
							int: blue[700],
							varchar: red[700],
							boolean: purple[700],
							date: lightBlue[700],
							text: lime[700],
							float: teal[700],
							double: pink[700],
							undefined: grey[700],
						},
					},
				},
				footer: {
					toolBar: {
						bg: '#101014',
						line: '#363640',
					},
				},
			},
		},
		components: {
			common: {
				appModal: {
					bg: '#202127',
				},
			},
			login: {
				buttonArea: {
					bg: '#202127',
				},
				button: {
					bg: '#080808',
				},
			},
			top: {
				projectHeader: {
					searchBar: {
						bg: '#161618',
					},
				},
			},
			edit: {
				reactFlow: {
					tableHeader: {
						default: '#404050',
					},
					tableColumn: {
						odd: '#101010',
						even: '#161616',
					},
				},
			},
		},
		line: {
			disabled: '#555555',
		},
		background: {
			default: '#1b1b1f',
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
            ::-webkit-scrollbar{
                width: 5px;
				max-width: 2vw;
            },
            ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
				border-radius: 5px;
            },
            ::-webkit-scrollbar-track {
                background-color: transparent;
            }
            `,
		},
	},
});
