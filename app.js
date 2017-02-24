//create a state object to hold items list
var state = {
  items: []
};

//function to add items to the list
function addItem(state, item){
  state.items.push({
    name: item,
    checked: false
  });
}

//function for checking item
//where item should be string for item name
function checkItem(state, item){
  //loop through items in items list
  state.items.forEach(function(element){
    if (element.name === item) {
      element.checked = !element.checked;
    }
  });
}

//function to remove items from list
function removeItem(state, item){
  //filter items array to remove item === to item
  state.items = state.items.filter(function(element){
    return element.name !== item;
  })
}

//function to render list to DOM
function renderList(state, element){
  var listItemHTML = '';
  //insert span into each li element
  for (var i = 0; i < state.items.length; i++) {
    listItemHTML += '<li>';
    if (state.items[i].checked) {
      listItemHTML += '<span class="shopping-item shopping-item__checked">' + state.items[i].name + '</span>';
    } else {
      listItemHTML += '<span class="shopping-item">' + state.items[i].name + '</span>';
    }
    listItemHTML += '<div class="shopping-item-controls">' +
    '<button class="shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button> ' +
      '<button class="shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div></li>';
  }
  //adding list html to element (ul)
  element.html(listItemHTML);
}

//event listener function for submit
function addNewItemHandler(state, formElement, newInput, listElement){
  formElement.submit(function(event){
    event.preventDefault();
    addItem(state, newInput.val());
    renderList(state, listElement);
    //reset form
    this.reset();
  })
}

//event listener for checked button
function checkedHandler(state, listElement, toggleSelector){
  listElement.on('click', toggleSelector, function(){
    //sibling of parent of $(this) is span with item name
    checkItem(state, $(this).parent().siblings().text());
    renderList(state, listElement);
  });
}

//event listener for delete button
function deleteHandler(state, listElement, deleteSelector){
  listElement.on('click', deleteSelector, function(){
    removeItem(state, $(this).parent().siblings().text());
    renderList(state, listElement);
  });
}

//MAIN FUNCTON
$(function(){
var formElement = $('#js-shopping-list-form');
var newInput = $('#shopping-list-entry');
var listElement = $('.shopping-list');

//to be used in on() method so need to be strings
var toggleSelector = '.shopping-item-toggle';
var deleteSelector = '.shopping-item-delete';

addNewItemHandler(state, formElement, newInput, listElement);

checkedHandler(state, listElement, toggleSelector);

deleteHandler(state, listElement, deleteSelector);

}); //END OF MAIN FUNCTION
