'use client';
import { createTheme } from '@mui/material';

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
					tableHeader: {
						default: '#404050',
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
