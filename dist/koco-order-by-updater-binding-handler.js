'use strict';

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _kocoStringUtilities = require('koco-string-utilities');

var _kocoStringUtilities2 = _interopRequireDefault(_kocoStringUtilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultSettings = {
    argumentName: 'title',
    orderByFunction: null,
    orderByArgumentName: 'orderBy',
    orderByDirectionArgumentName: 'orderByDirection',
    enabled: true
};

//TODO: Permettre de spécifier orderByDirection par défaut (premier sens lorsque nouvellement sélectionner)
// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

_knockout2.default.bindingHandlers.orderByUpdater = {
    init: function init(element, valueAccessor, allBindingsAccessor, viewModel) {
        var settings = _jquery2.default.extend({}, defaultSettings, allBindingsAccessor().orderByUpdaterSettings);
        var $element = (0, _jquery2.default)(element);

        if (settings.enabled) {
            $element.click(function (event) {
                event.preventDefault();
                settings.orderByFunction.call(viewModel, settings.argumentName, event);

                return false;
            });
        } else {
            $element.removeAttr('href').changeElementType('span');
        }
    },
    update: function update(element, valueAccessor, allBindingsAccessor, viewModel) {
        var settings = _jquery2.default.extend(defaultSettings, allBindingsAccessor().orderByUpdaterSettings),
            $element = (0, _jquery2.default)(element),
            pagingInfo = _knockout2.default.unwrap(valueAccessor()),
            currentOrderByDirection = pagingInfo.orderByDirection,
            currentOrderBy = pagingInfo.orderBy;

        if (settings.enabled) {
            $element.find('i').remove();

            if (_kocoStringUtilities2.default.equalsIgnoreCase(currentOrderBy, settings.argumentName)) {
                //mettre la fleche
                if (_kocoStringUtilities2.default.equalsIgnoreCase(currentOrderByDirection, 'descending')) {
                    $element.append('<i class="fa fa-caret-down"></i>');
                } else {
                    $element.append('<i class="fa fa-caret-up"></i>');
                }
            }
        }
    }
};