import { Box } from '@mui/material';
import {
	ColumnChannelPayloadProps,
	ColumnsChannelPayloadProps,
	ColumnStatePropsExtended,
	EditLayoutProps,
	TableChannelPayloadProps,
} from '../../interfaces';
import {
	EditFooter,
	EditHeader,
	EditLeftBar,
	EditLeftBarReborn,
	EditMain,
	EditRightPopper,
	EditRightPopperFix,
} from './section';
import { useLayout, useProject } from '../../hooks';
import { useEffect } from 'react';
import { supabase } from '../../libs';

export const EditLayout = ({ children }: EditLayoutProps) => {
	const {
		tables,
		setTables,
		setColumns,
		isEditLeftBar,
		isEditRightPopper,
		lastSelectedTableId,
	} = useLayout();
	const {
		currentProject,
		channel,
		setChannel,
		setTableEditInfo,
		setColumnEditInfo,
	} = useProject();
	const lastSelectedTableInfo =
		lastSelectedTableId && tables && tables[lastSelectedTableId]
			? tables[lastSelectedTableId]
			: null;

	useEffect(() => {
		if (!currentProject || channel) return;
		const newChannel = supabase.channel(`project_${currentProject.id}`);
		setChannel(newChannel);

		const handleTableAdd = (payload: { payload: TableChannelPayloadProps }) => {
			const { newTable } = payload.payload;
			setTables((prevTables) => ({
				...prevTables,
				[newTable.id]: newTable,
			}));
			setTableEditInfo((prevTableInfo) => ({
				...prevTableInfo,
				[newTable.id]: newTable,
			}));
		};

		const handleTableUpdate = (payload: {
			payload: TableChannelPayloadProps;
		}) => {
			const { newTable } = payload.payload;
			setTables((prevTables) => ({
				...prevTables,
				[newTable.id]: newTable,
			}));
			setTableEditInfo((prevTableInfo) => ({
				...prevTableInfo,
				[newTable.id]: newTable,
			}));
		};

		const handleColumnAdd = (payload: {
			payload: ColumnChannelPayloadProps;
		}) => {
			const { newColumn } = payload.payload;

			// 実際のstateは拡張された型(相手と共有しないフィールドを含む)を持つため、共有しないフィールドについては初期値を設定して拡張
			const extendedColumn = {
				...newColumn,
				isConstraintExpand: true,
			};

			setColumns((prevColumns) => ({
				...prevColumns,
				[extendedColumn.tableId]: [
					...(prevColumns[extendedColumn.tableId] || []),
					extendedColumn,
				],
			}));
			setColumnEditInfo((prevColumns) => ({
				...prevColumns,
				[newColumn.tableId]: [
					...(prevColumns[newColumn.tableId] || []),
					{
						// 編集中情報とカラム情報の内容が同期しないように(JSのオブジェクト参照性のため)こちらはnewColumnをそのまま渡してはいません。
						id: newColumn.id,
						tableId: newColumn.tableId,
						projectId: newColumn.projectId,
						name: newColumn.name,
						sqliteType: newColumn.sqliteType,
						supabaseType: newColumn.supabaseType,
						createdAt: newColumn.createdAt,
						updatedAt: newColumn.updatedAt,
						columnConstraints: newColumn.columnConstraints,

						// 以下相手と共有しないフィールド。初期値を手動で追加。
						isConstraintExpand: true,
					},
				],
			}));
		};

		const handleColumnUpdate = (payload: {
			payload: ColumnChannelPayloadProps;
		}) => {
			const { newColumn } = payload.payload;
			setColumns((prevColumns) => ({
				...prevColumns,
				[newColumn.tableId]: prevColumns[newColumn.tableId].map((column) =>
					column.id === newColumn.id ? { ...column, ...newColumn } : column
				),
			}));
			setColumnEditInfo((prevColumns) => ({
				...prevColumns,
				[newColumn.tableId]: prevColumns[newColumn.tableId].map((column) =>
					column.id === newColumn.id
						? {
								...column, // isConstraintExpandなど拡張分の相手と共有しない分のフィールドに関しては元々の値を参照
								id: newColumn.id,
								tableId: newColumn.tableId,
								name: newColumn.name,
								sqliteType: newColumn.sqliteType,
								createdAt: newColumn.createdAt,
								updatedAt: newColumn.updatedAt,
							}
						: column
				),
			}));
		};
		const handleColumnsUpdate = (payload: {
			payload: ColumnsChannelPayloadProps;
		}) => {
			const { newColumns } = payload.payload;
			setColumns((prevColumns) => {
				// updatedColumnsをテーブルIDごとにグループ分け
				const updatedColumnsByTableId = newColumns.reduce(
					(acc, updatedColumn) => {
						// 該当するテーブルIDがaccに存在しない場合は新しく作成
						if (!acc[updatedColumn.tableId]) {
							acc[updatedColumn.tableId] = [];
						}

						// 該当するカラム情報を更新する
						const existingColumn = prevColumns[updatedColumn.tableId]?.find(
							(column) => column.id === updatedColumn.id
						);

						// 既存のカラムがあれば、拡張分は元の値を保持し、それ以外は新しい値で更新
						const updatedColumnState: ColumnStatePropsExtended = {
							...existingColumn, // 既存のカラムの情報をベースにする
							...updatedColumn, // 新しいカラムの情報を上書き
							isConstraintExpand: existingColumn?.isConstraintExpand ?? false, // 拡張分は元の値を保持
						};

						// 該当するテーブルIDにカラムを追加
						acc[updatedColumn.tableId].push(updatedColumnState);

						return acc;
					},
					{} as { [key: string]: ColumnStatePropsExtended[] }
				);

				// グループ分けされた結果を元にstateを更新
				return {
					...prevColumns,
					...updatedColumnsByTableId, // テーブルIDごとのカラム配列を更新
				};
			});
			setColumnEditInfo((prevColumns) => {
				// updatedColumnsをテーブルIDごとにグループ分け
				const updatedColumnsByTableId = newColumns.reduce(
					(acc, updatedColumn) => {
						// 該当するテーブルIDがaccに存在しない場合は新しく作成
						if (!acc[updatedColumn.tableId]) {
							acc[updatedColumn.tableId] = [];
						}

						// 該当するカラム情報を更新する
						const existingColumn = prevColumns[updatedColumn.tableId]?.find(
							(column) => column.id === updatedColumn.id
						);

						// 既存のカラムがあれば、拡張分は元の値を保持し、それ以外は新しい値で更新
						const updatedColumnState: ColumnStatePropsExtended = {
							...existingColumn, // 既存のカラムの情報をベースにする
							...updatedColumn, // 新しいカラムの情報を上書き
							isConstraintExpand: existingColumn?.isConstraintExpand ?? false, // 拡張分は元の値を保持
						};

						// 該当するテーブルIDにカラムを追加
						acc[updatedColumn.tableId].push(updatedColumnState);

						return acc;
					},
					{} as { [key: string]: ColumnStatePropsExtended[] }
				);

				// グループ分けされた結果を元にstateを更新
				return {
					...prevColumns,
					...updatedColumnsByTableId, // テーブルIDごとのカラム配列を更新
				};
			});
		};
		newChannel
			.on('broadcast', { event: 'table_add' }, handleTableAdd)
			.on('broadcast', { event: 'table_update' }, handleTableUpdate)
			.on('broadcast', { event: 'column_add' }, handleColumnAdd)
			.on('broadcast', { event: 'column_update' }, handleColumnUpdate)
			.on('broadcast', { event: 'columns_update' }, handleColumnsUpdate)
			.subscribe();

		return () => {
			newChannel.unsubscribe();
			setChannel(null);
		};
	}, []); // eslint-disable-line

	return (
		<>
			<Box width="100%" height="100vh">
				<EditHeader />
				<Box
					position="relative"
					display="flex"
					justifyContent="center"
					alignItems="center"
					width="100%"
					height="calc(100% - 50px)"
				>
					{isEditLeftBar ? <EditLeftBar /> : <EditLeftBarReborn />}
					<EditMain>
						{children}
						<EditFooter />
					</EditMain>
					{isEditRightPopper && lastSelectedTableInfo ? (
						<EditRightPopper table={lastSelectedTableInfo} />
					) : (
						<EditRightPopperFix table={lastSelectedTableInfo} />
					)}
				</Box>
			</Box>
		</>
	);
};
