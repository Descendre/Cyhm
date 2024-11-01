import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../libs';
import { UserLikeSearchResponse } from '../../../../../../interfaces';

export const GET = async (
	req: NextRequest,
	{ params }: { params: { keyWord: string } }
): Promise<NextResponse> => {
	try {
		const keyWord = params.keyWord;
		const users: UserLikeSearchResponse = await prisma.user.findMany({
			where: {
				OR: [
					{
						name: {
							contains: keyWord, // 部分一致検索
							mode: 'insensitive', // 大文字小文字を区別しない
						},
					},
					{
						email: {
							contains: keyWord,
							mode: 'insensitive',
						},
					},
				],
			},
		});

		return NextResponse.json(users);
	} catch (error) {
		console.error('Error fetch project:', error);
		return NextResponse.json(error);
	}
};
