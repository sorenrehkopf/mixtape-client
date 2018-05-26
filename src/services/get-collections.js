export const defaultQueryFields = [
	{
		name: 'ACOUSTICNESS'
	},
	{
		name: 'ALBUMNAME'
	},
	{
		name: 'ARTISTNAME'
	},
	{
		name: 'DANCEABILITY'
	},
	{
		name: 'ENERGY'
	},
	{
		name: 'INSTRUMENTALNESS'
	},
	{
		name: 'KEY'
	},
	{
		name: 'LOUDNESS'
	},
	{
		name: 'NAME'
	},
	{
		name: 'TEMPO'
	},
	{
		name: 'VALENCE'
	}
];

export const songDataValues = {
	acousticness: {
		tip: 'How acoustic the song sounds',
		type: 'number'
	},
	energy: {
		tip: 'The overall energy level for the song',
		type: 'number'
	},
	instrumentalness: {
		tip: 'How instrumental the song sounds',
		type: 'number'
	},
	tempo: {
		tip: 'BPM (beats per minute) for the song',
		type: 'number'
	},
	key: {
		tip: 'The musical key (A - G#) for the song',
		type: 'text'
	},
	valence: {
		tip: 'How "happy" or "sad" the song sounds - higher is happier',
		type: 'number'
	},
	danceability: {
		tip: 'How danceable the song sounds',
		type: 'number'
	},
	loudness: {
		tip: 'The overall decibel level of the song',
		type: 'number'
	},
	timeSignature: {
		tip: 'The number of beats in each measure',
		type: 'text'
	} 
};


export const paramTypes = {
	loose_equivalence:{
		displayValue: 'is like (text)',
		inputTypes: ['text']
	},
	loose_inequivalence:{
		displayValue: 'is not like (text)',
		inputTypes: ['text']
	},
	between:{
		displayValue: 'is between',
		inputTypes: ['number', 'number']
	},
	not_between:{
		displayValue: 'is not between',
		inputTypes: ['number', 'number']
	},
	greater_than:{
		displayValue: 'is greater than',
		inputTypes: ['number']
	},
	less_than:{
		displayValue: 'is less than',
		inputTypes: ['number']
	},
	strict_equivalence_numeric:{
		displayValue: 'is exactly (numeric)',
		inputTypes: ['number']
	}
}