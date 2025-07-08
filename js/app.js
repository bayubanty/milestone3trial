$(document).ready(function() {
  // Initialize views based on URL hash
  const initialView = window.location.hash.substring(1) || 'search';
  showView(initialView);

  // Handle navigation clicks
  $(document).on('click', '.nav-link', function(e) {
    e.preventDefault();
    const viewId = $(this).attr('href').substring(1);
    showView(viewId);
  });

  // Back button functionality
  $('#backBtn').click(function(e) {
    e.preventDefault();
    const prevView = $('#detail-view').data('prev-view') || 'search';
    showView(prevView);
  });
});

function showView(viewId) {
  // Store previous view when showing details
  if (viewId === 'detail') {
    const currentView = $('.view.active').attr('id').replace('-view', '');
    $('#detail-view').data('prev-view', currentView);
  }

  // Update active nav link
  $('.nav-link').removeClass('active');
  $(`.nav-link[href="#${viewId}"]`).addClass('active');

  // Hide all views and show the selected one
  $('.view').removeClass('active');
  $(`#${viewId}-view`).addClass('active');

  // Update URL hash
  window.location.hash = viewId;

  // Special handling for bookshelf view
  if (viewId === 'bookshelf') {
    loadBookshelf();
  }
}
