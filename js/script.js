//ensure script executes once the DOM is ready
$(document).ready((e)=> {

 //=========INITIAL SETUP=========
  //initialize focus on first textbox when page loads 
  $('#name').focus();

  //initialize hidden items
$('#other-title, #color, .total-calc, #paypal, #bitcoin').hide();

  // inintialize payment option to credit card
  $('#payment option[value="credit card"]').attr('selected', true);
  // disable "Select Payment Method" option from the payment select menu
  $('#payment option[value="select_method"]').prop('disabled', true);

 //=========JOB TITLE=========
  //activate 'Other' text field on selection
  $('#title').change( function() {
    if($(this).val() === 'other') {
      $('#other-title').show().focus();
    } else {
      $('#other-title').hide();
    }
  });

   //=========T-SHIRT SELECTION=========
  // output message for t-shirt selection
  $('#color').after("<span class='select-msg'>**Please select a T-shirt theme**</span>");

   //***FOR EXCEEDS activate color selection after design is selected */
  $('#design').on('change',function() {
    if($('#color').show() != true){
      $('#color').show();
      // disable "Select Theme" option from the t-shirt select menu
      $('#design option:first').prop('disabled', true);
    }

  //Check design selection and adjust color options accordingly
    if($(this).val() === 'js puns') {
      $('#color option:lt(3)').show();
      $('#color option').slice(-3).hide();
      $('.select-msg').hide();
      $('#color').val('cornflowerblue');
    } else if($(this).val() === 'heart js') {
      $('#color option:lt(3), .select-msg').hide();
      $('#color option').slice(-3).show();
      $('#color').val('tomato');
    } 

  });

  //=========ACTIVITIES=========
  //insert total price div
  $('.activities').after('<div class="total-calc"><p></p></div>');

  //setup cost tally for activities
  let cost = 0;
  
  // Add class names to scheduled activities
  $('.activities input').each(function(i) {
    if(i === 0 ){
      $(this).addClass('main');
    } else if(i%2!=0) {
      $(this).addClass('tuesAm');
      if(i===5){
        $(this).removeClass('tuesAm');
        $(this).addClass('wedAm');
      }
    } else {
      $(this).addClass('tuesPm');
      if(i===6){
        $(this).removeClass('tuesPm');
        $(this).addClass('wedPm');
      }
    }
  });

   //  Function for calculating conference price
  function priceCalc(className, price) {
    if($(className).is(':checked')===true) {
      cost += price;
    } else if($(className).is(':checked')===false && cost >0) {
      cost -= price;
    }
    $('.total-calc p').text(`Total Price: $ ${cost}`);
    $('.total-calc').show();
    $('#errorAct').hide();
  }

   //  run calculation for main conference price
  $('.main').on('click', function() {
    priceCalc('.main', 200);
   });

   // Disable activities that are at the same time as tues morning activities
  $('.tuesAm').on('click', function() {
   $(':checkbox').not('.tuesPm, .wedAm, .wedPm').prop('disabled', this.checked);
   $('.main').prop('disabled',false);
   $(this).prop('disabled', false);
  //  run calculation for tues morning activity price
    priceCalc('.tuesAm', 100);
  });

  // Disable activities that are at the same time as tues afternoon activities
  $('.tuesPm').on('click', function() {
    $(':checkbox').not('.tuesAm, .wedAm, .wedPm').prop('disabled', this.checked);
    $('.main').prop('disabled',false);
    $(this).prop('disabled', false);
 
   //  run calculation for tues afternoon activity price
    priceCalc('.tuesPm', 100);
   });

  $('.wedAm').on('click', function() {
 //  run calculation for wed morning activity price
    priceCalc('.wedAm', 100);
  });

   $('.wedPm').on('click', function() {
    //  run calculation for wed afternoon activity price
      priceCalc('.wedPm', 100);
    });

//=========PAYMENT=========
  // When a user chooses a payment option, the chosen payment section is revealed and the other payment sections are hidden.
  $('#payment').on('change',function() {
    if($(this).val() === 'credit card') {
      $('#credit-card').show();
      $('#paypal, #bitcoin, .pay-msg').hide();
      $('#cc-num').focus();
    }else if($(this).val() === 'paypal') {
      $('#paypal').show();
      $('#credit-card, #bitcoin, .pay-msg').hide();
    }else if($(this).val() === 'bitcoin') {
      $('#bitcoin').show();
      $('#credit-card, #paypal, .pay-msg').hide();
    } 
  });
  
  //=========VALIDATION=========
  // create error messages
  $('#name').before('<p class="error" id="errorName">**This field is required**</p>')
  $('#mail').before('<p class="error" id="errorMail">**This field is required**</p>')
  $('.activities legend').after('<p class="error" id="errorAct">**Please choose an activity**</p>')
  $('#cc-num').before('<p class="error" id="errorCcNum">**This field is required**</p>');
  $('#zip').before('<p class="error" id="errorZip">**Required**</p>');
  $('#cvv').before('<p class="error" id="errorCvv">**Required**</p>');

  //hide all error messages
  function hideErrorMsg() {
    $('.error').each(function() {
      $(this).hide();
    })
  };
  hideErrorMsg();

  //***FOR EXCEEDS function to validate on keyup */
  //***FOR EXCEEDS change message depending on the error */
  function checkIfValid(fieldClass, errorId, num, msg1, msg2, regEx) {
    $(fieldClass).on('keyup', function() {
      hideErrorMsg();
      if($(this).val().length < num) {
        $(errorId).text(msg1).fadeIn();
      }else if(!($(this).val()).match(regEx)) {
        $(errorId).text(msg2).show();
      }
    })
  }
  //real-time validation of name field
  checkIfValid('#name', '#errorName', 1, 'Please enter your name', 'Please enter a valid name', /^([a-zA-Z]+)?$/);
  //real-time validation of email field
  checkIfValid('#mail', '#errorMail', 1,'Please enter your email address', 'Please enter a valid email address', /^[^@]+@[^@.]+\.[a-z]+$/i);
  //real-time validation of credit card number field
  checkIfValid('#cc-num', '#errorCcNum',1, 'Please enter your credit card details', 'Please enter a number that is between 13 and 16 digits long', /^(\d{13,16})?$/);
  //real-time validation of zip code field
  checkIfValid('#zip', '#errorZip',1,'Required','Please enter a 5 digit number', /^(\d{5})?$/);
  //real-time validation of cvv field
  checkIfValid('#cvv', '#errorCvv',1,'Required','Please enter a 3 digit number', /^(\d{3})?$/);


  // form validation on submit
  $('form').submit(function(e) {

    // function to check submitted fields
    function checkSubmit(input, num, errorMsg) {
      if($(input).val().length < num) {
        $(input).css({"border-color":"#fd8267"});
        $(errorMsg).show();
        // stops submit
        e.preventDefault();
      }
    }

    // validate name field 
    checkSubmit('#name', 1, '#errorName')
    //validate email field 
    let emailInput = $('#mail').val();
    if(emailInput.length < 1) {
      $('#mail').css({"border-color":"#fd8267"});
      $('#errorMail').show();
      e.preventDefault();
    } else if(!(emailInput).match(/^[^@]+@[^@.]+\.[a-z]+$/i)) {
        $('#errorMail').text('**Please enter a valid email**').show();
        e.preventDefault();
    };
    //validate at least one activity is checked
    if($('.activities input:checked').length > 0) {
      $('#errorAct').hide();
    }else {
      $('#errorAct').show();
      e.preventDefault();
    }
     //validate credit card fields 
    let ccNumInput = $('#cc-num').val();
    if($('#payment').val()==='credit card') {
      if(ccNumInput.length <1) {
        $('#cc-num').css({"border-color":"#fd8267"});
        $('#errorCcNum').text('**This field is required**').show();
        e.preventDefault();
      }else if(ccNumInput.length <13) {
        $('#cc-num').css({"border-color":"#fd8267"});
        $('#errorCcNum').text('**Please enter a valid credit card**').show();
        e.preventDefault();
      }
      checkSubmit('#zip', 5, '#errorZip');
      checkSubmit('#cvv',3,'#errorCvv');
    }
  });

  // reset form error messages on new input
  $('#name, #mail, #cc-num, #zip, #cvv').on('click', function() {
    $(this).css({"border-color":"#679cb3", "color":"#184f68" });
  });

});
