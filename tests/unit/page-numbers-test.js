import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('page-numbers', 'Unit | Component | page numbers', {
  unit: true,
});

test('uriForPage adds page number correctly', function(assert) {
  let component = this.subject();
  component.set('path', '/mojis/1');
  component.set('params', {foo: 'bar'});
  assert.equal(component.uriForPage(2), '/mojis/1?foo=bar&page=2');
});

test('handles no query params', function(assert) {
  let component = this.subject();
  component.set('path', '/mojis/1');
  component.set('params', {});
  assert.equal(component.uriForPage(2), '/mojis/1?page=2');
});

test('skips page 1', function(assert) {
  let component = this.subject();
  component.set('path', '/mojis/1');
  component.set('params', {});
  assert.equal(component.uriForPage(1), '/mojis/1');
  component.set('path', '/mojis/1');
  component.set('params', {a: 'b'});
  assert.equal(component.uriForPage(1), '/mojis/1?a=b');
});
