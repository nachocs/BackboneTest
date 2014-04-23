define(function (require) {
    var Backbone = require('backbone');
    var SmallModel = require('./smallModel');
    var SmallView = require('./smallView');

    var itemView = Backbone.View.extend({
        className: 'activity-item',
        initialize: function (options) {
            this.parentView = options.parentView;

            this.template = _.template($('#activity-item-template').html());
            this.model.on('closeChildren', this.closeChildren, this);
            this.on('contract', this.contract, this);
            this.on('close', this.closeChildren, this);
            this.childViews = [];
        },
        events: {
            'click [data-view_id]': 'openSmallView'
        },
        closeChildren: function (target) {
            this.childViews.forEach(function (item) {
                item.trigger('close');
            });
            this.$('.on').each(function (index, ele) {
                if (ele !== target) {
                    $(ele).removeClass('on');
                }
            });
            return this;
        },
        contract: function () {
            this.parentView.trigger('contract');
        },
        openSmallView: function (ev) {
            this.parentView.trigger('expand');

            this.openchild = true;
            this.model.trigger('details');
            this.closeChildren(ev.currentTarget);
            if ($(ev.currentTarget).hasClass('on')) {
                $(ev.currentTarget).removeClass('on');
            } else {
                var smallModel = new SmallModel({
                    'asset': $(ev.currentTarget).data('view_id'),
                    'view_type': $(ev.currentTarget).data('view_type')
                });
                var smallView = new SmallView({
                    model: smallModel,
                    parentView: this
                });
                this.childViews.push(smallView);
                $(ev.currentTarget).addClass('on');
            }
        },
        render: function () {
            this.el.innerHTML = this.template(this.model.toJSON());

            return this;
        }
    });
    return itemView;

});