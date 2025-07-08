let allBooks = [];
let perPage = 10;
let currentPage = 1;

$(document).ready(function () {
  $.getJSON("assets/google-books-placeholder.json", function (data) {
    allBooks = data.items.map(item => ({
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      publisher: item.volumeInfo.publisher,
      publishedDate: item.volumeInfo.publishedDate,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      description: item.volumeInfo.description
    }));
    displayBooks();
  });

  $('#searchBtn').click(function () {
    const query = $('#searchInput').val().toLowerCase();
    currentPage = 1;
    $.getJSON("assets/google-books-placeholder.json", function (data) {
      allBooks = data.items
        .filter(item => item.volumeInfo.title.toLowerCase().includes(query))
        .map(item => ({
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          publisher: item.volumeInfo.publisher,
          publishedDate: item.volumeInfo.publishedDate,
          thumbnail: item.volumeInfo.imageLinks?.thumbnail,
          description: item.volumeInfo.description
        }));
      displayBooks();
    });
  });
});

function displayBooks() {
  const start = (currentPage - 1) * perPage;
  const pageBooks = allBooks.slice(start, start + perPage);

  $('#bookResults').html('');
  pageBooks.forEach((book, index) => {
    $('#bookResults').append(`
      <div class="book" onclick="showDetails(${start + index})">
        <img src="${book.thumbnail}" alt="cover" />
        <p>${book.title}</p>
      </div>
    `);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(allBooks.length / perPage);
  $('#pagination').html('');
  for (let i = 1; i <= totalPages; i++) {
    $('#pagination').append(
      `<span class="page-link ${i === currentPage ? 'active' : ''}" onclick="gotoPage(${i})">${i}</span>`
    );
  }
}

function gotoPage(page) {
  currentPage = page;
  displayBooks();
}

function showDetails(index) {
  const book = allBooks[index];
  $('#bookDetails').html(`
    <h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.authors?.join(', ')}</p>
    <p><strong>Publisher:</strong> ${book.publisher}</p>
    <p><strong>Published:</strong> ${book.publishedDate}</p>
    <p>${book.description}</p>
  `);
}
