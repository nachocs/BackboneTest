define(function (require) {
    var Backbone = require('backbone'),
        CollectionView = require('./jobCollectionView'),
        Collection = require('./jobCollection'),
        router = Backbone.Router.extend({
            routes: {
                '': 'home',
                'home': 'home',
                'blank': 'blank'
            },
            initialize: function () {
                var collection = new Collection();
                this.collectionView = new CollectionView({
                    collection: collection
                });
                $('#container').append(this.collectionView.render().el);

            },
            home: function () {},
            blank: function () {
                $('#container').empty();
                $('#container').text('blank');
            }
        });
    return router;
});