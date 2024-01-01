const mongoose =require('mongoose')
const bcrypt =require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      // required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);
//before saving into db we need to encryt the password
//
userSchema.pre('save',async function (next){
    // pre ('save') prev of save operation call this func
    if(!this.isModified('password')){
        next();
    }
    // bcrypt functionality
    const salt= await bcrypt.genSalt(10)//higher the value more security
    //here we are generating asyncronously

    this.password=await bcrypt.hash(this.password,salt);
    // adding salt and make it encrypted
});

userSchema.methods.matchPassword =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
    
}
const User = mongoose.model('User',userSchema);
module.exports = User;

