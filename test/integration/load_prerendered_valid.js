var test        = require('tap').test,
    trebuchet   = require('../../lib/index')('POSTMARK_API_TEST');

trebuchet.load({
    params: {
        from:       'kitty@diy.org',
        to:         'puppy@diy.org',
        subject:    'This is only a test of the prerendered load/fire pattern'
    },
    prerendered: true,
    html: '<b>prerendered with only the finest libraries</b>',
    text: 'prerendered text, even!',
}, function (err, result) {
    test('integration', function (t) {
        t.equal(err, null, 'error object is null');
        t.type(result, 'number', 'result is a number');
        t.equal(result, 1, 'result is of expected value');
        t.end();
    });

    trebuchet.fire(function (err, result) {
        test('integration', function (t) {
            t.equal(err, null, 'error object is null');
            t.type(result, 'object', 'api response is an object');
            t.equal(result['ErrorCode'], 0, 'api error code is 0');
            t.equal(result['Message'], 'Test job accepted', 'api message is as expected');
            t.end();
        });
    });
});