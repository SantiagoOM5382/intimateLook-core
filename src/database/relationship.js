const Admin = require('./models/admin')
const Girl = require('./models/girl')


// relacion one to many girls-Admin
Girl.belongsTo(Admin, { foreignKey: 'admin_id', as: 'admin' });
Admin.hasMany(Girl, { foreignKey: 'adminId', as: 'girls' }); 
