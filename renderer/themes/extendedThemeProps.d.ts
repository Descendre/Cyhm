import '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Palette {
		layout: {
			editLayout: {
				header: {
					bg: string;
					line: string;
					searchBar: {
						bg: string;
					};
				};
				leftBar: {
					bg: string;
					line: string;
				};
				footer: {
					toolBar: {
						bg: string;
						line: string;
					};
				};
			};
		};
		components: {
			common: {
				appModal: {
					bg: string;
				};
			};
			login: {
				buttonArea: {
					bg: string;
				};
				button: {
					bg: string;
				};
			};
			top: {
				projectHeader: {
					searchBar: {
						bg: string;
					};
				};
			};
			edit: {
				reactFlow: {
					tableHeader: {
						default: string;
					};
					tableColumn: {
						odd: string;
						even: string;
					};
				};
			};
		};
		line: {
			disabled: string;
		};
	}
	interface PaletteOptions {
		layout: {
			editLayout: {
				header: {
					bg: string;
					line: string;
					searchBar: {
						bg: string;
					};
				};
				leftBar: {
					bg: string;
					line: string;
				};
				footer: {
					toolBar: {
						bg: string;
						line: string;
					};
				};
			};
		};
		components: {
			common: {
				appModal: {
					bg: string;
				};
			};
			login: {
				buttonArea: {
					bg: string;
				};
				button: {
					bg: string;
				};
			};
			top: {
				projectHeader: {
					searchBar: {
						bg: string;
					};
				};
			};
			edit: {
				reactFlow: {
					tableHeader: {
						default: string;
					};
					tableColumn: {
						odd: string;
						even: string;
					};
				};
			};
		};
		line: {
			disabled: string;
		};
	}
}
