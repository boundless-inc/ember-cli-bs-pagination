import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('page-numbers', 'Integration | Component | page numbers', {
  integration: true
});

test('it renders links for each page except current, plus previous & next', function(assert) {
  this.render(hbs`{{page-numbers totalPages=5 page=2}}`);

  // Prev + 5 pages + Next = 7 page item links
  assert.equal(7, this.$('.page-item').length);

  assert.ok(this.$('a:contains("Previous")').length);
  assert.ok(this.$('a:contains("1")').length);
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

test('passing a custom setPage action', function(assert) {
  assert.expect(1);
  this.set('customSetPage', function(page) {
    assert.equal(page, 4);
  });
  this.render(hbs`{{page-numbers totalPages=5 page=3 _setPage=(action customSetPage)}}`);
  this.$('a:contains("Next")').click();
});

test('supports adding classes to the ul.pagination node via additionalClasses argument', function(assert) {
  this.render(hbs`{{page-numbers totalPages=5 page=2 additionalClasses='foo'}}`);
  const paginationNode = this.$('ul.pagination.foo');
  assert.ok(paginationNode.length);
});

test('it renders links for pages around current page at the beginning', function(assert) {
  this.render(hbs`{{page-numbers totalPages=20 page=1}}`);

  // Prev + 5 visible pages + Next = 7 page item links
  assert.equal(this.$('.page-item').length, 7);

  assert.ok(this.$('span:contains("Previous")').length);
  assert.ok(this.$('span:contains("1")').length);
  assert.ok(this.$('a:contains("2")').length);
  assert.ok(this.$('a:contains("3")').length);
  assert.ok(this.$('a:contains("4")').length);
  assert.ok(this.$('a:contains("5")').length);
  assert.ok(this.$('a:contains("Next")').length);
});

test('it renders links for pages around current page nearly at the beginning', function(assert) {
  this.render(hbs`{{page-numbers totalPages=20 page=2}}`);

  // Prev + 5 visible pages + Next = 7 page item links
  assert.equal(this.$('.page-item').length, 7);

  assert.ok(this.$('a:contains("Previous")').length);
  assert.ok(this.$('a:contains("1")').length);
  assert.ok(this.$('span:contains("2")').length);
  assert.ok(this.$('a:contains("3")').length);
  assert.ok(this.$('a:contains("4")').length);
  assert.ok(this.$('a:contains("5")').length);
  assert.ok(this.$('a:contains("Next")').length);
});

test('it renders links for pages around current page in the middle', function(assert) {
  this.render(hbs`{{page-numbers totalPages=20 page=13}}`);

  // Prev + 5 visible pages + Next = 7 page item links
  assert.equal(this.$('.page-item').length, 7);

  assert.ok(this.$('a:contains("Previous")').length);
  assert.ok(this.$('a:contains("11")').length);
  assert.ok(this.$('a:contains("12")').length);
  assert.ok(this.$('span:contains("13")').length);
  assert.ok(this.$('a:contains("14")').length);
  assert.ok(this.$('a:contains("15")').length);
  assert.ok(this.$('a:contains("Next")').length);
});

test('it renders links for pages around current page at the end', function(assert) {
  this.render(hbs`{{page-numbers totalPages=20 page=20}}`);

  // Prev + 5 visible pages + Next = 7 page item links
  assert.equal(this.$('.page-item').length, 7);

  assert.ok(this.$('a:contains("Previous")').length);
  assert.ok(this.$('a:contains("16")').length);
  assert.ok(this.$('a:contains("17")').length);
  assert.ok(this.$('a:contains("18")').length);
  assert.ok(this.$('a:contains("19")').length);
  assert.ok(this.$('span:contains("20")').length);
  assert.ok(this.$('span:contains("Next")').length);
});

test('it renders links for pages around current page almost at the end', function(assert) {
  this.render(hbs`{{page-numbers totalPages=20 page=19}}`);

  // Prev + 5 visible pages + Next = 7 page item links
  assert.equal(this.$('.page-item').length, 7);

  assert.ok(this.$('a:contains("Previous")').length);
  assert.ok(this.$('a:contains("16")').length);
  assert.ok(this.$('a:contains("17")').length);
  assert.ok(this.$('a:contains("18")').length);
  assert.ok(this.$('span:contains("19")').length);
  assert.ok(this.$('a:contains("20")').length);
  assert.ok(this.$('a:contains("Next")').length);
});
