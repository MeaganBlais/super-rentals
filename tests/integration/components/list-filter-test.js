import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seatle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

moduleForComponent('list-filter', 'Integration | Component | list filter', {
  integration: true
});

test('should initially load all listings', function (assert) {
  //actions need to return promises to handle potential asynchronou data
  this.on('filterByCity', () => {
    return RSVP.resolve({ results: ITEMS });
  });

  //
  this.render(hbs`
  {{#list-filter filter=(action 'filterByCity') as |results|}}
    <ul>
    {{#each results as |item|}}
      <li class="city">
        {{item.city}}
      </li>
    {{/each}}
    </ul>
  {{/list-filter}}
  `);

  return wait().then(() => {
    assert.equal(this.$('.city').length, 3);
    assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
  });
});