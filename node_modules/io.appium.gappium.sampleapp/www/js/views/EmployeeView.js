app.views.EmployeeView = Backbone.View.extend({

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    events: {
        "click .back-button": "back",
        "click .map-button": "map"
    },

    back: function(event) {
        window.history.back();
        return false;
    },

    map: function(event) {

        navigator.notification.alert(
            'Map powered by OpenStreetMap', // message
            function() {}, // callback
            'Location', // title
            'Thanks' // buttonName
        );

    }

});
