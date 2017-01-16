var app = new Vue({
    el: '.content',

    data: {
        movies: []
    },

    created: function() {
        this.fetchData();
    },

    methods: {
        fetchData: function() {
            var self = this;
            var list = '/api/';

            fetch(list).then(function(response) {
                return response.json();
            }).then(function(json) {
                self.movies = json.movies;
            });
        }
    }
});

// Jquery Stuff (overly complicated, not useful).
// $(document).ready(function() {
//
//     $.getJSON('/api/')
//     .done(function(data) {
//         displayMovies(data.movies);
//     })
//     .fail(function(error) {
//         console.log("Request Failed:", error);
//     });
//
//     var displayMovies = function(movies) {
//         var list = $('<ul />');
//
//         movies.forEach(function(movie) {
//             var listItem = $('<li />');
//
//
//             listItem.text(movie.name + " " + movie.length); // Movie Length should be italics
//             list.append(listItem);
//         });
//
//         $('.movie-container').append(list);
//     }
//
// });
