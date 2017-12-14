import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import URI from 'uri';
const { parseInt } = Number;

export default Component.extend({
  pageItems: computed('totalPages', 'page', function() {
    const pages = [];
    const page = parseInt(get(this, 'page'));
    for(let i=1; i <= get(this, 'totalPages'); i++) {
      let pageItem = {
        number: i,
        current: i === page,
        url: this.uriForPage(page),
      };
      pages.push(pageItem);
    }
    return pages;
  }),
  previousPageUrl: computed('page', 'canStepBackward', function() {
    const page = parseInt(get(this, 'page'));

    if(get(this, 'canStepBackward')) {
      return this.uriForPage(page - 1);
    } else {
      return '#';
    }
  }),
  nextPageUrl: computed('page', 'canStepForward', function() {
    const page = parseInt(get(this, 'page'));

    if(get(this, 'canStepForward')) {
      return this.uriForPage(page + 1);
    } else {
      return '#';
    }
  }),
  canStepBackward: computed('page', function() {
    const page = parseInt(get(this, 'page'));

    return page - 1 >= 1;
  }),
  canStepForward: computed('page', 'totalPages', function() {
    const page = parseInt(get(this, 'page'));
    const totalPages = parseInt(get(this, 'totalPages'));

    return page + 1 <= totalPages;
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    set(this, 'uri', URI(window.location.href));
  },
  actions: {
    setPage(number, event) {
      event.preventDefault();
      this._setPage(number);
    },
    incrementPage(event) {
      event.preventDefault();
      let page = parseInt(get(this, 'page'));
      this._setPage(page + 1, event);
    },
    decrementPage(event) {
      event.preventDefault();
      let page = parseInt(get(this, 'page'));
      this._setPage(page - 1, event);
    },
  },
  _setPage(number) {
    set(this, 'page', number);
  },
  uriForPage(page) {
    const uri = get(this, 'uri');
    if(parseInt(page) === 1) {
      uri.removeSearch('page');
    } else {
      uri.setSearch('page', page);
    }
    return uri.toString();
  },
});
