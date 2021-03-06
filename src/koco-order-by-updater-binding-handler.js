// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ko from 'knockout';
import $ from 'jquery';
import stringUtilities from 'koco-string-utilities';


var defaultSettings = {
    argumentName: 'title',
    orderByFunction: null,
    orderByArgumentName: 'orderBy',
    orderByDirectionArgumentName: 'orderByDirection',
    enabled: true
};

//TODO: Permettre de spécifier orderByDirection par défaut (premier sens lorsque nouvellement sélectionner)
ko.bindingHandlers.orderByUpdater = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var settings = $.extend({}, defaultSettings, allBindingsAccessor().orderByUpdaterSettings);
        var $element = $(element);

        if (settings.enabled) {
            $element.click(function(event) {
                event.preventDefault();
                settings.orderByFunction.call(viewModel, settings.argumentName, event);

                return false;
            });
        } else {
            $element.removeAttr('href').changeElementType('span');
        }
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var settings = $.extend(defaultSettings, allBindingsAccessor().orderByUpdaterSettings),
            $element = $(element),
            pagingInfo = ko.unwrap(valueAccessor()),
            currentOrderByDirection = pagingInfo.orderByDirection,
            currentOrderBy = pagingInfo.orderBy;

        if (settings.enabled) {
            $element.find('i').remove();

            if (stringUtilities.equalsIgnoreCase(currentOrderBy, settings.argumentName)) {
                //mettre la fleche
                if (stringUtilities.equalsIgnoreCase(currentOrderByDirection, 'descending')) {
                    $element.append('<i class="fa fa-caret-down"></i>');
                } else {
                    $element.append('<i class="fa fa-caret-up"></i>');
                }
            }
        }
    }
};
