import '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Palette {
		components: {
			common: {
				appModal: {
					bg: '#24292e';
				};
			};
			login: {
				buttonArea: {
					bg: '#24292e';
				};
				button: {
					bg: string;
				};
			};
		};
		line: {
			disabled: string;
		};
	}
	interface PaletteOptions {
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
		};
		line: {
			disabled: string;
		};
	}
}
