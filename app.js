$(function(){

  //create a state object to hold items list
  var state = {
    items: [
      {name: 'apples', checked: false},
      {name: 'oranges', checked: false},
      {name: 'milk', checked: true},
      {name: 'bread', checked: false}
    ]
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
      if(element.name === item){
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
    //create the list element
    var spanHTML = state.items.map(function(item){
      if(item.checked){
        return '<span class="shopping-item shopping-item__checked">' + item.name + '</span>';
      } else {
        return '<span class="shopping-item">' + item.name + '</span>';
      }

    });
    var listItemHTML = '';
    //insert span into each li element
    for(var i = 0, limit = state.items.length; i < limit; i++){
      listItemHTML += '<li>';
      listItemHTML += spanHTML[i];
      listItemHTML += '<div class="shopping-item-controls">' +
      '<button class="shopping-item-toggle">' +
          '<span class="button-label">check</span>' +
        '</button>' +
        '<button class="shopping-item-delete">' +
          '<span class="button-label">delete</span>' +
        '</button>' +
      '</div></li>';
    }

    //adding list html to element (ul)
    element.html(listItemHTML);

  }

  //add even listener for submit
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();

    addItem(state, $('#shopping-list-entry').val());

    renderList(state, $('.shopping-list'));

    //reset form
    this.reset();

  });

  //event listener for checking off items
  //event delegation needed for new shopping items
  $('.shopping-list').on('click', '.shopping-item-toggle', function(){

    //selecting the sibling of the parent of the this element
    checkItem(state, $(this).parent().siblings().text());

    renderList(state, $('.shopping-list'));
    });

  //event listener for deleting items
  //event delegation needed
  $('.shopping-list').on('click', '.shopping-item-delete', function(){

    //selecting the sibling of the parent of the this element
    removeItem(state, $(this).parent().siblings().text());

    renderList(state, $('.shopping-list'));
  });

}); //END OF MAIN FUNCTION
