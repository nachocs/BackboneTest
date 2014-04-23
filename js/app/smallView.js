define(function (require) {
    var Backbone = require('backbone');

    var itemView = Backbone.View.extend({
        className: "detail-view",
        initialize: function (options) {
            this.parentView = options.parentView;
            this.template = _.template($('#smallview-template').html());
            this.listenTo(this.model, 'change', this.render);
            this.on('close', this.close, this);

            this.model.fetch({
                reset: true
            });
            $('body').append(this.render().el);
        },
        events: {
            'click': 'goBack'
        },
        render: function () {
            this.el.innerHTML = this.template(this.model.toJSON());
            if (this.afterRender && typeof this.afterRender === 'function') {
                this.afterRender.apply(this);
            }
            return this;
        },
        afterRender: function () {
            this.$el.css({
                height: $(document).height()
            }).show().children('.main').animate({
                right: '0px'
            }, "slow", function () {});
            return this;
        },
        goBack: function () {
            this.parentView.trigger('contract');
            this.close();
        },
        close: function () {
            var self = this;
            this.$el.children('.main').animate({
                right: '-100%'
            }, "slow", function () {
                self.$el.hide();
                self.remove();
                delete self.parentView.childView;
            });
        }
    });
    return itemView;

});