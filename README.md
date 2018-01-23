# Installation

```
npm install --save @earthtone/collection-store
```

# Usage

```
// Instantiate
var createStore = require('@earthtone/collection-store');
var db = createStore();

// Add Collection
db.add('collection');

// Insert Values
db.insert('collection', 1, 'string', false, { param: true }); // Accepts Multiple Values

// Get Collection 
db.get('collection'); // returns -> [1, 'string', false, { param: true }]

// Transform Collection
db.insert('collection', { name: 'Larry' }, { name: 'David' });
db.get('collection'); // returns -> [1, 'string', false, { param: true }, { name: 'Larry' }, { name: 'David' }]
db.get('collection').filter(o => o.hasOwnProperty('name')); // returns -> [{name: 'Larry'}, {name: 'David'}] 

// Chainable API
db.add('new-collection').insert('this', 'is', 'p', 'neat');
db.get('new-collection').join(' '); // returns -> 'this is p neat'

```

## Event Messaging 

Event messaging is supported, but optional.

```
// Pass Emitter on Instantiation
var bus = new EventEmitter();
var db = createStore(bus);

db.add('kraftwerk').insert('ralf', 'florian', 'wolfgang', 'karl');
var band = db.get('kraftwerk');

bus.on('store:create', function(name){
	console.log(`${name} collection has been created`);
});

bus.on('store:insert', function(name){
	console.log(`${name} collection has been updated`);
})

bus.on('store:fetch', function(name){
	consoel.log(`${name} collection has been fetched`);
});

```
