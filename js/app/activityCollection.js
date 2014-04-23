define(function (require) {
    var Backbone = require('backbone');
    var Model = require('./activityItemModel');

    var Collection = Backbone.Collection.extend({
        model: Model,
        initialize: function (options) {
            if (typeof options.asset !== 'undefined') {
                this.asset = options.asset;
            }
            this.on('details', this.closeChildren, this);
        },
        url: function () {
            return "api/activity/1.json"; // as example
            //            return "api/activity/" + this.asset + ".json";
        },
        closeChildren: function () {
            this.each(function (item, index) {
                item.trigger('closeChildren');
            });
        }
    });
    return Collection;

});