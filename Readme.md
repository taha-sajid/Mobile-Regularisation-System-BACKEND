# Mobile Regularisation System

**Bugs Needs To Be Fixed**

1. Our Duplicate key error validation not working it has some kind of issue, I don't know what, but we need to fix this.
    - ***This is the function of email validation* [It should be in userModel.js File]**
       ```js 

      userSchema.statics.isEmailInUse =
        catchAsync(async (email) => {
        const user = User.findOne({ email });
        if (user) return false;
          return true;
        });

    - ***The below code will used in the begining of signup function* [It should be in authController.js File]**
       ```js

       const isNewUser = await User.isEmailInUse(req.body.email);
       if (isNewUser)
         return next(new AppError("This email is already in used", 401));
         
