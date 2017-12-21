# ember-cli-bs-pagination

A simple addon to render pagination links (using bootstrap 4 markup).
What it does:
- renders links with markup as specified by [Bootstrap 4](https://getbootstrap.com/docs/4.0/components/pagination/)
- sets the `page` variable you pass it to the clicked page (or to -1 or +1 if Previous or Next is clicked)

Assumptions:
- The URL for the current page is the same as the paginated url

What it does not do:
- paginate your models
- allow you to use a zero-based index for pagination
- update the URL (ember will do this for you when setup properly as outlined below)
- cook you bacon

What it will do (roadmap):
- support `innerWindow` argument (how many links are shown around the current page)
- support `outerWindow` argument (how many links are around the first and the last page)
- support rendering a pagination summary

What it depends on:
- handlebars
- [ember-uri-shim](https://github.com/spieker/ember-uri-shim)

Configuration options:
- `additionalClasses` will be added to the `ul.pagination` node. Use `pagination-sm` or `pagination-lg` for sizing, use [flexbox utilites](http://getbootstrap.com/docs/4.0/utilities/flex/) for alignment (eg `justify-content-center`).
- If you would prefer to use "actions up" instead of two-way binding for `page`, pass `_setPage=(action mySetPageAction)` and your action will receive the new value of page as an argument.

## Installation & Usage
- Install
`ember install ember-cli-bs-pagination`

- Tell your route that you want to refresh the model whenever the `page` query param changes (otherwise changing `page` won't call the model hook)
- pass params when you query the `store`, which will have the query param `page`
```javascript
// app/routes/items.js
export default Route.extend({
  queryParams: {
    page: { refreshModel: true },
  },
  model(params) {
    return get(this, 'store').query('item', params);
  },
})
```

- Tell your controller that you want to bind the `page` query param to a `page` variable locally
- Tell your controller the default value for `page`
```javascript
// app/controllers/items.js
export default Controller.extend({
  queryParams: ["page"],
  page: 1,
});
```

- Use the component (finally!)
```handlebars
{{!-- app/templates/items.hbs --}}
{{#each model do |item|}}
  {{!-- render item --}}
{{/each}}
{{page-numbers page=page totalPages=model.meta.total-pages}}
```

Note: `meta.total-pages` assumes your API returns this param properly formatted as per the JSONApi spec.

That's all!

Variations on a theme:
- You can easily customize the view by defining your own `app/components/templates/page-numbers.hbs`. Look at `page-numbers.hbs` here for inspiration.
  NOTE: removing your local `page-numbers.hbs` file seems to confuse Ember. I've had to `rm -rf node_modules/ember-cli-bs-pagination; yarn` to get it working again after removing an app's local version of the template
- You could paginate a local array of items just as easily by changing the `model()` hook and changing how you set `totalPages`
- You can use anything you like for the `page` query param, say you wanted to use `página`, just use `página` in the Route & Controller setup, then pass it to the component, eg `{{page-numbers page=página totalPages=totalPages}}`

## Collaborating
### Get Started

* fork the repo & clone it locally
* `cd ember-cli-bs-pagination`
* `yarn install`
* `git checkout -b my-feature-name-or-bug-fix-name`
* write some code
* write some tests
* submit a PR

### Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`
* `ember serve`, then visit tests at [http://localhost:4200/tests](http://localhost:4200/tests).
