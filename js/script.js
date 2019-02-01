//ensure script executes once the DOM is ready
$(document).ready((e)=> {
  //focus on first textbox when page loads and set hidden items
  $('#name').focus();

  //initialize hidden items
  $('#other-title').hide();
  $('#color').hide();

  //activate 'Other' text field on selection
  $('#title').change( function() {
    if($(this).val() === 'other') {
      $('#other-title').show().focus();
    };
  });

  //***FOR EXCEEDS activate color selection after design is selected */
  $('#design').change( function() {
    $('#color').show();
  });

});





