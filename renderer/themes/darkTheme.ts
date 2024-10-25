'use client';
import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		area: {
			primary: '#30363d',
		},
		line: {
			disabled: '#555555',
		},
		background: {
			default: '#181b1f',
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
            ::-webkit-scrollbar{
                width: 10px;
				max-width: 2vw;
            },
            ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
				border-radius: 5px;
            },
            ::-webkit-scrollbar-track {
                background-color: transparent;
            }
            `,
		},
	},
});
