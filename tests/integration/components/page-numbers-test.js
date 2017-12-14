import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('page-numbers', 'Integration | Component | page numbers', {
  integration: true
});

test('it renders links for each page except current, plus previous & next', function(assert) {
  this.render(hbs`{{page-numbers totalPages=5 page=2}}`);

  assert.ok(this.$('a:contains("Previous")').length);
  assert.ok(this.$('a:contains("1")').length);

  assert.notOk(this.$('a:contains("2")').length);
  assert.ok(this.$('span:contains("2")').length);

  assert.ok(this.$('a:contains("3")').length);
  assert.ok(this.$('a:contains("4")').length);
  assert.ok(this.$('a:contains("5")').length);
  assert.ok(this.$('a:contains("Next")').length);
});

test('it renders a span for Previous when page=1', function(assert) {
  this.render(hbs`{{page-numbers totalPages=5 page=1}}`);

  assert.notOk(this.$('a:contains("Previous")').length);
  assert.ok(this.$('span:contains("Previous")').length);
});

test('it renders a span for Next when page=totalPages', function(assert) {
  this.render(hbs`{{page-numbers totalPages=5 page=5}}`);

  assert.notOk(this.$('a:contains("Next")').length);
  assert.ok(this.$('span:contains("Next")').length);
});

test('clicking a page number sets page to that number and updates which link is current', function(assert) {
  this.set('page', 3);
  this.render(hbs`{{page-numbers totalPages=5 page=page}}`);

  assert.notOk(this.$('a:contains("3")').length);
  assert.ok(this.$('span:contains("3")').length);

  this.$('a:contains("1")').click();
  assert.equal(this.get('page'), 1);


  assert.ok(this.$('a:contains("3")').length);
  assert.notOk(this.$('a:contains("1")').length);
  assert.ok(this.$('span:contains("1")').length);
});

test('clicking Previous decrements the page number', function(assert) {
  this.set('page', 3);
  this.render(hbs`{{page-numbers totalPages=5 page=page}}`);
  this.$('a:contains("Previous")').click();
  assert.equal(this.get('page'), 2);
});

test('clicking Next increments the page number', function(assert) {
  this.set('page', 3);
  this.render(hbs`{{page-numbers totalPages=5 page=page}}`);
  this.$('a:contains("Next")').click();
  assert.equal(this.get('page'), 4);
});
