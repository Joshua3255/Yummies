import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  // _errorMessage = 'No recipes found for you query! Please try again';
  // _message = '';

  addHandlerRender(handler) {
    // window.addEventListener('hashchange', showRecipe);
    // window.addEventListener('load', showRecipe);

    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      // console.log('data-goto', btn.getAttribute('data-goto'), goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev');
    }

    // Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('prev') + this._generateMarkupButton('next')
      );
    }

    // Page 1, and there are no other pages
    return '';
  }

  _generateMarkupButton(type) {
    const targetPage =
      type === 'next' ? this._data.page + 1 : this._data.page - 1;

    return `<button data-goto="${targetPage}" class="btn--inline pagination__btn--${type}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      type === 'prev' ? 'left' : 'right'
    }"></use>
            </svg>
            <span>Page ${targetPage}</span>
          </button>`;
  }
}

export default new PaginationView();
