$(document).ready( () => {
  $.get('/birds/bird', data => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      if (data[i].notes) {
        var date = data[i].date.slice(5,10)
        $('.bird-list').append(
          `<tr class='bird-row' id=${data[i].id}>
          <td class='td-bird-name'><h3>${data[i].name}</h3></td>
          <td class='td-field-notes'><a tabindex="0" class="show-field-notes btn btn-lg btn-info" role="button" data-toggle="popover" data-trigger="focus" title="Field Notes" data-content="${data[i].notes}"><span class="glyphicon glyphicon-leaf" aria-hidden="true"></span></a></td>
          <td><h3>${data[i].area}</h3></td>
          <td class='td-rating'><h3>${data[i].rating}</h3></td>
          <td class='date-options'><h3>${date}</h3><button type="button" class="delete-btn"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
          <a href="edit.html?id=${data[i].id}"><button type="button" class="edit-btn"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td>
          </tr>`)
      }
      else {
        var date = data[i].date.slice(5,10)
        $('.bird-list').append(
          `<tr class='bird-row' id=${data[i].id}>
          <td><h3>${data[i].name}</h3></td>
          <td></td>
          <td><h3>${data[i].area}</h3></td>
          <td><h3>${data[i].rating}</h3></td>
          <td class='date-options'><h3>${date}</h3><button type="button" class="delete-btn"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
          <a href="edit.html?id=${data[i].id}"><button type="button" class="edit-btn"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></a></td>
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
