define(function (require) {
    var Backbone = require('backbone'),
        Model = require('./jobItemModel');

    var Collection = Backbone.Collection.extend({
        model: Model,
        initialize: function (models, options) {
            this.on('details', this.closeChildren, this);
        },
        url: function () {
            return "api/jobs/collection.json";
        },
        closeChildren: function () {
            this.each(function (item, index) {
                item.trigger('closeChildren');
            });
        }
    });
    return Collection;

});