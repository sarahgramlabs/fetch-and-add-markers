const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/gramlabs-markers', {logging: false});
const DataTypes = require('sequelize/lib/data-types');

const Marker = db.define('marker', {
  point: DataTypes.GEOMETRY('POINT'),
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  long: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  altitude: {
    type: Sequelize.FLOAT,
  }
});


Marker.prototype.findNearby = function(radius){
  const location = Sequelize.literal(`ST_GeomFromText('POINT(${this.long} ${this.lat})')`)
  const distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.col('point'), location)
  //  ['attribute definition', 'alias']
  return Marker.findAll({
    attributes: ['id', [Sequelize.fn('ST_Distance_Sphere', Sequelize.literal('point'), location), 'distance']],
    where: Sequelize.where(distance, { $lte: radius }),
    order: distance
  })
}

module.exports = {Marker, db};