import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    skilledPersonId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'skilledProfile',
        required : true
    },
    BookingId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Booking',
        required : true
    },
    rating : {
        type : Number,
        enum : [1,2,3,4,5],
        required : true
    },
    comment : {
        type : String,
        default : " "
    }
},
{
    timestamps : true
})

const Review = mongoose.model('Review',reviewSchema);
export default Review;