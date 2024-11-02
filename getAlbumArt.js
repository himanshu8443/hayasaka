import searchSong from './searchSong';
import { checkOptions } from './utils';

/**
 * @param {{apiKey: string, title: string, artist: string, optimizeQuery: boolean}} options
 */
export default async function (options) {
	checkOptions(options);
	let results = await searchSong(options);
	if (!results) return null;
	return results[0].albumArt;
};
