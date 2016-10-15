

angular
.module('services',['ngResource'])

.factory('Config', function () {
		  return {
		      host: 'me.keeeb.com/api/1.1', // 
		      protocol: 'https://'
		  };
})

.factory('apiService',['$resource','Config',function ($resource,Config) {

		var parms = {}
		parms.token = "Bearer efa27394756f4cc8b8fdb0ff6fdb86ce";
		parms.projectId = "8ef8150c-0b75-42a2-8151-e813cb42a434";
		parms.pageId = "be87cb4e-1e4a-45ce-a833-d230d2c87aaa";

		return{
			// ,{headers: { 'Authorization': 'Bearer ' + parms.token }}
			getProject:$resource(Config.protocol + Config.host + '/projects/' + parms.projectId + '/pages/' + parms.pageId +'/mbs',{},
						{
					        get:{
					            method:"GET",
					            isArray:false,
					            headers:{'Authorization': parms.token} 
					        },
    					}),
			parms : parms
		}
		
}]);
