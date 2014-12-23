angular.module('dynamicFormApp.services', []).factory('person', function($resource) {
    return $resource('http://localhost:7474/db/data/label/Person/nodes', { }, { });
}).factory('bulle', function($resource) {
      return $resource('http://localhost:7474/db/data/label/Bulle/nodes', { }, { });
}).factory('Cypher', function($resource) {
    return $resource('http://localhost:7474/db/data/cypher', { }, { });
}).factory('NodeDetail', function($resource) {
    return $resource('http://localhost:7474/db/data/node/1', { }, { });
});

