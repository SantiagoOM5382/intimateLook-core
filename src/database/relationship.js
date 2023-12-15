const Admin = require('./models/admin')
const Girl = require('./models/girl')
const Country = require('./models/country');
const State = require('./models/state');
const City = require('./models/city');

// relationship one to many girls-Admin
Girl.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin' });
Admin.hasMany(Girl, { foreignKey: 'adminId', as: 'girls' }); 

// relationship one to many states-country
State.belongsTo(Country, { foreignKey: 'country_id', as: 'country' });
Country.hasMany(State, { foreignKey: 'country_id', as: 'states' });

// relationship one to many cities-state
City.belongsTo(State, { foreignKey: 'state_id', as: 'state' });
State.hasMany(City, { foreignKey: 'state_id', as: 'cities' });

// relationship one to many girls-city
Girl.belongsTo(City, { foreignKey: 'city_id', as: 'city' });
City.hasMany(Girl, { foreignKey: 'city_id', as: 'girls' });

// relationship one to many girls-state
Girl.belongsTo(State, { foreignKey: 'state_id', as: 'state' });
State.hasMany(Girl, { foreignKey: 'state_id', as: 'girls' });

// relationship beetwen admins and countries
Admin.belongsTo(Country, { foreignKey: 'country_id', as: 'country' });
Country.hasMany(Admin, { foreignKey: 'country_id', as: 'admins' });

