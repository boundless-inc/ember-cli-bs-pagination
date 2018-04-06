import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('page-numbers', 'Unit | Component | page numbers', {
  unit: true,
});

test('uriForPage adds page number correctly', function(assert) {
  let component = this.subject();
  component.set('uri', 'https://www.mymoji.co/mojis/1?foo=bar');
  assert.equal(component.uriForPage(2), 'https://www.mymoji.co/mojis/1?foo=bar&page=2');
});

test('handles no query params', function(assert) {
  let component = this.subject();
  component.set('uri', 'https://www.mymoji.co/mojis/1');
  assert.equal(component.uriForPage(2), 'https://www.mymoji.co/mojis/1?page=2');
});

test('skips page 1', function(assert) {
  let component = this.subject();
  component.set('uri', 'https://www.mymoji.co/mojis/1');
  assert.equal(component.uriForPage(1), 'https://www.mymoji.co/mojis/1');
  component.set('uri', 'https://www.mymoji.co/mojis/1?a=b');
  assert.equal(component.uriForPage(1), 'https://www.mymoji.co/mojis/1?a=b');
});
