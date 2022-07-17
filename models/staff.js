const mongoose = require('mongoose');

// Staff Schema
const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: Schema.Types.ObjectId, ref: 'role'}
})

// Staff Manage Schema
const orderDetailSchema = new mongoose.Schema({
    staff: { type: Schema.Types.ObjectId, ref: 'staff'},
    orderDetail: { type: Schema.Types.ObjectId, ref: 'order_detail'},
})

//  Role Schema
const orderStatusSchema = new mongoose.Schema({
    name: String
})



// Create Model Objects
const Staff = mongoose.model('staff', orderSchema)
const StaffManage = mongoose.model('staff_manage', orderDetailSchema)
const Role = mongoose.model('role', orderStatusSchema)

// Export Model Objects
module.exports = { Staff, StaffManage, Role }
