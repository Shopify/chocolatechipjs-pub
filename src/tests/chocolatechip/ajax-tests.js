module('AJAX Tests', {
  setup: function() {
    window.xhr = sinon.useFakeXMLHttpRequest();
  },
  teardown: function() {
    window.xhr.restore();
    window.xhr = null;
  }
});

// 1
test('$.post works with FormData', function() {
  var formData = new FormData();
  formData.append("name", "value");

  var request = null;
  xhr.onCreate = function(xhr) {
    request = xhr;
  };

  $.post('http://www.google.com', formData, function() {});
  ok(request, 'Should create request');
  equal(request.requestBody, formData, 'Should set requestBody');
});

// 2
test('$.ajax handles errors', function() {
  var request = null;
  xhr.onCreate = function(xhr) {
    request = xhr;
  };

  var errorHandlerCalled = false;
  var promiseFailed = false;
  var readyState = 0;
  var op = $.ajax({url: 'http://www.google.com', error: function() {errorHandlerCalled = true;}});
  op.fail(function(status, context, xhr) {
    promiseFailed = true;
    readyState = xhr.readyState;
  });
  request.respond(400, {}, "Error");
  request.onreadystatechange();

  ok(errorHandlerCalled, 'Should call error handler');
  ok(promiseFailed, 'Should fail promise');
  equal(readyState, 4, 'Should fail after receiving response body');
});

// 3
test('$.ajax notifies of progress', function() {
  var request = null;
  xhr.onCreate = function(xhr) {
    request = xhr;
  };

  var lastReadyState = 1;
  var op = $.ajax({url: 'http://www.google.com', error: function() {errorHandlerCalled = true;}});
  op.progress(function(args) {
    var readyState = args[0];
    var xhr = args[1];
    equal(readyState, xhr.readyState);
    equal(readyState, lastReadyState + 1);
    lastReadyState = readyState;
  });
  op.done();
  request.respond(200, {}, "OK");
  request.onreadystatechange();

  equal(lastReadyState, 4, 'Last readyState should be DONE');
});

// 4
test('$.ajax returns a promise', function() {
  var promise = $.ajax({url: 'http://www.google.com', success: function() {errorHandlerCalled = true;}});
  ok(promise.done);
  ok(promise.fail);
});

// 5
test('$.get returns a promise', function() {
  var promise = $.get('http://www.google.com', function() {});
  ok(promise.done);
  ok(promise.fail);
});

// 6
test('$.get returns a rejected promise if parameters are invalid', function() {
  var responseCode = 0;
  $.get()
    .fail(function(code) {
      responseCode = code;
    });

  equal(responseCode, 412, "Should fail with a 412 code");
});

// 7
test('$.post returns a promise', function() {
  var promise = $.post('http://www.google.com', 'data', function() {});
  ok(promise.done);
  ok(promise.fail);
});

// 8
test('$.get returns a rejected promise if parameters are invalid', function() {
  var responseCode = 0;
  $.post()
    .fail(function(code) {
      responseCode = code;
    });

  equal(responseCode, 412, "Should fail with a 412 code");
});
