'use strict';

/**
 * @ngdoc function
 * @name monitoringWebappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the monitoringWebappApp
 */
angular.module('monitoringWebappApp')
  .controller('MainCtrl', function ($scope) {

    $scope.services = [
      {
        hostname: "acmeair-host1",
        name: "nginx1",
        ip: "172.16.1.130",
        managerPort: 9001
      }/*,
      {
        hostname: "acmeair-host2",
        name: "main-service-liberty1",
        ip: "172.16.1.54",
        managerPort: 9002
      }*/,
      {
        hostname: "acmeair-host3",
        name: "auth-service-liberty1",
        ip: "172.16.1.139",
        managerPort: 9003
      },
      {
        hostname: "acmeair-host4",
        name: "booking-service-liberty1",
        ip: "172.16.1.110",
        managerPort: 9004
      },
      {
        hostname: "acmeair-host5",
        name: "customer-service-liberty1",
        ip: "172.16.1.137",
        managerPort: 9005
      },
      {
        hostname: "acmeair-host6",
        name: "flight-service-liberty1",
        ip: "172.16.1.3",
        managerPort: 9006
      }/*,
      {
        hostname: "acmeair-host7",
        name: "support-service-liberty1",
        ip: "172.16.1.145",
        managerPort: 9007
      }*/
    ];
  });
