//confirming that adding all events to the event listener works 


const EventEmitter = require('events');
const myEmitter = new EventEmitter();
// Only do this once so we don't loop forever
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // Insert a new listener in front
    myEmitter.on('event', () => {
      console.log('B');
    });
  }
});
myEmitter.on('event', () => {
  console.log('A');
});
myEmitter.on('event', () => {
  console.log('C');
});
myEmitter.emit('event');
// Prints:
//   B
//   A