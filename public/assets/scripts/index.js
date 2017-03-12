$(document).ready( () => {
  $.get('/birds/bird', data => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      var date = data[i].date.slice(0,10)
      $('.bird-list').append(`<div class='bird-list-item'><h3>${data[i].name}</h3></div>`)
      $('.location-list').append(`<div class='bird-list-item'><h3>${data[i].location}</h3></div>`)
      $('.rating-list').append(`<div class='bird-list-item'><h3>${data[i].rating}</h3></div>`)
      $('.date-list').append(`<div class='bird-list-item'><h3>${date}</h3></div>`)
    }
  })
})
