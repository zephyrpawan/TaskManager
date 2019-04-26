const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  parentId: {type: String, required: true},
  taskName: {type: String, required: true},
  startDate: {type: String, required: true},
  endDate: {type: String, required: true},
  priority: {type: Number, default: 15}
});

module.exports = mongoose.model('Task',taskSchema);
