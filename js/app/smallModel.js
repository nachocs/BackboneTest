define(function (require) {
    var Backbone = require('backbone');

    var detailModel = Backbone.Model.extend({
        url: function () {
            return "api/" + this.toJSON().view_type + "/" + this.toJSON().asset + ".json";
        }
    });
    return detailModel;

});