const addinfo=require("../Model/Product");
exports.Productcreate = async (req, res) => {
    try {
      const { name,productName,ProductPrice,quantity } = req.body;
     const querySnapshot = await addinfo.where('productName', '==', productName).get();
  if(!querySnapshot.empty){
    return res.status(201).json({
      message: "Already Product added created",
    });  
  }
      const newProduct = {
        name: name,
        productName: productName,
        ProductPrice: ProductPrice,
        quantity: quantity,
      };
      await addinfo.add(newProduct);
      return res.status(201).json({
        message: "User created",
        newProduct,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Server error",
      });
    }};
  /////////////////////get all user////////////////////
exports.getProducts = async (req, res) => {
    try {
      const snapshot = await addinfo.get();
     // console.log(snapshot);
      // Extract the user data from the snapshot
      const products = snapshot.docs.map((doc) => doc.data());
      return res.status(200).json({
        message: "Users retrieved",
        products,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  };

  
