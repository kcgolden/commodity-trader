import DS from 'ember-data';
var base_commodities = [
    {
        name: "Gold",
        basePrice: 1000 
    },
    {
        name: "Silver",
        basePrice: 750
    },
    {
        name: "Copper",
        basePrice: 500
    }
];
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
export default DS.Model.extend({
    commodities: null,
    randomize: function(base_commodities, factor) {
        this.set('commodities', base_commodities.map(function(commodity) {
            var basePrice = commodity.basePrice,
                min = basePrice - (basePrice * factor),
                max = basePrice + (basePrice * factor);
            return {
                name: commodity.name,
                price: Math.round(getRandomArbitrary(min, max))
            };
        }));
    },
    init: function() {
        this.randomize(base_commodities, 0.15);
    }
});
