$(document).ready( () => {
  $.get('/birds/bird', data => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      if (data[i].notes) {
        var date = data[i].date.slice(0,10)
        $('.bird-list').append(`<div class='bird-list-item' id=${data[i].id}><a class='link-bird-notes'><h3>${data[i].name}</h3></a><p class='bird-notes'>${data[i].notes}</p></div>`)
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

$(document).on('click','.btn-save-bird', function () {

  var newBird = {
    name: $('new-bird-name').val(),
    location: $('new-bird-location').val(),
    rating: $('new-bird-rating').val(),
    notes: $('new-bird-notes').val()
  }

  // CHECK FOR BLANK ENTRIES AND PREVENT SUBMIT IF ANY BESIDES NOTES
  if ($.trim($('#new-bird-name').val()) === "" || $.trim($('#new-bird-location').val()) === "" || $.trim($('#new-bird-rating').val()) === "") {
    event.preventDefault()
    console.log('All fields are required except notes.')
    return false
  }
  else {
    event.preventDefault()
    $.post('/birds/bird', newBird, (result) => {
      console.log(result)
    })
  }
})
