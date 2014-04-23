define(function (require) {
    var Backbone = require('backbone');

    var detailModel = Backbone.Model.extend({
        url: function () {
            return "api/jobs/" + this.toJSON().asset + ".json";
        }
    });
    return detailModel;

});