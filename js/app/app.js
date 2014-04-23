define(function (require) {

    var Backbone = require('backbone'),
        _ = require('underscore'),
        templates = require('text!../../templates/main.html'),
        Router = require('./router'),
        app;

    $('body').append(templates);

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g,
        evaluate: /\[\[(.+?)\]\]/g
    };

    app = new Router();
    Backbone.history.start();
    return app;
});