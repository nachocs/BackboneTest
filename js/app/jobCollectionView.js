define(function (require) {
    var Backbone = require('backbone'),
        itemView = require('./jobItemView'),
        Collection = require('./jobCollection');

    var CollectionView = Backbone.View.extend({
        id: 'collection',
        initialize: function () {
            var self = this;
            this.page = 1;
            this.items_per_page = 20;
            this.template = _.template($('#collection-template').html());
            _.bindAll(this, 'render');
            this.collection.bind('reset', this.render);

            this.collection.bind('add', this.addOne, this);
            this.collection.fetch({
                reset: true
            });
        },
        events: {
            'click [data-selectpage]': 'selectpage',
            'change .collection-footer select': 'selectitemsperpage'
        },
        selectpage: function (ev) {
            this.page = $(ev.currentTarget).data('selectpage');
            this.render();
        },
        selectitemsperpage: function (ev) {
            this.items_per_page = $(ev.currentTarget).val();
            this.page = 1;
            this.render();
        },
        render: function () {
            var self = this;
            this.$el.empty();
            this.$el.append(this.template({
                'total_items': self.collection.length,
                'page': self.page,
                'items_per_page': self.items_per_page,
                'total_pages': Math.floor(this.collection.length / self.items_per_page) + 1
            }));
            this.collection.each(function (item, index) {
                if ((index >= (self.page * self.items_per_page)) || (index < ((self.page - 1) * self.items_per_page))) {
                    return;
                }
                self.renderOne(item, self.collection);
            });
            this.showPagination();
            return this;
        },
        showPagination: function () {

        },
        renderOne: function (model, col) {
            var view = new itemView({
                model: model,
                collection: col
            });
            this.$el.find('tbody').append(view.render().el);
        },
        addOne: function (model, col) {
            this.renderOne(model, col);
        }
    });
    return CollectionView;
});