const test = require('tape');
const store = require('../index');

test('Store is Function', function(assert){
	assert.equal(typeof store, 'function');
	assert.end();
});

test('Store Returns Object', function(assert){
	var actual = store();
	
	assert.equal(actual.toString(), '[object Object]');
	assert.end();
});

test('add Is Method', function(assert){
	var actual = store();
	
	assert.equal(typeof actual.add, 'function');
	assert.end();
});

test('add Requires Name Property', function(assert){
	assert.throws(function(){
		store.add();
	}, Error);
	
	assert.throws(function(){
		store.add(1);
	}, Error);

	assert.throws(function(){
		store.add({});
	}, Error);

	assert.throws(function(){
		store.add(undefined);
	}, Error);

	assert.throws(function(){
		store.add(null);
	}, Error);

	assert.end();
});

test('get is Method', function(assert){
	var actual = store();

	assert.equal(typeof actual.get, 'function');
	assert.end();
});

test('get Takes Name Property and Returns Array', function(assert){
	var actual = store();
	actual.add('param');

	assert.ok(Array.isArray(actual.get('param')));
	assert.end();
});

test('insert is Method', function(assert){
	var actual = store();
	
	assert.equal(typeof actual.insert, 'function');
	assert.end();
});

test('Use insert to Save Properties and get to Retrive Properties', function(assert){
	var actual = store();
	actual.add('collection');
	actual.insert('collection', 1);

	assert.deepEqual(actual.get('collection'), [1]);
	assert.end();
});

test('insert can Input Multiple Values', function(assert){
	var actual = store();
	actual.add('collection');
	actual.insert('collection', 1, 2, 3);

	assert.deepEqual(actual.get('collection')[0], 1);
	assert.deepEqual(actual.get('collection')[1], 2);
	assert.deepEqual(actual.get('collection')[2], 3);

	assert.end();
});

test('get Throws Error if No Collection Found', function(assert){
	var actual = store();
	
	assert.throws(function(){
		actual.get('collection');
	}, Error);

	assert.end();
});

test('insert is Type Agnostic', function(assert){
	var actual = store();
	actual.add('collection');
	actual.insert('collection', 1, 'string', false, { param: true });

	assert.equal(typeof actual.get('collection')[0], 'number');
	assert.equal(typeof actual.get('collection')[1], 'string');
	assert.equal(typeof actual.get('collection')[2], 'boolean');
	assert.equal(typeof actual.get('collection')[3], 'object');

	assert.end();
});

test('Chainable API', function(assert){
	var actual = store();
	actual.add('collection').insert('collection', 1, 'string', false);

	assert.equal(actual.get('collection')[1], 'string');
	assert.deepEqual(actual.insert('collection', { param: true }).get('collection')[3], { param: true});
	assert.end();
});

test('Native Array Methods Work on Collections', function(assert){
	var db = store();
	db.add('collection').insert('collection', { name: 'Dave' }, { name: 'Larry' }, { color: 'red' }, { param: true });

	var actual = db.get('collection').find(o => o.hasOwnProperty('color'));
	assert.deepEqual(actual, db.get('collection')[2]);
	
	actual = db.get('collection').filter(o => o.hasOwnProperty('name'));
	assert.deepEqual(actual, [{ name: 'Dave'}, { name: 'Larry'}]);

	assert.end();
});

test('Raw Data is private', function(assert){
	var db = store();
	db.add('collection').insert('collection', 1, 'string', false);
	assert.notOk(db.data);
	assert.pass(`Available Methods: ${Object.keys(db)}`);
	assert.end();
});