$(document).ready( () => {
  $.get('/birds/bird', data => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      if (data[i].notes) {
        var date = data[i].date.slice(0,10)
        $('.bird-list').append(`<div class='bird-list-item' id=${data[i].id}><h3>${data[i].name}</h3><a tabindex="0" class="show-field-notes btn btn-lg btn-info" role="button" data-toggle="popover" data-trigger="focus" title="Field Notes" data-content="${data[i].notes}"><span class="glyphicon glyphicon-leaf" aria-hidden="true"></span></a></div>`)

        $('.location-list').append(`<div class='bird-list-item' id=${data[i].id}><h3>${data[i].area}</h3></div>`)

        $('.date-list').append(`<div class='bird-list-item' id=${data[i].id}><h3>${date}</h3></div>`)

        $('.rating-list').append(`<div class='bird-list-item' id=${data[i].id}><h3>${data[i].rating}</h3></div>`)
      }
      else {
        var date = data[i].date.slice(0,10)
        $('.bird-list').append(`<div class='bird-list-item' id=${data[i].id}><h3>${data[i].name}</h3></div>`)

        $('.location-list').append(`<div class='bird-list-item' id=${data[i].id}><h3>${data[i].area}</h3></div>`)

        $('.date-list').append(`<div class='bird-list-item' id=${data[i].id}><h3>${date}</h3></div>`)

        $('.rating-list').append(`<div class='bird-list-item' id=${data[i].id}><h3>${data[i].rating}</h3></div>`)
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
