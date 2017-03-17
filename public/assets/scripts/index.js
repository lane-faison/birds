var totalRows

$(document).ready( () => {
  $.get('/birds/bird', data => {

    totalRows = data.length

    console.log(data)

    for (var i = 0; i < data.length; i++) {

      if (data[i].notes) {
        var date = data[i].date.slice(5,10)
        var birdID = parseInt(data[i].id)
        console.log(birdID);
        $('.bird-list').append(
          `<tr class='bird-row' id=${birdID} value=${data[i].order}>
          <td><div class='order-btns'>
          <button class='btn btn-default btn-up'><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></button>
          <button class='btn btn-default btn-down'><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></button></div></td>
          <td class='td-order'><h3>${data[i].order}</h3></td>
          <td class='td-bird-name'><h3>${data[i].name}</h3></td>
          <td class='td-field-notes'><a tabindex="0" class="show-field-notes btn btn-lg btn-info" role="button" data-toggle="popover" data-trigger="focus" title="Field Notes" data-content="${data[i].notes}"><span class="glyphicon glyphicon-leaf" aria-hidden="true"></span></a></td>
          <td class='td-bird-location'><h3>${data[i].area}</h3></td>
          <td class='td-rating'><h3>${data[i].rating}</h3></td>
          <td class='date-options'><h3>${date}</h3><button type="button" class="delete-btn"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
          <a href="edit.html?id=${birdID} value=${data[i].order}"><button type="button" class="edit-btn"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td>
          </tr>`)
      }
      else {
        var date = data[i].date.slice(5,10)
        $('.bird-list').append(
          `<tr class='bird-row' id=${birdID} value=${data[i].order}>
          <td><div class='order-btns'>
          <button class='btn btn-default btn-up'><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></button>
          <button class='btn btn-default btn-down'><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></button></div></td>
          <td class='td-order'><h3>${data[i].order}</h3></td>
          <td><h3>${data[i].name}</h3></td>
          <td></td>
          <td><h3>${data[i].area}</h3></td>
          <td><h3>${data[i].rating}</h3></td>
          <td class='date-options'><h3>${date}</h3><button type="button" class="delete-btn"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
          <a href="edit.html?id=${birdID} value=${data[i].order}"><button type="button" class="edit-btn"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td>
          </tr>`)
      }
    }
  })
})

$(document).on('mouseover','.link-bird-notes', function() {
  $(this).siblings('.bird-notes').show()
  $(this).closest('div').addClass('notes-frame')
})

$(document).on('mouseleave','.link-bird-notes', function() {
  $(this).siblings('.bird-notes').hide()
  $(this).closest('div').removeClass('notes-frame')
})

$(document).on('click','.show-field-notes', function () {
  $(this).popover('show')
})

$(document).on('click','.delete-btn', function () {
  var birdID = $(this).closest('tr').attr('id')
  var confirmation = confirm('Are you sure you want to delete this bird from your checklist?')
  if (confirmation === true) {
    $.ajax({
      url: `/birds/bird/${birdID}`,
      type: 'DELETE',
      success: function (result) {
        $(`#${birdID}`).remove()
        console.log('BIRD DELETED')
      },
      error: function (result) {
        console.log('Something went wrong when trying to delete this bird.')
      }
    })
  }
})




$(document).on('click','.btn-up', function () {
  var clickedID = $(this).closest('tr').attr('id')
  var previousID = $(this).closest('tr').prev().attr('id')
  var valueOfClicked = parseInt($(this).closest('tr').attr('value'))
  console.log(clickedID)
  console.log(previousID)

  if (valueOfClicked > 1) {

    var newClickedNum = parseInt($(this).closest('tr').attr('value')) - 1
    var newPreviousNum = parseInt($(this).closest('tr').prev().attr('value')) + 1

    var updateOrderClicked = {
      order: newClickedNum
    }
    console.log(updateOrderClicked)

    var updateOrderPrevious = {
      order: newPreviousNum
    }
    console.log(updateOrderPrevious)

    $.ajax({
      url: `/birds/bird/${clickedID}`,
      type: 'PUT',
      data: updateOrderClicked,
      success: function (result) {
          console.log("Bird order was successfully updated.")
        },
        error: function (result) {
          console.log("Something isn't working")
        }
    }).then(function (result) {
      $.ajax({
        url: `/birds/bird/${previousID}`,
        type: 'PUT',
        data: updateOrderPrevious,
        success: function (result) {
            console.log("Previous bird order was successfully updated.")
          },
          error: function (result) {
            console.log("Something isn't working")
          }
      })
    }).then(function () {
      location.reload();
    })
  }
})

$(document).on('click','.btn-down', function () {

  var clickedID = $(this).closest('tr').attr('id')
  var nextID = $(this).closest('tr').next().attr('id')
  var valueOfClicked = parseInt($(this).closest('tr').attr('value'))
  console.log(clickedID)
  console.log(nextID)

  // TODO: need to change this
  if (valueOfClicked < totalRows) {
    console.log('totalRows: ' + totalRows)

    var newClickedNum = parseInt($(this).closest('tr').attr('value')) + 1
    var newNextNum = parseInt($(this).closest('tr').next().attr('value')) - 1

    var updateOrderClicked = {
      order: newClickedNum
    }
    console.log(updateOrderClicked)

    var updateOrderNext = {
      order: newNextNum
    }
    console.log(updateOrderNext)

    $.ajax({
      url: `/birds/bird/${clickedID}`,
      type: 'PUT',
      data: updateOrderClicked,
      success: function (result) {
          console.log("Bird order was successfully updated.")
        },
        error: function (result) {
          console.log("Something isn't working")
        }
    }).then(function (result) {
      $.ajax({
        url: `/birds/bird/${nextID}`,
        type: 'PUT',
        data: updateOrderNext,
        success: function (result) {
            console.log("Previous bird order was successfully updated.")
          },
          error: function (result) {
            console.log("Something isn't working")
          }
      })
    }).then(function () {
      location.reload();
    })
  }
})






// console.log('trying');
// console.log();
// $(`#${clickedID}`).insertBefore($(`#${previousID}`))
// // $('#previousID').insertAfter('#clickedID')
// // TODO: do insertBefore insertAfter here instead of reloading the whole page
// // Below reload works if above doesn't
