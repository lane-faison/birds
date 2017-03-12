$(document).on('click','.btn-save-bird', function () {

  var newBird = {
    name: $('#new-bird-name').val(),
    location: $('#new-bird-location').val(),
    rating: $('#new-bird-rating').val(),
    notes: $('#new-bird-notes').val()
  }
  console.log(newBird)
  // CHECK FOR BLANK ENTRIES AND PREVENT SUBMIT IF ANY BESIDES NOTES
  if ($.trim($('#new-bird-name').val()) === "" || $.trim($('#new-bird-location').val()) === "" || $.trim($('#new-bird-rating').val()) === "") {
    event.preventDefault()
    alert('All fields are required except notes.')
    return false
  }
  else {
    event.preventDefault()
    $.post('/birds/bird', newBird, (result) => {
      console.log(result)
    })
  }
})
