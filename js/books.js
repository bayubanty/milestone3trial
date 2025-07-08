$(document).ready(function() {
  const resultsPerPage = 10;
  let currentQuery = '';
  let currentPage = 1;
  let totalPages = 1;

  $('#searchBtn').click(function() {
    const query = $('#searchTerm').val().trim();
    if (query) {
      currentQuery = query;
      currentPage = 1;
      searchBooks(currentQuery, currentPage);
    }
  });

  // Handle Enter key in search
  $('#searchTerm').keypress(function(e) {
    if (e.which === 13) {
      $('#searchBtn').click();
    }
  });

  // Pagination click handler
  $(document).on('click', '.page-btn', function() {
    currentPage = parseInt($(this).data('page'));
    searchBooks(currentQuery, currentPage);
  });

  function searchBooks(query, page) {
    const startIndex = (page - 1) * resultsPerPage;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${resultsPerPage}`;
    
    $.getJSON(url, function(data) {
      const books = data.items || [];
      totalPages = Math.min(5, Math.ceil((data.totalItems || 0) / resultsPerPage));
      
      renderResults(books);
      renderPagination();
    }).fail(function() {
      $('#results').html('<p>Error searching books. Please try again.</p>');
      $('#pagination').empty();
    });
  }

  function renderResults(books) {
    $('#results').empty();
    
    if (books.length === 0) {
      $('#results').html('<p>No books found. Try a different search term.</p>');
      return;
    }

    books.forEach(book => {
      const info = book.volumeInfo;
      const img = info.imageLinks?.thumbnail || '';
      const title = info.title || 'Untitled';
      const id = book.id;
      
      $('#results').append(`
        <div class="book-card" data-id="${id}">
          <img src="${img}" alt="${title}">
          <h3>${title}</h3>
        </div>
      `);
    });

    // Add click handlers to book cards
    $('.book-card').click(function() {
      const bookId = $(this).data('id');
      showBookDetails(bookId);
    });
  }

  function renderPagination() {
    $('#pagination').empty();
    
    if (totalPages <= 1) return;
    
    for (let i = 1; i <= totalPages; i++) {
      $('#pagination').append(`
        <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
          ${i}
        </button>
      `);
    }
  }
});
