# Techdegree Project 3
Treehouse Full-Stack JS TechDegree

This is an interactive form v1. This project is going for an Exceeds Expectations grade.

Github repo: https://github.com/alteredco/tech-degree-project-3.git

Clone the Repo to start:
Git clone https://github.com/alteredco/tech-degree-project-3.git
______________
# Features: 
validating user input and providing helpful error messages when the user enters invalid information into the form fields.

Within this project, the form is "progressively enhanced" with javascript to add customized and conditional behavior and interactivity. 

jQuery has been added and focus set to first text field. 

”Job Role” section includes a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu (feature works when JS is disabled).

For the T-Shirt "Color" menu, color options are only displayed when "Design" is selected and options match the design menu selected.

In the ”Activities” section if the user selects a workshop, conflicting workshops at the same day and time are disabled.As a user selects activities, a running total is displayed below the list of checkboxes.

In the "Payment Info" section the "Credit Card" payment option is selected by default. Payment option in the select menu matches the payment option displayed on the page.

If there are form validation errors, the user is prevented from submitting the form and an error message is displayed:
*Name field can't be blank.
*Email field must be a validly formatted e-mail address.
*User must select at least one checkbox under the "Register for Activities" section of the form.
*If the selected payment option is "Credit Card," user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value.
*Credit Card field only accepts a number between 13 and 16 digits.
*The Zip Code field only accepts a 5-digit number.
*The CVV only accepts a number that is exactly 3 digits long.

**FOR EXCEEDS**
T-shirt colors are hidden until a t-shirt design is chosen.
Error messages are conditional and change depending on if the field is left blank or if the input is the incorrect pattern.
Error messages display in real-time with form validation working during keyup events (as well as on submission).





