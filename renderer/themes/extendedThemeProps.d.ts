import '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Palette {
		layout: {
			topLayout: {
				CreatingProjectLoading: {
					bg: string;
				};
			};
			editLayout: {
				header: {
					bg: string;
					line: string;
					searchBar: {
						bg: string;
					};
					userPoper: {
						bg: string;
						line: string;
						boxShadow: string;
					};
				};
				leftBar: {
					bg: string;
					line: string;
					lockBg: string;
					column: {
						line: string;
					};
					constraint: {
						primaryKey: string;
						notNull: string;
						unique: string;
						foreignKey: string;
						check: string;
						default: string;
					};
				};
				rightPopper: {
					bg: string;
					line: string;
				};
				footer: {
					toolBar: {
						bg: string;
						line: string;
					};
				};
				columnConstraint: {
					clauses: {
						sqlite: {
							autoIncrement: string;
						};
					};
					constRaintArea: {
						bg: string;
					};
				};
			};
		};
		components: {
			common: {
				appModal: {
					bg: string;
					backdrop: string;
					header: {
						bg: string;
					};
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
				projectTable: {
					skeleton: {
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
					column: {
						color: {
							sqlite: {
								integer: string;
								text: string;
								real: string;
								blob: string;
								null: string;
							};
						};
					};
					commands: {
						iconButton: {
							bg: string;
						};
					};
					lockBg: string;
				};
			};
		};
		line: {
			appIconButton: string;
			constraintAreaBorder: string;
		};
	}
	interface PaletteOptions {
		layout: {
			topLayout: {
				CreatingProjectLoading: {
					bg: string;
				};
			};
			editLayout: {
				header: {
					bg: string;
					line: string;
					searchBar: {
						bg: string;
					};
					userPoper: {
						bg: string;
						line: string;
						boxShadow: string;
					};
				};
				leftBar: {
					bg: string;
					line: string;
					lockBg: string;
					column: {
						line: string;
					};
					constraint: {
						primaryKey: string;
						notNull: string;
						unique: string;
						foreignKey: string;
						check: string;
						default: string;
					};
				};
				rightPopper: {
					bg: string;
					line: string;
				};
				footer: {
					toolBar: {
						bg: string;
						line: string;
					};
				};
				columnConstraint: {
					clauses: {
						sqlite: {
							autoIncrement: string;
						};
					};
					constRaintArea: {
						bg: string;
					};
				};
			};
		};
		components: {
			common: {
				appModal: {
					bg: string;
					backdrop: string;
					header: {
						bg: string;
					};
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
				projectTable: {
					skeleton: {
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
					column: {
						color: {
							sqlite: {
								integer: string;
								text: string;
								real: string;
								blob: string;
								null: string;
							};
						};
					};
					commands: {
						iconButton: {
							bg: string;
						};
					};
					lockBg: string;
				};
			};
		};
		line: {
			appIconButton: string;
			constraintAreaBorder: string;
		};
	}
}
