
import React, { useEffect, useState } from "react";
import AdminHeader from "./adminheader";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProduct = () => {
  const [allproduct, setAllProduct] = useState([]);
  const [pname, setPName] = useState("");
  const [pprice, setPPrice] = useState("");
  const [pphoto, setPPhoto] = useState("");
  const [pdetails, setPDetails] = useState("");
  const [msg, setMsg] = useState("");
  const [pfamily, setPFamily] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [error, setError] = useState('');





  const fetchProducts = () => {
    axios.get("http://127.0.0.1:988/data")
      .then((response) => {
        if (response.data.length > 0) {
          setAllProduct(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);





  const save = () => {
    
    // Validate name
    if (pname.trim() === "") {
      setErrorMsg("Product name cannot be empty.");
      return;
    }

  
    // Validate family
    if (pfamily !== "electronics" && pfamily !== "fashion") {
      setErrorMsg("Product family must be either 'electronics' or 'fashion'.");
      return;
    }
  
    // Validate if the product name is modified
    if (selectedProduct && selectedProduct.name !== pname.trim()) {
      setErrorMsg("Please don't modify the product name.");
      return;
    }

    // Validate price
    if (pprice === "" || !validatePrice(pprice)) {
      setErrorMsg("Product price cannot be empty or contain non-numeric characters.");
      return;
    }

  // Validate photo
  if (pphoto === "") {
    setErrorMsg("Product photo cannot be empty.");
    return;
  }

  // Validate family
  if (pfamily.trim() === "") {
    setErrorMsg("Product family cannot be empty.");
    return;
  }

  // Validate details
  if (pdetails.trim() === "") {
    setErrorMsg("Product details cannot be empty.");
    return;
  }



     // Validate price
    const regex = /^[0-9]*$/;
    if (!regex.test(pprice)) {
      setErrorMsg("Please enter only numbers for product price.");
      return;
    }


    const url = "http://127.0.0.1:988/product";
    const pdata = {
      "name": pname,
      "price": pprice,
      "photo": pphoto,
      "pfamily": pfamily,
      "details": pdetails
    };

    axios.post(url, pdata)
      .then(response => {
        if (response && response.data && response.data.message) {
          setMsg(pname + " Added Successfully");
          fetchProducts();
          setErrorMsg("");


          setPName("");
          setPPrice("");
          setPPhoto("");
          setPFamily("");
          setPDetails("");
          setErrorMsg("");


          console.log("Response",response.data)
          console.log("pdata",pdata);

          toast.success(response.data.message, { position: "top-right" });
          
        } else {
          setErrorMsg("An unexpected error occurred while saving the product.");
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          toast.error("Product already exists", { position: "top-right" });
        } else {
          toast.error("An error occurred while saving the product", { position: "top-right" });
        }
      });
      
  };




  const deletePro = (pid, name) => {
    const url = `http://127.0.0.1:988/delete/`+name;
    axios.delete(url)
      .then(response => {
        if (response && response.data && response.data.message) {
          setMsg(name + " Deleted Successfully");
          fetchProducts();
          toast.success(response.data.message, { position: "top-right" });
        }
      })
      .catch(error => {
        console.error("Error deleting product:", error);
        if (error.response && error.response.status === 404) {
          toast.error("Product not found", { position: "top-right" });
        } else {
          toast.error("An error occurred while deleting the product", { position: "top-right" });
        }
      });
  };



  const editProduct = (product) => {
    setSelectedProduct(product);
    setPName(product.name);
    setPPrice(product.price);
    setPPhoto(product.photo);
    setPDetails(product.details);
    setPFamily(product.pfamily);
  };









  const updateProduct = () => {

    // Clear any existing error message
    setErrorMsg("");
  

    
    // Validate name
    if (pname.trim() === "") {
      setErrorMsg("Product name cannot be empty.");
      return;
    }



    // Check if a product is selected for update
    if (!selectedProduct) {
      setErrorMsg("No product selected for update.");
      return;
    }
  


    // Validate family
    if(pfamily === "Select Family"){
      setErrorMsg("Product family must be either 'electronics' or 'fashion'.");
      return;
    }


    if (pfamily !== "electronics" && pfamily !== "fashion") {
      setErrorMsg("Product family must be either 'electronics' or 'fashion'.");
      return;
    }


  
    // Validate if the product name is modified
    if (selectedProduct && selectedProduct.name !== pname.trim()) {
      setErrorMsg("Please don't modify the product name.");
      return;
    }



    // Validate price
  if (pprice === "" || !validatePrice(pprice)) {
    setErrorMsg("Product price cannot be empty or contain non-numeric characters.");
    return;
  }



  // Validate photo
  if (pphoto === "") {
    setErrorMsg("Product photo cannot be empty.");
    return;
  }



  // Validate family
  if (pfamily.trim() === "") {
    setErrorMsg("Product family cannot be empty.");
    return;
  }



  // Validate details
  if (pdetails.trim() === "") {
    setErrorMsg("Product details cannot be empty.");
    return;
  }




  if (!validatePrice(pprice)) {
    setErrorMsg("Please enter only numbers for product price.");
    return;
  }


  
    const url = `http://127.0.0.1:988/update`;
    const updatedData = {
      "name": pname,
      "price": pprice,
      "photo": pphoto,
      "pfamily": pfamily,
      "details": pdetails
    };
  
    console.log(updatedData);
  

    axios.put(url, updatedData)
      .then(response => {
        if (response && response.data && response.data.message) {
          setMsg(pname + " Updated Successfully");
          fetchProducts();
          setSelectedProduct(null);



          setPName("");
          setPPrice("");
          setPPhoto("");
          setPDetails("");
          setPFamily("");


          document.getElementById("details").classList.remove("show");
          document.body.classList.remove("modal-open");
          document.getElementsByClassName("modal-backdrop")[0].remove();



          toast.success(response.data.message, { position: "top-right" });
          console.log("Response of the update product",response.data)
        } else {
          setErrorMsg("An error occurred while updating the product.");
        }
      })
      .catch(error => {
        console.error("Error saving product:", error);
        if (error.response.data.error && error.response.status === 404) {
          toast.error(error.response.data.error, { position: "top-right" });
        } else if(error.response.data.error && error.response.status === 400){
          toast.error(error.response.data.error, { position: "top-right" });
        }
      });
  };


  const validatePrice = (inputPrice) => {
    const regex = /^[0-9]*$/;
    return regex.test(inputPrice);
  };



  return (
    <>
      <AdminHeader />
      <ToastContainer/>
      <div className="container mt-1">
        <div className="row">
          <div className="col-lg-12">
          </div>
        </div>
      </div>
      {errorMsg && <div className="alert alert-danger mt-1">{errorMsg}</div>}
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3 mt-4">
            <h4> Add Product </h4>
            {/* {errorMsg && <div className="alert alert-danger mt-1">{errorMsg}</div>} */}
            <div className="mb-3">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control" value={pname}
                onChange={(e) => setPName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Product Price</label>
              <input
                type="text"
                className="form-control" value={pprice}
                onChange={(e) => setPPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Product Family</label>
              <select
                className="form-select" value={pfamily}
                onChange={(e) => setPFamily(e.target.value)}>
                <option value="">Select Family</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Product Photo</label>
              <input
                type="text"
                className="form-control" value={pphoto}
                onChange={(e) => setPPhoto(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Product Details</label>
              <textarea
                className="form-control" value={pdetails}
                onChange={(e) => setPDetails(e.target.value)}
              ></textarea>
            </div>
            <div className="text-center">
              <button className="btn btn-primary" onClick={save}>
                Save Product
              </button>
            </div>
          </div>
          <div className="col-lg-9 mt-4">
            <h4 className="text-center">
              Available products - {allproduct.length}
            </h4>
            <p className="text-center text-danger"> <strong>{msg}</strong> </p>
            <table className="table table-bordered mt-3 shadow text-center">
              <thead>
                <tr className="bg-light text-primary">
                  <th>Name</th>
                  <th>Price</th>
                  <th>Details</th>
                  <th>Family</th>
                  <th>Photo</th>
                  <th>Edit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allproduct.map((pinfo, index) => {
                  return (
                    <tr key={index}>
                      <td> {pinfo.name} </td>
                      <td> {pinfo.price} </td>
                      <td style={{ maxWidth: "200px", wordWrap: "break-word" }}> 
                        {pinfo.details.length > 500 ? pinfo.details.slice(0, 500) : pinfo.details}
                       </td>
                      <td> {pinfo.pfamily} </td>
                      <td> 
                        <img src={pinfo.photo} alt="Product" style={{ width: 50, height: 50 }} />
                      </td>
                      <td>
                        <i
                          className="fa fa-edit fa-lg text-primary" data-bs-toggle="modal" data-bs-target="#details"
                          onClick={() => editProduct(pinfo)}
                        ></i>
                      </td>
                      <td>
                        <i
                          className="fa fa-trash fa-lg text-danger"
                          onClick={() => deletePro(pinfo.id, pinfo.name)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="modal fade" id="details" tabIndex="-1" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update the product</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {errorMsg && <div className="alert alert-danger mt-1">{errorMsg}</div>}
            <div className="modal-body">
              <div>
                <div className="mb-3">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setPName(e.target.value)}
                    value={pname}  readOnly
                  />
                </div>
                <div className="mb-3">
                  <label>Product Price</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setPPrice(e.target.value)}
                    value={pprice}
                  />
                </div>
                <div className="mb-3">
                  <label>Product Photo</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setPPhoto(e.target.value)}
                    value={pphoto}
                  />
                </div>
                <div className="mb-3">
                  {/* <label>Product Family</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setPFamily(e.target.value)}
                    value={pfamily}
                  /> */}
                  <label>Product Family</label>
                  <select
                    className="form-select"
                    onChange={(e) => setPFamily(e.target.value)}>
                    <option value="">Select Family</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Product Details</label>
                  <textarea
                    className="form-control"
                    onChange={(e) => setPDetails(e.target.value)}
                    value={pdetails}
                  ></textarea>
                </div>
                <button class="btn btn-primary text-center"  onClick={updateProduct} >Update product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
