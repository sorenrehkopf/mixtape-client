import React, { Component } from 'react';
import style from './style';

const About = () => (
	<div>
		<h1>About Mixtape!</h1>
		<h2>
			What is this and how do I use it?
		</h2>
		<ul className={style.list}>
			<li className={style.list_item}>Mixtape is a music categorization and playlist generation system that lets you add songs to your collection with whatever custom data you want, so that you can find exactly the music you're in the mood for without having to manage and then scroll through dozens of different playlists.</li>
			<li className={style.list_item}>Mixtape interfaces with Spotify to source song data, and generate playlists for you. Spotify stores a lot of <a href="https://developer.Spotify.com/documentation/web-api/reference/tracks/get-audio-features/" target="_blank">algorithmically generated data</a> about songs, and while it's not perfect, it does give you a lot of useful information about your music that you might not think to add otherwise.</li>
			<li className={style.list_item}>Mixtape is more useful the more data you add, and you can always update your data for a song after you've added it.</li>
		</ul>
		<h2>For Example</h2>
		<ul className={style.list}>
			<li className={style.list_item}>Say you've discovered <em>Redbone</em> by Childish Gambino and you want to add it to your collection. With just Spotify, you're might add that song to your playlists "Summer", "RNBJams", and "Popular". And later on when you're trying to decide what you want to listen to you have to remember what you put into each playlist, and which of them best suits what you're actually in the mood for.</li>
			<li className={style.list_item}>With mixtape you can just add that song to your collection once, and tag it with all of those data points. Then when you want to listen to it later you just tell mixtape what you're in the mood for, and it will create a playlist of songs you've saved based on the parameters you give it.</li>
			<li className={style.list_item}>To expand on the example of the 3 separate playlists above, with mixtape you can be much more fine-tuned about what you want to listen to. Let's say that you want to listen to things that you've tagged as "Summer" music, but only if they're also tagged as "RNB", have a tempo between 80 and 110 BPM, and have a "Chill" score of above 6. With mixtape you can input all that data, and have it filter what would have been your "Summer" playlist before, down to a much more fine-tuned selection.</li>
			<li className={style.list_item}>You can also run advanced searches on your song collection without generating a playlist, in case you're manually constructing a playlist and need to find something specific.</li>
		</ul>
		<h2>Mixtape is a Progressive Web App!</h2>
		<ul className={style.list}>
			<li className={style.list_item}>This means that you can download this web app to your phone and use it as a standalone mobile app. The mobile experience is notably improved when downloaded, and if you download using Chrome Canary, you can add songs directly from Spotify using the share option.</li>
			<li className={style.list_item}>If you interact with the site enough, chrome may prompt you to download, or you can do it yourself by selecting "Add to Home Screen" from the dropdown in the upper right corner. This does not require you to keep the app on your home screen to keep it installed.</li>
		</ul>
		<h2>Add and update songs directly from Spotify using share.</h2>
		<ul className={style.list}>
			<li className={style.list_item}>As mentioned above, if you download Mixtape for use as a standalone PWA, you can add and update songs directly from Spotify using the share functionality available for songs.</li>
			<li className={style.list_item}>This is a beta feature that is currently available in Chrome Canary (06/2018), but looks to be moving towards a general release sometime in the next year. In order to utilize this feature for mixtape, download Chrome Canary from the play store, and use it to install the mixtape PWA on your phone. You may need to restart Canary for the change to take effect, but once completed, you should see mixtape in the share menu when you click on the share option for a song in Spotify.</li>
			<li className={style.list_item}>When you select mixtape from the share options in Spotify, you will be taken directly into the add song dialog. Once you've updated your data you can use your phone's back button to take you back to Spotify.</li>
			<li className={style.list_item}>This feature is currently only supported on Android (afaik), and is not built to handle anything other than single songs.</li>
		</ul>
		<h2>Privacy and data</h2>
		<ul className={style.list}>
			<li className={style.list_item}>Mixtape does not use cookies, but does use a similar technology called local storage purely for authentication purposes.</li>
			<li className={style.list_item}>Mixtape replicates a very limited amount of your data from Spotify for ease of access purposes. In total this data consists of your Spotify user id, your display name, and the url for your profile photo if you have one. No personal data other than this is stored in any form, unless you for some reason enter it as song tags.</li>
		</ul>
		<br/>
	</div>
);

export default About;