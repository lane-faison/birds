// ************* TABLETOP API ************* //

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/11P2s6a4twgwOrIY8VWOC2d4PEUtq6pYyRYxUzxmn2Y0/pubhtml'

function init() {
  Tabletop.init( {
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  } )
}

function showInfo(data, tabletop) {
  alert('The library is ready to use!')
  for (var i = 0; i < data.length; i++) {
    var firstLetter = data[i].COMMON_NAME[0]

    $(`#${firstLetter} .bird-info-div`).append(`<div class='bird-index'><h4>${data[i].COMMON_NAME}</h4><h4>${data[i].TAXON_ID}</h4></div>`)
  }
  $(document).on('click','.letter-header', (event) => {
    $(this).hide()
  })
}



// ************* FRONT-SIDE JAVASCRIPT ************* //


window.addEventListener('DOMContentLoaded', init)
