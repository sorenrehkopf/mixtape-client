console.log('in the worker!', navigator);
if ('actions' in navigator) {
	console.log('adding event listener!');
	navigator.actions.addEventListener('share', event => {
  	console.log('the event!', event)
	});
}