'use client';
import { createTheme } from '@mui/material';
import {
	blue,
	deepPurple,
	grey,
	lightBlue,
	orange,
	pink,
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
						default: grey[500],
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
				columnConstraint: {
					clauses: {
						sqlite: {
							autoIncrement: '#747bff',
						},
					},
					constraintArea: {
						bg: '#161719',
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
							sqlite: {
								integer: blue[700],
								text: red[700],
								real: pink[700],
								blob: orange[700],
								null: grey[700],
							},
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
			appIconButton: '#555555',
			constraintAreaBorder: '#222222',
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
