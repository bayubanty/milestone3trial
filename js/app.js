$(document).ready(function() {
  // Initialize bookshelf
  loadBookshelf();

  // Handle navigation
  $('.nav-link').click(function(e) {
    e.preventDefault();
    const viewId = $(this).attr('href').substring(1);
    showView(viewId);
  });

  // Back button handler
  $('#backBtn').click(function() {
    showView('search');
  });

  // Show initial view based on URL hash
  const initialView = window.location.hash.substring(1) || 'search';
  showView(initialView);
});

function showView(viewId) {
  // Update active nav link
  $('.nav-link').removeClass('active');
  $(`.nav-link[href="#${viewId}"]`).addClass('active');

  // Hide all views and show the selected one
  $('.view').removeClass('active');
  $(`#${viewId}-view`).addClass('active');

  // Update URL hash
  window.location.hash = viewId;
}

// Global function to show book details
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
