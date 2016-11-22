var contactList = [];
var listIndex;

$('li.active a').on('click', function(e){
  e.preventDefault();
  //debugger;
  var activePage = e.target.innerHTML;
  console.log(activePage);

  if (activePage == "Home"){
    displayContactList();
  }
  else if (activePage == "Edit Contact"){
    displayContactList("edit");
  }
  else if (activePage == "Delete Contact"){
    displayContactList("delete");
  }
});

//displayContactList();
/*
$('#home').on('click', function(e){
  e.preventDefault();
  //debugger;
  displayContactList();
});

$('#edit').on('click', function(e){
  e.preventDefault();
  displayEditContactList();
})
*/
$('#btnAdd').on('click', function(e){
  addContact();
});
//add a new contact to contactList
function addContact(){
  var contact = {
    firstname: $('#fname').val(),
    lastname: $('#lname').val(),
    phone: $('#phone').val(),
    email: $('#email').val()
  }
  console.log(contact);
  //get contacts from localStorage
  var contactString = window.localStorage.getItem('contacts');
  contactList = JSON.parse(contactString);
  //add new contact
  contactList.push(contact);

  //save back in localStorage
  contactString = JSON.stringify(contactList);
  window.localStorage.setItem('contacts', contactString);
  //display contactList
  displayContactList();
}

//display contactList in table
function displayContactList(buttonType){
  //clear table display
  $('#contactsTable').html('');
  //get contacts from localStorage
  var contactString = window.localStorage.getItem('contacts');
  //parse string to array object
  contactList = JSON.parse(contactString);
  //display in table
  var holder = '';
  holder += '<tr>'
  holder += '<th>Lastname</th><th>Firstname</th><th>Phone</th><th>Email</th>'
  holder += '</tr>'
  for (var i = 0; i < contactList.length; i++) {
    holder += '<tr>'
    holder += '<td>'+ contactList[i].lastname + '</td>'
    holder += '<td>'+ contactList[i].firstname + '</td>'
    holder += '<td>'+ contactList[i].phone + '</td>'
    holder += '<td>'+ contactList[i].email + '</td>'
    if (buttonType == 'edit'){
      holder += '<td><button id="editContact" type="button" class="btn btn-primary">Edit</button></td>'
    }
    else if (buttonType == 'delete'){
      holder += '<td><button id="deleteContact" type="button" class="btn btn-danger">Delete</button></td>'
    }
    holder += '</tr>'
  }
  $('#contactsTable').append(holder);
}
<!-- Edit Contact -->

//select contact to edit or delete
$('#contactsTable').on('click', function(e){
  //debugger;
  if (e.target.type == "button"){
    var selectedLastname = e.target.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
    var selectedFirstname = e.target.parentElement.previousSibling.previousSibling.previousSibling.innerHTML;
    var selectedPhone =  e.target.parentElement.previousSibling.previousSibling.innerHTML;
    var selectedEmail = e.target.parentElement.previousSibling.innerHTML;

    //locate for the selected contact for edit in localStorage (contactList array)
    for (var i = 0; i < contactList.length; i++) {
      if (contactList[i].lastname == selectedLastname && contactList[i].firstname == selectedFirstname){
        console.log('i: ' + i);
        listIndex = i;
      }
    }
    if (e.target.id == "editContact") {
      //populate text fields
      $('#lname').val(selectedLastname);
      $('#fname').val(selectedFirstname);
      $('#phone').val(selectedPhone);
      $('#email').val(selectedEmail);

      $('#modalContainerEdit').modal('show');
    }
    else if (e.target.id == "deleteContact") {
      $('#selectedContact').html(selectedLastname + ', ' + selectedFirstname);
      $('#modalContainerDelete').modal('show');
    }
  }
});

$('#editDialog').on('click', function(){
  //update contact
  //debugger;
  updateContact($('#lname').val(), $('#fname').val(), $('#phone').val(), $('#email').val(), listIndex );
  displayContactList('edit');
  $('#modalContainerEdit').modal('hide');
});

$('#cancelEditDialog').on('click', function(){
  $('#modalContainerEdit').modal('hide');
});

function updateContact(lname, fname, phone, email, index){
  //ToDo: check input validation

  contactList[index].lastname = lname;
  contactList[index].firstname = fname;
  contactList[index].phone = phone;
  contactList[index].email = email;

  //store in localStorage
  var contactString = JSON.stringify(contactList);
  window.localStorage.setItem('contacts', contactString);
}

<!-- Delete Contact -->
//deleteDialog
$('#deleteDialog').on('click', function(){
  contactList.splice(listIndex, 1);
  //store in localStorage
  var contactString = JSON.stringify(contactList);
  window.localStorage.setItem('contacts', contactString);

  displayContactList("delete");
  $('#modalContainerDelete').modal('hide');
});

//cancelDeleteDialog
$('#cancelDeleteDialog').on('click', function(){
  $('#modalContainerDelete').modal('hide');
})
