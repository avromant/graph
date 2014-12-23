angular.module('dynamicFormApp', ['ui.router', 'ngResource', 'dynamicFormApp.controllers', 'dynamicFormApp.services','ui.bootstrap'])

angular.module('dynamicFormApp')
.config(function($stateProvider) 
        {$stateProvider.state
            (
                'Person', 
                {url: '/person',templateUrl: 'partials/list.html', controller: 'ListPersonController'}
            )
        }
        )
.config(function($stateProvider) 
        {$stateProvider.state
            (
                'NodeDetail',
                {url:'/node', templateUrl: 'partials/config.html', controller: 'GetNodeDetail'}
            );
        }
       )

.run(function($state) {$state.go('Person'); });


