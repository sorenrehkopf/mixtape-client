import round from 'lodash/round';
import formatTime from '_/services/format-time';

const keyMappings = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B',
];

const convertFromSpotify = ({ acousticness, danceability, duration_ms, energy, instrumentalness, id, loudness, key, tempo, time_signature, valence, ...everythingElse}) => ({
	...everythingElse,
	acousticness: round(acousticness *10, 1),
	danceability: round(danceability * 10, 1),
	energy: round(energy * 10, 1),
	instrumentalness: round(instrumentalness *10, 1),
	key: keyMappings[key],
	loudness: round(loudness, 1),
	spotifyId: id,
	tags: {},
	tempo: round(tempo, 1),
	timeSignature: `${time_signature}/4`,
	valence: round(valence * 10, 1)
});

const convertBasicSongInfoFromSpotify = ({ 
	id,
	album: {
		images: [{}, {
			url: imageUrl
		}],
		name: albumName
	},
	artists: [{
		name: artistName
	}],
	duration_ms: duration,
	name,
	preview_url: previewUrl
}) => ({ 
	albumName,
	artistName,
	duration: { 
		friendly: formatTime(duration), 
		ms: duration
	},
	imageUrl,
	name,
	previewUrl,
	spotifyId: id
});


const convertDBTags = tags => {
	for (let tag in tags) {
		const { boolValue, numericValue, originalType } = tags[tag];
		// if we don't have an original type value then this has already been converted
		if (originalType) {
			const isBool = originalType === 'boolean';
			
			tags[tag] = isBool ? boolValue : numericValue;
		}
	}

	return tags;
};

export {
	convertDBTags,
	convertFromSpotify,
	convertBasicSongInfoFromSpotify
};