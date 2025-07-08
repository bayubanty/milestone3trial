$(document).ready(function() {
  // Initialize view based on URL hash
  function initializeView() {
    const hash = window.location.hash.substring(1) || 'search';
    showView(hash);
  }

  // Show specific view
  function showView(viewId) {
    // Hide all views
    $('.view').removeClass('active');
    
    // Show selected view
    $(`#${viewId}-view`).addClass('active');
    
    // Update active nav link
    $('.nav-link').removeClass('active');
    $(`.nav-link[href="#${viewId}"]`).addClass('active');
    
    // Load bookshelf if needed
    if (viewId === 'bookshelf') {
      loadBookshelf();
    }
  }

  // Handle navigation clicks
  $(document).on('click', '.nav-link', function(e) {
    e.preventDefault();
    const viewId = $(this).attr('href').substring(1);
    showView(viewId);
    window.location.hash = viewId;
  });

  // Back button functionality
  $('#backBtn').click(function(e) {
    e.preventDefault();
    const prevView = $('#detail-view').data('prev-view') || 'search';
    showView(prevView);
    window.location.hash = prevView;
  });

  // Global function to show book details
  window.showBookDetails = function(bookId, fromView) {
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
      
      // Store previous view
      $('#detail-view').data('prev-view', fromView);
      showView('detail');
    }).fail(function() {
      alert('Error loading book details. Please try again.');
    });
  };

  // Initialize the app
  initializeView();
});
