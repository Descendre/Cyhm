'use client';
import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#747bff',
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
