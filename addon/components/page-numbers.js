import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
const { parseInt } = Number;

export default Component.extend({
  tagName: 'nav',
  didReceiveAttrs() {
    this._super(...arguments);
    set(this, 'uri', window.location.href);
  },
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
    let uri = get(this, 'uri').split('?');
    let search = uri[1] || '';
    let params = {};
    search.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    if(parseInt(page) === 1) {
      delete params['page'];
    } else {
      params['page'] = page;
    }
    return [uri[0], this.paramsToSearch(params)].filter(s => s).join('?');
  },
  paramsToSearch(params) {
    return Object.keys(params).map(function(key) {
      return [key, params[key]].join('=');
    }).join('&');
  }
});
