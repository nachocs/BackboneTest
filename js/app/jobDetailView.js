define(function (require) {
    var Backbone = require('backbone'),
        ActivityView = require('./activityView'),
        ActivityCollection = require('./activityCollection');

    var detailView = Backbone.View.extend({
        className: 'detail-view',
        initialize: function (options) {
            this.parentView = options.parentView;
            this.template = _.template($('#detail-template').html());
            this.listenTo(this.model, 'change', this.render);
            this.on('close', this.close, this);
            this.on('expand', this.expand, this);
            this.on('contract', this.contract, this);
            this.model.fetch({
                reset: true
            });
            $('body').append(this.render().el);

        },
        events: {
            'click .view_all': 'close'
        },
        render: function () {
            var self = this;
            if (typeof this.model.toJSON().id !== 'undefined') {
                this.el.innerHTML = this.template(this.model.toJSON());

                var activityCollection = new ActivityCollection({
                    "asset": this.model.toJSON().id
                });
                this.childView = new ActivityView({
                    collection: activityCollection,
                    'parentView': self
                });
                this.$el.find('.applications-container').append(this.childView.render().el);

                if (this.afterRender && typeof this.afterRender === 'function') {
                    this.afterRender.apply(this);
                }
            }
            return this;
        },
        expand: function () {
            this.$el.animate({
                width: "100%",
                paddingLeft: "60px"
            }, "slow");
        },
        contract: function () {
            this.$el.animate({
                width: "75%",
                paddingLeft: "0px"
            }, "slow");
        },
        afterRender: function () {
            this.$el.css({
                height: $(document).height()
            }).show().children('.main').animate({
                right: '0px'
            }, "slow", function () {});
        },
        close: function () {
            var self = this;
            this.childView.trigger('close');

            this.$el.children('.main').animate({
                right: '-100%'
            }, "slow", function () {
                self.$el.hide();
                self.remove();
                delete self.parentView.childView;
            });
            this.parentView.$el.removeClass('on');
        }
    });
    return detailView;

});