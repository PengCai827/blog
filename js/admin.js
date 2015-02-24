$(function() {

    Parse.$ = jQuery;

    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("bJ4IZmVQAuU7qUf0ppaPTl1lSODjnyc4rb4T14GN", "kv9qXow57wg0mU3hFmzHZaqTJxk2sk1GmJxo92ir");
    $('.form-signin').on('submit', function(e) {

        // Prevent Default Submit Event
        e.preventDefault();

        // Get data from the form and put them into variables
        var data = $(this).serializeArray(),
            username = data[0].value,
            password = data[1].value;

        // Call Parse Login function with those variables
        

    });

    var LoginView = Parse.View.extend({
        template: Handlebars.compile($('#login-tpl').html()),
        events: {
            'submit .form-signin': 'login'
        },
        login: function(e) {

            // Prevent Default Submit Event
            e.preventDefault();

            // Get data from the form and put them into variables
            var data = $(e.target).serializeArray(),
                username = data[0].value,
                password = data[1].value;

            // Call Parse Login function with those variables
            Parse.User.logIn(username, password, {
                // If the username and password matches
                success: function(user) {
                    var welcomeView = new WelcomeView({ model: user });
                    welcomeView.render();
                    $('.main-container').html(welcomeView.el);            },
                // If there is an error
                error: function(user, error) {
                    console.log(error);
                }
            });
        },
        render: function(){
            this.$el.html(this.template());
        }
    }),
        WelcomeView = Parse.View.extend({
			template: Handlebars.compile($('#welcome-tpl').html()),
			events: {
				'click .add-blog': 'add'
			},
			add: function(){
				var addBlogView = new AddBlogView();
				addBlogView.render();
				$('.main-container').html(addBlogView.el);
			},
			render: function(){
				var attributes = this.model.toJSON();
				this.$el.html(this.template(attributes));
			}
		}),
        AddBlogView = Parse.View.extend({
			template: Handlebars.compile($('#add-tpl').html()),
			events: {
				'submit .form-add': 'submit'
			},
			submit: function(e){
				// Prevent Default Submit Event		
				e.preventDefault();
				// Take the form and put it into a data object
				var data = $(e.target).serializeArray(),
				// Create a new instance of Blog
					blog = new Blog();
				// Call .create()
				blog.create(data[0].value, $('textarea').val());
			},
			render: function(){
				this.$el.html(this.template()).find('textarea').wysihtml5();
			}
		});
    		var loginView = new LoginView();
		loginView.render();
		$('.main-container').html(loginView.el);

    });