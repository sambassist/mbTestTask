(function(module) {
try {
  module = angular.module('testTask');
} catch (e) {
  module = angular.module('testTask', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/views/testTemplate.html',
    '');
}]);
})();