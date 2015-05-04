# koco-order-by-updater-binding-handler
Knockout binding handler for ordering lists.

## Installation

```bash
bower install koco-order-by-updater-binding-handler
```

## Usage with KOCO

This is a shared module that is used in many other modules. The convention is to require the handler in the `knockout-binding-handlers.js` file like so:

```javascript
define([
  ...
  'bower_components/koco-order-by-updater-binding-handler/src/koco-order-by-updater-binding-handler'
  ...
],
```

It also includes the `string-utilities` library as a bower dependency. You will need to configure an alias in the `require.configs.js` file for the dependency if you haven't already:

```javascript
paths: {
  ...
  'string-utilities': 'bower_components/koco-string-utilities/src/string-utilities',
  ...
}
```

`koco-order-by-updater-binding-handler` requires you to provide your own orderByFunction. To use it in a knockout template:
```html
<th>
<a href="#" data-bind="orderByUpdater: pagingInfo, orderByUpdaterSettings: {argumentName:'AttributeName', orderByFunction: updateOrderBy, enabled:!sortable}">
Column Name
</a>
</th>
],
```