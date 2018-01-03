module.exports = function collectionStore(){
	var data = {};

	return {
		add: function(name){
			if(!name || typeof name !== 'string'){
					throw new Error('No Collection Name Given');
			}
		
			data[name] = [];
			return this;
		},
		
		get: function(name){
			if(!name || typeof name !== 'string'){
					throw new Error('No Collection Name Given');
			} 

			if(!data[name]){
				throw new Error('Collection Not Found');
			}
			
			return data[name];
		},

		insert: function(name, ...values){
			data[name].push(...values);
			return this;
		}
	};
};
