var aaangularjsapplication =
angular.module('aaangularjsapplication', []);


aaangularjsapplication.directive('aadropdownmultiselect', function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            multiselectoptions: '=',
            maxlenghttoshowselectedvalues: '=',
            onchangeeventofcheckbox: '&',
        },
        template:
        '<div class="btn-group" ng-class={open:open}> \
            <button type="button" class="multiselect dropdown-toggle btn btn-default" title="None selected" ng-click="toggledropdown()"> \
                <span class="multiselect-selected-text">{{model.toggletext}}</span> \
                <b class="caret"></b> \
            </button> \
            <ul class="multiselect-container dropdown-menu"> \
                <li class="multiselect-item filter" value="0"> \
                    <div class="input-group"> \
                        <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span> \
                        <input class="form-control multiselect-search" type="text" placeholder="Search" ng-model="model.query"><span class="input-group-btn"> \
                            <button class="btn btn-default multiselect-clear-filter" ng-click="clearsearch()" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button> \
                        </span> \
                    </div> \
                </li> \
                <li class="multiselect-item multiselect-all"><label style="padding: 3px 20px 3px 40px;margin-top:0px;margin-bottom:0px" class="checkbox"><input type="checkbox" ng-model="model.selectall" ng-change="toggleselectall()">Select all</label></li> \
                <li ng-repeat="option in (filteredOptions = (multiselectoptions| filter:model.query))"><label style="padding: 3px 20px 3px 40px;margin-top:0px;margin-bottom:0px" class="checkbox"><input type="checkbox" ng-checked="isselected(option)" ng-model="option.Selected" ng-change="toggleselecteditem(option);doOnChangeOfCheckBox()">{{option.Text}}</label></li> \
            </ul> \
        </div>',
        controller: function ($scope) {
            debugger;
            $scope.toggledropdown = function () {
                $scope.open = !$scope.open;
            };

            $scope.toggleselectall = function ($event) {
                var selectallclicked = true;
                if ($scope.model.selectall == false) {
                    selectallclicked = false;
                }
                $scope.doonselectallclick(selectallclicked, $scope.filteredOptions);
            };

            $scope.doonselectallclick = function (selectallclicked, optionArrayList) {
                $scope.model = [];
                if (selectallclicked) {
                    angular.forEach(optionArrayList, function (item, index) {
                        item["Selected"] = true;
                        $scope.model.push(item);
                    });

                    if (optionArrayList.length == $scope.multiselectoptions.length)
                    {
                        $scope.model.selectall = true;
                    }
                }
                else {
                    angular.forEach(optionArrayList, function (item, index) {
                        item["Selected"] = false;
                    });
                    $scope.model.selectall = false;
                }
                $scope.settoggletext();
            }

            $scope.toggleselecteditem = function (option) {
                var intIndex = -1;
                angular.forEach($scope.model, function (item, index) {
                    if (item.Value == option.Value) {
                        intIndex = index;
                    }
                });

                if (intIndex >= 0) {
                    $scope.model.splice(intIndex, 1);
                }
                else {
                    $scope.model.push(option);
                }

                if ($scope.model.length == $scope.multiselectoptions.length) {
                    $scope.model.selectall = true;
                }
                else {
                    $scope.model.selectall = false;
                }
                $scope.settoggletext();
            };

            $scope.clearsearch = function () {
                $scope.model.query = "";
            }

            $scope.settoggletext = function () {
                if ($scope.model.length > $scope.maxlenghttoshowselectedvalues) {
                    $scope.model.toggletext = $scope.model.length + " Selected";
                }
                else {
                    $scope.model.toggletext = "";
                    angular.forEach($scope.model, function (item, index) {
                        if (index == 0) {
                            $scope.model.toggletext = item.Text;
                        }
                        else {
                            $scope.model.toggletext += ", " + item.Text;
                        }
                    });

                    if (!($scope.model.toggletext.length > 0)) {
                        $scope.model.toggletext = "None Selected"
                    }
                }
            }

            $scope.isselected = function (option) {
                var selected = false;
                angular.forEach($scope.model, function (item, index) {
                    if (item.Value == option.Value) {
                        selected = true;
                    }
                });
                option.Selected = selected;
                return selected;
            }

            $scope.doOnChangeOfCheckBox = function () {
                $scope.onchangeeventofcheckbox();
            }

            var onload = function () {
                if ($scope.model.length == $scope.multiselectoptions.length) {
                    $scope.doonselectallclick(true, $scope.multiselectoptions);
                }
                $scope.settoggletext();
            }();
        }
    }
});

