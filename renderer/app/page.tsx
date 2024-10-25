'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
export default function Home() {
	const { data: session } = useSession();
	console.log(session);
	return (
		<div>
			{/* {!session || !session.user ? (
				<>
					<p>ログインしていません</p>
					<button onClick={() => signIn()}>ログイン</button>
				</>
			) : (
				<>
					<p>こんにちは、{session.user.name}さん</p>
					<button onClick={() => signOut()}>ログアウト</button>
				</>
			)} */}
		</div>
	);
}
