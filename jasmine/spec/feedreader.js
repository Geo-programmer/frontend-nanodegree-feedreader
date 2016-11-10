/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });



        it('all has a URL and the URL is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });



        it('all has a name and the name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            })
        });
    });


    describe('The menu', function() {
        var opt;
        beforeEach(function() {
            opt = $('body');
        });


        it('is hidden by default', function() {
            expect(opt.hasClass('menu-hidden')).toBe(true);
        });


        it('is display when clicked and hide when clicked again', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click');
            expect(opt.hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect(opt.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });


        it('is completed and at least has a single .entry element within the .feed container', function() {
            var entrys = $('.feed .entry');
            expect(entrys.length).not.toBe(0);
         });

    });

    describe('New Feed Selection', function() {
        var content, newContent;

        beforeEach(function(done) {
            loadFeed(0, function() {
                content = $('.feed').html();
                loadFeed(1, function() {
                    newContent = $('.feed').html();
                    done();
                });
            });

        });

        it('actually changes when a new feed is loaded by the loadFeed function', function() {
            expect(content).not.toEqual(newContent);
        });

    });
}());
