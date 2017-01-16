var app = new Vue({
    el: '.content',

    data: {
        movies: {}
    },

    created: function() {
        this.fetchData();
    },

    methods: {
        fetchData: function() {
            var self = this;
            var list = '/api/';
            var votes = '/api/votes';

            fetch(list).then(function(response) {
                return response.json();
            }).then(function(json) {
                // Get the movies
                var movies = {}

                json.movies.forEach(function(movie) {
                    movie.votes = 0;
                    movies[movie.id] = movie;
                })

                self.movies = movies;

                // Get the votes
                fetch(votes).then(function(voteResponse) {
                    return voteResponse.json();
                }).then(function(voteJson) {
                    voteJson.votes.forEach(function(vote) {
                        var id = vote.movie.id;
                        var movie = self.movies[id];

                        Vue.set(movie, 'votes', movie.votes + 1)
                    })
                })
            })
        },
        sendVote: function(id) {
            var self = this;
            var voteEndpoint = '/api/vote';

            fetch(
                voteEndpoint + '/1/' + id,
                { method: 'POST' }
                // api / userid / movieid
            ).then(function(response) {
                if (response.ok) {
                    Vue.set(self.movies[id], 'votes', self.movies[id].votes + 1);
                } else {
                    alert('you have already voted for this!');
                }
            })
        }
    }
})

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
