$(document).ready(function () {
  var BirdID = getUrlParameter('id')
  $.get(`birds/bird/${BirdID}`, function (data) {
    console.log(data)
    $('#edit-bird-name').val(`${data.name}`)
    $('#edit-bird-location').val(`${data.area}`)
    $('#edit-bird-rating').val(`${data.rating}`)
    $('#edit-bird-notes').val(`${data.notes}`)
  })
})

$(document).on('click','.btn-save-bird', function () {
  var BirdID = getUrlParameter('id')
  var updatedBird = {
    name: $('#edit-bird-name').val(),
    rating: $('#edit-bird-rating').val(),
    notes: $('#edit-bird-notes').val()
  }
  console.log(updatedBird)
  // CHECK FOR BLANK ENTRIES AND PREVENT SUBMIT IF ANY BESIDES NOTES
  if ($.trim($('#edit-bird-name').val()) === "" || $.trim($('#edit-bird-rating').val()) === "") {
    event.preventDefault()
    alert('Please complete all required fields.')
    return false
  }
  else {
    event.preventDefault()
    $.ajax({
      url: `birds/bird/${BirdID}`,
      type: 'PUT',
      data: updatedBird,
      success: function (result) {
        console.log('bird updated');
        window.location.href = "index.html"
      },
      error: function (result) {
        res.status(404)
      }
    })
  }
})



function getUrlParameter(sParam) {
  const sPageURL = decodeURIComponent(window.location.search.substring(1))
  const sURLVariables = sPageURL.split('&')
  let returner

  sURLVariables.forEach((paraName) => {
    const sParameterName = paraName.split('=')
    if (sParameterName[0] === sParam) {
      returner = sParameterName[1] === undefined ? true : sParameterName[1]
    }
  })
  return returner
}
