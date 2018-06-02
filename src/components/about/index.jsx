import React, { Component } from 'react';
import style from './style';

const About = () => (
	<div>
		<h1>The about page!</h1>
		<h2>
			What is this and how do I use it?
		</h2>
		<ul className={style.list}>
			<li>Mixtape is a music categorization and playlist generation system that lets you add songs to your collection with whatever custom data you want, so that you can find exactly the music you want without having to manage and then scroll through dozens of different playlists.</li>
			<li>Mixtape interfaces with spotify to source song data, and generate playlists for you. Spotify stores a lot of <a href="https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/">algorithmically generated data</a> about songs, and while it's not perfect, it does give you a lot of useful information about your music that you might not think to add otherwise.</li>
		</ul>
	</div>
);

export default About;