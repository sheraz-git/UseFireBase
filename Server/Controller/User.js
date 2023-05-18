const Users = require("../Model/config");
const jwt=require("jsonwebtoken");
const Cookies=require("js-cookie");
exports.create = async (req, res) => {
  try {
    const { name, age, contact, email, password } = req.body;
   const querySnapshot = await Users.where('email', '==', email).get();
  // const existingUser = querySnapshot.docs[0].data();
  //console.log(existingUser);
if(!querySnapshot.empty){
  return res.status(201).json({
    message: "Already created",
  });  
}
    const newUser = {
      name: name,
      age: age,
      contact: contact,
      email: email,
      password: password,
    };
    await Users.add(newUser);
    return res.status(201).json({
      message: "User created",
      newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }};
/////////////////////get all user////////////////////
  exports.getUsers = async (req, res) => {
  try {
    const snapshot = await Users.get();
   // console.log(snapshot);
    // Extract the user data from the snapshot
    const users = snapshot.docs.map((doc) => doc.data());
    return res.status(200).json({
      message: "Users retrieved",
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

/////////////// login User //////////////////
exports.loginuser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const querySnapshot = await Users.where('email', '==', email).where('password', '==', password).get();
      // const data= querySnapshot.docs[0].data();
      // console.log(data);
     if (querySnapshot.empty) {
       return res.status(404).json({
         message: "User doesn't exist",
       });
     } 
     else {
       const token = jwt.sign({ email: `${email}` }, "codistan");
        Cookies.set('token', token, { expires: 1/24 }); // Expires in 1 hour
       return res.status(200).json({
         message: "login successful",
         token
       });
     }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};


exports.getloginuser = async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const querySnapshot = await Users.where('email', '==', email).get();
    if (querySnapshot.empty) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }  else {
      const user = querySnapshot.docs.map((doc) => doc.data());
      return res.status(200).json({
        message: "This is the specific User",
        user,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};