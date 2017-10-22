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
  }
  // altitude: {
  //   type: Sequelize.FLOAT,
  //   allowNull: false
  // }
});


Marker.findAllInRadius = function(radius){
    // Places.findAll({
    // attributes: [sequelize.fn('ST_DISTANCE', sequelize.literal('lat_lng'), sequelize.literal('ST_MakePoint(-126.4, 45.32)::geography')]
    // });
    // let location = Sequelize.literal(`ST_GeomFromText('POINT(${this.lat} ${this.long})')`)
    // let distance = sequelize.fn('ST_Distance_Sphere', sequelize.literal('geolocation'), WebGLUniformLocation);
    
    // Marker.findAll({
    //     order: 'distance',
    //     where: sequelize.where(distance, {$lte: radius}),
    //   })
    //   .then(function(instance){
    //     console.log(instance)
    //     return res.json(200, instance);
    //   })

}

module.exports = {Marker, db};