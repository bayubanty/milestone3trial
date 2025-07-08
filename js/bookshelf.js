$(document).ready(function() {
  // Load bookshelf function
  function loadBookshelf() {
    // Replace these with actual user ID and shelf ID if available
    const userId = 'INSERT_USER_ID';
    const shelfId = 'INSERT_SHELF_ID';
    
    if (!userId || !shelfId) {
      $('#bookshelf').html('<p>Bookshelf not configured. Missing user ID or shelf ID.</p>');
      return;
    }

    const url = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelfId}/volumes`;
    
    $.getJSON(url, function(data) {
      const books = data.items || [];
      renderBookshelf(books);
    }).fail(function() {
      $('#bookshelf').html('<p>Error loading bookshelf. Please try again later.</p>');
    });
  }

  // Render bookshelf
  function renderBookshelf(books) {
    $('#bookshelf').empty();
    
    if (books.length === 0) {
      $('#bookshelf').html('<p>No books found in this bookshelf.</p>');
      return;
    }

    books.forEach(book => {
      const info = book.volumeInfo;
      const img = info.imageLinks?.thumbnail || '';
      const title = info.title || 'Untitled';
      const id = book.id;
      
      $('#bookshelf').append(`
        <div class="book-card" data-id="${id}">
          <img src="${img}" alt="${title}">
          <h3>${title}</h3>
        </div>
      `);
    });

    // Add click handlers to bookshelf cards
    $('.book-card').off('click').on('click', function() {
      const bookId = $(this).data('id');
      showBookDetails(bookId, 'bookshelf');
    });
  }

  // Expose load function to app.js
  window.loadBookshelf = loadBookshelf;
});
