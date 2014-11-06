module('Form Tests');

// 1
test('$.form2JSON input serialization', function() {
  var form = $('#vanilla');
  var serializedForm = $.form2JSON('#vanilla', '.');
  equal(serializedForm.input1, form.children('[name=input1]').val(), 'Should have serialized text input');
  equal(serializedForm.input2, form.children('[name=input2]').val(), 'Should have serialized checkbox input');
  equal(serializedForm.input3, form.children('[name=input3]').val(), 'Should have serialized color input');
  equal(serializedForm.input4, form.children('[name=input4]').val(), 'Should have serialized date input');
  equal(serializedForm.input5, form.children('[name=input5]').val(), 'Should have serialized password input');
  equal(serializedForm.input6, form.children('[name=input6]').val(), 'Should have serialized hidden input');
  equal(serializedForm.input7, form.children('[name=input7]').val(), 'Should have serialized month input');
  equal(serializedForm.input8, form.children('[name=input8]').val(), 'Should have serialized number input');
  equal(serializedForm.input9, form.children('[name=input9]').val(), 'Should have serialized radio input');
  equal(serializedForm.input10, form.children('[name=input10]').val(), 'Should have serialized time input');
  equal(serializedForm.input11, undefined, 'Should not have serialized button input');
  equal(serializedForm.input12, undefined, 'Should not have serialized image input');
  equal(serializedForm.textarea, form.children('[name=textarea]').val(), 'Should have serialized textarea');
  equal(serializedForm.select, form.children('[name=select]').val(), 'Should have serialized select');
  equal(serializedForm.submit, undefined, 'Should not have serialized submit input');
  equal(serializedForm.reset, undefined, 'Should not have serialized reset input');
});

// 2
test('$.form2JSON nesting values by name and delimiter', function() {
  var form = $('#nested');
  var serializedForm = $.form2JSON('#nested', '.');
  equal(serializedForm.input1, $('#nestedinput1').val(), 'Should have serialized input as root property');
  equal(serializedForm.nested.input2, $('#nestedinput2').val(), 'Should have serialized input under nested property');
  equal(serializedForm.nested.input3, $('#nestedinput3').val(), 'Should have serialized input under nested property as well');
  equal(serializedForm.deep.nested.input4, $('#nestedinput4').val(), 'Should have serialized input under deep.nested property');
});

// 3
test('$.form2FormData', function() {
  var form = $('#vanilla');
  var serializedForm = $.form2FormData('#vanilla');
  equal(serializedForm.constructor, FormData, 'Should return a FormData object');
});
