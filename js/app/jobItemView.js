define(function (require) {
    var Backbone = require('backbone'),
        DetailView = require('./jobDetailView'),
        DetailModel = require('./jobDetailModel');

    var itemView = Backbone.View.extend({
        tagName: 'tr',
        initialize: function () {
            this.template = _.template($('#item-template').html());
            this.model.on('closeChildren', this.closeChild, this);
        },
        events: {
            'click .detail': 'openDetail'
        },
        closeChild: function (option) {
            if (this.childView && (!this.openchild || option)) {
                this.childView.trigger('close');
            } else {
                this.openchild = false;
            }
            this.$el.removeClass('on');
        },
        openDetail: function (ev) {
            var detailModel;
            this.openchild = true;
            this.model.trigger('details');
            if (typeof this.childView === 'undefined') {
                this.$el.addClass('on');
                detailModel = new DetailModel({
                    'asset': this.model.toJSON().id
                });
                this.childView = new DetailView({
                    model: detailModel,
                    parentView: this
                });
            } else {
                this.closeChild(true);
            }
        },
        render: function () {
            this.el.innerHTML = this.template(this.model.toJSON());

            return this;
        }
    });
    return itemView;

});