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
  $('#design').on('change',function() {
    console.log($(this).val());
    if($('#color').show() != true){
      $('#color').show();
    }

  //check design selection and adjust color options accordingly
    if($(this).val() === 'js puns') {
      $('#color option:lt(3)').show();
      $('#color option').slice(-3).hide();
    } else if($(this).val() === 'heart js') {
      $('#color option:lt(3)').hide();
      $('#color option').slice(-3).show();
    } else {
      $('#color').hide();
      $('.is-hidden').show();
    }

  });
 

});





