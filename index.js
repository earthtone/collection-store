/**
	@module createStore
	@desc Create Data Store
	@returns {object} store
*/
module.exports = function createCollectionStore(bus){
	/**
		@private
	*/
	var data = {};

	return Object.assign({}, {
		/**
			@function add
			@desc Add/Create New Collection
			@param {string} name
			@returns {object} this
		*/
		add: function(name){
			if(!name || typeof name !== 'string'){
					throw new Error('No Collection Name Given');
			}
		
			data[name] = [];
			
			if(bus){
				bus.emit('store:created', name);
			}

			return this;
		},
		
		/**
			@function get
			@desc Get Collection by Name
			@param {string} name
			@returns {array} collection
		*/
		get: function(name){
			if(!name || typeof name !== 'string'){
					throw new Error('No Collection Name Given');
			} 
	
			if(!data[name]){
				throw new Error('Collection Not Found');
			}
		
			if(bus){
				bus.emit('store:fetch', name);
			}
	
			return data[name];
		},
		/**
			@function insert
			@desc Insert Value in to Collection
			@param {string} name
			@param values
			@returns {object} this
		*/
		insert: function(name, ...values){
			data[name].push(...values);
		
			if(bus){
				bus.emit('store:insert', name);
			}

			return this;
		}
	});
};
