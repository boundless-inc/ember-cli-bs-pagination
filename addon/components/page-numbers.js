import Component from '@ember/component';
import { get, set, computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { A } from '@ember/array';
const { parseInt } = Number;

export default Component.extend({
  tagName: 'nav',
  visiblePageCount: 5,
  processCurrentUrl() {
    let owner = getOwner(this);
    let fastboot = owner.lookup('service:fastboot');
    if(fastboot && get(fastboot, 'isFastBoot')) {
      set(this, 'path', get(fastboot, 'request.path'));
      set(this, 'params', get(fastboot, 'request.queryParams'));
    } else {
      set(this, 'path', window.location.pathname);
      let search = window.location.href.split('?')[1] || '';
      let params = {};
      search.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
          params[decodeURIComponent(key)] = decodeURIComponent(value);
      });
      set(this, 'params', params);
    }
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.processCurrentUrl();
  },
  pageNumber: computed('page', function() {
    return parseInt(this.get('page'), 10);
  }),
  pageCount: computed('totalPages', function() {
    return parseInt(this.get('totalPages'), 10);
  }),
  pageItems: computed('pageCount', 'pageNumber', function() {
    const pages = A();

    for (let i=1; i <= this.get('pageCount'); i++) {
      pages.push({
        number: i,
        current: i === this.get('pageNumber'),
        url: this.uriForPage(this.get('pageNumber')),
      });
    }

    return pages;
  }),
  visiblePageItems: computed('pageItems.[]', 'visiblePageCount', function() {
    let padding = Math.floor(this.get('visiblePageCount') / 2);
    let minPage = Math.max(1, this.get('pageNumber') - padding);
    let maxPage = Math.min(this.get('pageCount') + 1, minPage + this.get('visiblePageCount'));

    if (maxPage - minPage < this.get('pageCount')) {
      minPage = maxPage - this.get('visiblePageCount');
    }

    return this.get('pageItems').slice(minPage - 1, maxPage - 1);
  }),
  previousPageUrl: computed('page', 'canStepBackward', function() {
    if (this.canStepBackward) {
      return this.uriForPage(this.get('pageNumber') - 1);
    } else {
      return '#';
    }
  }),
  nextPageUrl: computed('page', 'canStepForward', function() {
    if (this.canStepForward) {
      return this.uriForPage(this.get('pageNumber') + 1);
    } else {
      return '#';
    }
  }),
  canStepBackward: computed('page', function() {
    return this.get('pageNumber') - 1 >= 1;
  }),
  canStepForward: computed('page', 'totalPages', function() {
    return this.get('pageNumber') + 1 <= this.get('pageCount');
  }),
  actions: {
    setPage(number, event) {
      event.preventDefault();
      this._setPage(number);
    },
    incrementPage(event) {
      event.preventDefault();
      this._setPage(this.get('pageNumber') + 1, event);
    },
    decrementPage(event) {
      event.preventDefault();
      this._setPage(this.get('pageNumber') - 1, event);
    },
  },
  _setPage(number) {
    set(this, 'page', number);
  },
  uriForPage(page) {
    let params = get(this, 'params');

    if (parseInt(page, 10) === 1) {
      delete params['page'];
    } else {
      params['page'] = page;
    }
    return [get(this, 'path'), this.paramsToSearch(params)].filter(s => s).join('?');
  },
  paramsToSearch(params) {
    return Object.keys(params).map(function(key) {
      return [key, params[key]].join('=');
    }).join('&');
  }
});
