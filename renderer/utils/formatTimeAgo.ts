export const formatTimeAgo = (date: Date): string => {
	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(seconds / 3600);
	const days = Math.floor(seconds / 86400);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);
	if (years > 0) {
		return years + '年前';
	} else if (months > 0) {
		return months + 'か月前';
	} else if (days > 0) {
		return days + '日前';
	} else if (hours > 0) {
		return hours + '時間前';
	} else if (minutes > 0) {
		return minutes + '分前';
	} else {
		return seconds + '秒前';
	}
};
