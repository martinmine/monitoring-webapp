'use strict';

/**
 * @ngdoc overview
 * @name monitoringWebappApp
 * @description
 * # monitoringWebappApp
 *
 * Main module of the application.
 */
angular
  .module('monitoringWebappApp', ['chart.js'])
  .directive('networkView', function($http) {

    return {
      restrict: 'E',
      link: function(scope, element, attr) {
        scope.labels = [];
        scope.data = [[], []];

        var addDataPoint = function(rxBytes, txBytes) {
          scope.data[0].push(rxBytes);
          scope.data[1].push(txBytes);

          if (scope.data[0].length > 20) {
            scope.data[0].shift();
            scope.data[1].shift();
          } else {
            scope.labels.push("");
          }
        };

        var lastRxBytes = -1;
        var lastTxBytes = -1;

        setInterval(function() {
          $http({
            method: 'GET',
            url: 'http://localhost:' + scope.service.managerPort +'/systemStatus/network'
          }).then(function successCallback(response) {
            angular.forEach(response.data, function(key) {
              if (key.name == 'eth0') {
                if (lastRxBytes > 0) {
                  var deltaRx = key.receive.bytes - lastRxBytes;
                  var deltaTx = key.transmit.bytes - lastTxBytes;

                  lastRxBytes = key.receive.bytes;
                  lastTxBytes = key.transmit.bytes;
                  addDataPoint(deltaRx, deltaTx);
                } else {
                  lastRxBytes = key.receive.bytes;
                  lastTxBytes = key.transmit.bytes;
                }
              }
            });
            }, function errorCallback(response) {
              console.log(response);
            });
        }, 1000);
        
        scope.datasetOverride = [
          { 
            yAxisID: 'y-axis-1',
            tension: 0,
            label: "Receive"
          },
          {
            yAxisID: 'y-axis-1',
            tension: 0,
            label: "Transmit",
            borderColor: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
          }];

        scope.options = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              },
              {
                id: 'y-axis-2',
                type: 'linear',
                display: false,
                position: 'right'
              }
            ]
          },
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }
          ],
          animation: false,
          bezierCurve: false,
          responsive: true, 
          maintainAspectRatio: false
        };
      },
      scope: {
        service: '='
      },
      templateUrl: 'directives/network-view.html'
    };
  })
  .directive('cpuView', function($http) {
    return {
      restrict: 'E',
      link: function(scope, element, attr) {
        scope.labels = [];
        scope.data = [[]];

        var addDataPoint = function(usage) {
          scope.data[0].push(usage);

          if (scope.data[0].length > 20) {
            scope.data[0].shift();
          } else {
            scope.labels.push("");
          }
        };

        setInterval(function() {
          $http({
            method: 'GET',
            url: 'http://localhost:' + scope.service.managerPort +'/systemStatus'
          }).then(function successCallback(response) {
            addDataPoint(response.data.systemCpuLoad * 100);
          }, function errorCallback(response) {
            console.log(response);
          });
        }, 1000);
        
        scope.datasetOverride = [{ yAxisID: 'y-axis-1', tension: 0 }];
        scope.options = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                  beginAtZero: true,
                  max: 100
                }
              }
            ]
          },
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }
          ],
          animation: false,
          bezierCurve: false,
          responsive: true, 
          maintainAspectRatio: false
        };
      },
      scope: {
        service: '='
      },
      templateUrl: 'directives/cpu-view.html'
    };
  });
