import dayjs from 'dayjs';

export async function getTime(): Promise<dayjs.Dayjs> {
	let response: Response | null = null;
	try {
		response = await fetch('https://mtdweb.mtd.org/api/time');
		const timeString = await response.json();
		return dayjs(timeString);
	} catch {
		return dayjs();
	}
}