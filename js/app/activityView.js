define(function (require) {
    var Backbone = require('backbone'),
        itemView = require('./activityItemView'),
        Collection = require('./activityCollection');

    var CollectionView = Backbone.View.extend({
        id: 'activity-collection',
        className: 'activityCollection',
        initialize: function (options) {
            var self = this;
            this.parentView = options.parentView;
            this.template = _.template($('#activity-collection-template').html());
            _.bindAll(this, 'render');
            this.childViews = [];
            this.collection.bind('reset', this.render);
            this.on('expand', this.expand, this);
            this.on('contract', this.contract, this);
            this.on('close', this.close, this);

            this.collection.bind('add', this.addOne, this);
            this.collection.fetch({
                reset: true
            });
        },
        close: function () {
            this.childViews.forEach(function (item) {
                item.trigger('close');
            });
        },
        expand: function () {
            this.parentView.trigger('expand');
        },
        contract: function () {
            this.parentView.trigger('contract');
        },
        render: function () {
            var self = this;
            this.$el.empty();
            this.$el.append(this.template({
                'total_items': this.collection.length,
                'page': self.page,
                'items_per_page': self.items_per_page
            }));
            this.collection.each(function (item, index) {
                self.renderOne(item, collection);
            });

            if (this.afterRender && typeof this.afterRender === 'function') {
                this.afterRender.apply(this);
            }
            return this;
        },
        afterRender: function () {},
        renderOne: function (model, col) {
            var view = new itemView({
                model: model,
                collection: col,
                parentView: this
            });
            this.$el.append(view.render().el);
            this.childViews.push(view);
        },
        addOne: function (model, col) {
            this.renderOne(model, col);
        }
    });
    return CollectionView;
});