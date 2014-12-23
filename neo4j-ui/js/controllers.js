angular.module('dynamicFormApp.controllers', [])
    .controller('ListPersonController', function($scope, $state, $window, person, Cypher, bulle)
            {
               $scope.person = person.query();

               /*$scope.loadAllProcesses = function() {
                    $scope.spheres = bulle.query(function() {
                        angular.forEach($scope.spheres, function(value) {
                          $scope.loadFullSphere(value);
                        });
                    });
                }

                $scope.loadFullSphere = function(sphere) {
                    var cypher = new Cypher({"query" : "MATCH (pr)-[r2:MEMBEROF]->(sd:SubDomain)-[r3:MEMBEROF]->(d:Domain)-[r4:MEMBEROF]->(b:Bulle {name : '"+ sphere.data.name +"'})"
                                                                       + " OPTIONAL MATCH (pr:Process)<-[r:OWNS]-(pe:Person)"
                                                                       + " OPTIONAL MATCH (appl:Applications)-[r5]-(pr)"
                                                                       + " RETURN DISTINCT(b.name) , d.name, sd.name,  pr.name, pe.name, appl.name"});
                    cypher.$save(function(response) {
                        sphere.hierarchy = response;
                    });
                }*/

           /* MATCH (pr)-[r2:MEMBEROF]->(sd:SubDomain)-[r3:MEMBEROF]->(d:Domain)-[r4:MEMBEROF]->(b:Bulle)
            WHERE b.name IN ['Get','Buy']
            OPTIONAL MATCH (pr:Process)<-[r:OWNS]-(pe:Person)
            OPTIONAL MATCH (appl:Applications)-[r5]-(pr)
            RETURN DISTINCT(b.name) , d.name, sd.name, pr.name, pe.name, appl.name*/

                $scope.spheres = bulle.query();

                $scope.loadMemberOf = function(name, type) {
                    var cypher = new Cypher({"query" : "MATCH (n {name: '" + name + "'})<-[r:MEMBEROF]-(m) RETURN DISTINCT(m.name)"});
                    cypher.$save(function(response) {
                        if (type == 'sphere') {
                            $scope.domains = response;
                        } else if (type == 'domain') {
                            $scope.subDomains = response;
                        }
                    });
                };

                $scope.loadProcesses = function() {
                    var cypher = new Cypher({"query" : "MATCH (pr)-[r2:MEMBEROF]->(sd:SubDomain)-[r3:MEMBEROF]->(d:Domain)-[r4:MEMBEROF]->(b:Bulle)"
                                                                       + " WHERE b.name = '" + $scope.selectedSphere.data.name + "'"
                                                                       + " OPTIONAL MATCH (pr:Process)<-[r:OWNS]-(pe:Person)"
                                                                       + " OPTIONAL MATCH (appl:Applications)-[r5]-(pr)"
                                                                       + " RETURN DISTINCT(b.name) , d.name, sd.name,  pr.name, pe.name, appl.name"});
                    cypher.$save(function(response) {
                        $scope.processes = response;
                    });
                }

                //$scope.loadAllProcesses();

            })
   .controller('AccordionDemoCtrl', function ($scope, bulle, Cypher) {

        $scope.loadSpheres = function() {
            $scope.spheres = bulle.query(function() {
                angular.forEach($scope.spheres, function(value) {
                  $scope.loadSphere(value);
                });
            });
        }

        $scope.loadSphere = function(sphere) {
            var cypher = new Cypher({"query" : "MATCH (b:Bulle {name : '"+ sphere.data.name +"'})<-[r]-(d)<-[r2]-(sd)<-[r3]-(p)<-[r4]-(pe:Person {name : '"+ $scope.selectedPerson.data.name  +"'}) RETURN DISTINCT(b.name), d.name, sd.name, p.name"});
            cypher.$save(function(response) {
                sphere.hierarchy = response;
            });
        }
    }).controller('ModalDemoCtrl', function ($scope, $modal, $log) {

        $scope.open = function (size) {

          var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        };
      }).controller('ModalInstanceCtrl', function ($scope, $modalInstance, bulle, Cypher) {

        $scope.spheres = bulle.query();

         $scope.loadMemberOf = function(name, type) {
            var cypher = new Cypher({"query" : "MATCH (n {name: '" + name + "'})<-[r:MEMBEROF]-(m) RETURN DISTINCT(m.name)"});
            cypher.$save(function(response) {
                if (type == 'sphere') {
                    $scope.domains = response;
                } else if (type == 'domain') {
                    $scope.subDomains = response;
                }
            });
         };

        $scope.createProcess = function() {
            var cypher = new Cypher({"query" : "MATCH (n {name: '"+ $scope.selectedSubDomain +"'}) CREATE (n)<-[r:MEMBEROF]-(m {name: '"+ $scope.selectedProcess +"'}) RETURN n, m"});
            cypher.$save(function(response) {
                alert(response);
            });
        }

        $scope.ok = function () {
            $scope.createProcess();
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
.directive('modelUndefined', function(){
   return {
     require: 'ngModel',
     link: function(scope,elm,attrs,ngModel){
       ngModel.$parsers.push(function(val){

          return val === "" ? undefined : val;
       });
     }
   }
 })
 ;



