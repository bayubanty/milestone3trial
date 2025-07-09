$(document).ready(function() {
  loadBookshelf();
  $('.nav-link').click(function(e) {
    e.preventDefault();
    const viewId = $(this).attr('href').substring(1);
    showView(viewId);
  });

  $('#backBtn').click(function() {
    showView('search');
  });
  
  const initialView = window.location.hash.substring(1) || 'search';
  showView(initialView);
});

function showView(viewId) {
  $('.nav-link').removeClass('active');
  $(`.nav-link[href="#${viewId}"]`).addClass('active');
  $('.view').removeClass('active');
  $(`#${viewId}-view`).addClass('active');

  window.location.hash = viewId;
}
function showBookDetails(bookId) {
  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
  
  $.getJSON(url, function(data) {
    const info = data.volumeInfo;
    const img = info.imageLinks?.thumbnail || '';
    
    $('#bookDetail').html(`
      <h2>${info.title}</h2>
      <img src="${img}" alt="${info.title}">
      <p><strong>Author(s):</strong> ${info.authors?.join(', ') || 'N/A'}</p>
      <p><strong>Publisher:</strong> ${info.publisher || 'N/A'}</p>
      <p><strong>Published Date:</strong> ${info.publishedDate || 'N/A'}</p>
      <p><strong>Description:</strong></p>
      <p>${info.description || 'No description available.'}</p>
    `);
    
    showView('detail');
  }).fail(function() {
    alert('Error loading book details. Please try again.');
  });
}
