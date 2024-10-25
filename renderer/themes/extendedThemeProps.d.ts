import '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Palette {
		area: {
			primary: string;
		};
		line: {
			disabled: string;
		};
	}
	interface PaletteOptions {
		area: {
			primary: string;
		};
		line: {
			disabled: string;
		};
	}
}
