import { moduleForModel, test } from 'ember-qunit';

moduleForModel('commodity', 'Unit | Model | commodity', {
  // Specify the other units that are required for this test.
  needs: []
});

function isWithinRange(assert, value, base, range, message) {
    var start = base - (base * range), 
        end = base + (base * range);
    assert.ok(value >= start && value <= end, message + ' Expected: ' + value + ' to be between ' + start + ' and ' + end);
}

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});


test('has base commodities', function(assert) {
    let model = this.subject();
    assert.ok(model.get('commodities'));
});

test('randomizes', function(assert) {
    let model = this.subject(),
        base_prices = [{name: "Gold", basePrice: 100}, {name: "Platinum", basePrice: 200}],
        range = 0.15;
    assert.expect(202);
    model.randomize(base_prices, range);
    assert.equal(model.get('commodities.firstObject.name'), base_prices[0].name);
    assert.equal(model.get('commodities.lastObject.name'), base_prices[1].name);
    for(var i = 0; i < 100; i++) {
        isWithinRange(assert, model.get('commodities.firstObject.price'), base_prices[0].basePrice, range, 'Should randomize within range');
        isWithinRange(assert, model.get('commodities.lastObject.price'), base_prices[1].basePrice, range, 'Should randomize within range');
        model.randomize(base_prices, range);
    }
});

