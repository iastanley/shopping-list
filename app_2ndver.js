//2nd version of javascript to figure out Thinkful solution

//state object with initial values from DOM
var state = {
  items: [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ]
};

//list item template
var listItemTemplate = (
  '<li>' +
    '<span class="shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);

//STATE MANAGEMENT

//add an item to the list
function addItem(state, item){
  state.items.push({
    name: item,
    checked: false
  });
}

//retrieve an item object by index number
function getItem(state, itemIndex){
  return state.items[itemIndex];
}

//delete item in array by item itemIndex
function deleteItem(state, itemIndex){
  state.items.splic(itemIndex, 1);
}

//update items
function updateItem(state, itemIndex, newItemState){
  state.items[itemIndex] = newItemState;
}

//DOM MANIPULATION

//render a single list item
function renderItem(item, itemId, itemTemplate, itemDataAttr){
  //create an jQuery element based on template
  //this is done so we can easily manipulate template
  var element = $(itemTemplate);

  //set the text of the shopping item span to item.name
  element.find('.shopping-item').val(item.name);

  //add proper class if checked is true
  //how does this account for toggling behavior?
  if(checked){
    element.find('.shopping-item').addClass('shoppshopping-item__checked');
  }

  //what is this?!
  element.find('.shopping-item-toggle')
  element.attr(itemDataAttr, itemId);

  return element;

}

function renderList(state, listElement, itemDataAttr){
  //create an array of jQuery list elements
  var itemsHTML = state.items.map(function(item, index){
    return renderItem(item, index, listItemTemplate, itemDataAttr);
  });

  //add html to the target list element
  listElement.html(itemsHTML);
}

//EVENT LISTENERS
