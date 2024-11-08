'use client';
import { createTheme } from '@mui/material';
import {
	blue,
	deepPurple,
	grey,
	lightBlue,
	lime,
	pink,
	purple,
	red,
	teal,
	yellow,
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
			topLayout: {
				CreatingProjectLoading: {
					bg: '#000000',
				},
			},
			editLayout: {
				header: {
					bg: '#101014',
					line: '#26262a',
					searchBar: {
						bg: '#161618',
					},
					userPoper: {
						bg: '#161618',
						line: '#26262a',
						boxShadow: '-2px 2px 3px rgba(40, 40, 50, 0.5)',
					},
				},
				leftBar: {
					bg: '#101014',
					line: '#26262a',
					lockBg: '#000000',
					column: {
						line: '#161616',
					},
					constraint: {
						primaryKey: yellow[700],
						notNull: red[500],
						unique: lightBlue[500],
						foreignKey: teal[500],
						check: deepPurple[400],
					},
				},
				rightPopper: {
					bg: '#101014',
					line: '#26262a',
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
					bg: '#1b1b1f',
					backdrop: 'rgba(50, 50, 60, 0.7)',
					header: {
						bg: '#101014',
					},
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
				projectTable: {
					skeleton: {
						bg: '#38383c',
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
					column: {
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
					commands: {
						iconButton: {
							bg: '#000000',
						},
					},
					lockBg: '#000000',
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
