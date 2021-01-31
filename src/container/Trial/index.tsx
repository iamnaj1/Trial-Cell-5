import "./index.scss";
import * as React from "react";
import firebase from "firebase";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  Modal,
  Segment,
} from "semantic-ui-react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useInput } from "../../hooks/useInput";
import { categoryList } from "../../constants/category";
import Search from "../../components/Search";
import SortableTable from "../../components/table";
import { errorMessage, success } from "../../utils/notifications";

function Trial() {
  const db = firebase.firestore();
  const [products, setProducts] = React.useState([]);
  const [productModal, openProductModal] = React.useState(false);
  const [nameError, setNameError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [productID, setProductID] = React.useState("");
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const {
    value: name,
    bind: bindName,
    reset: resetName,
    setValue: setName,
  } = useInput("");
  const {
    value: price,
    bind: bindPrice,
    reset: resetPrice,
    setValue: setPrice,
  } = useInput("");

  const [selectedCategory, setSelectedCategory] = React.useState({
    name: `Processor`,
    dataKey: "processor",
  });

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    handleSearchProduct("");
  }, [products]);

  const fetchData = async () => {
    setLoading(true);
    const data: any = await db.collection("products").get();
    setProducts(data.docs.map((doc: any) => doc.data()));
    resetFields();
  };

  const handleAddProduct = () => {
    openProductModal(true);
  };

  const nameExist = () => {
    const exist =
      products.findIndex((product: any) => product.name === name) !== -1;
    return exist;
  };

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();
    if (productID === "" && nameExist()) {
      setNameError(true);
      return;
    }
    setLoading(true);
    const newId = productID === "" ? uuidv4() : productID;
    db.collection("products")
      .doc(newId)
      .set({
        id: newId,
        name: name,
        price: price,
        category: selectedCategory.name,
      })
      .then(function () {
        success(
          `${
            productID === ""
              ? "Product successfully created!"
              : "Product successfully updated!"
          }`
        );
        openProductModal(false);
        fetchData();
      })
      .catch(function (error) {
        errorMessage(`Action Failed!`);
        openProductModal(false);
        fetchData();
      });
  };

  const resetFields = () => {
    setProductID("");
    resetName();
    resetPrice();
    setSelectedCategory({
      name: `Processor`,
      dataKey: "processor",
    });
  };

  const getProductData = (id: string) => {
    const currentProduct: any = products.find(
      (product: any) => product.id === id
    );
    const category: any = categoryList.find(
      (item: any) => item.name === currentProduct.category
    );
    setName(currentProduct.name);
    setPrice(currentProduct.price);
    setSelectedCategory(category);
    setProductID(id);
  };

  const closeProductModal = () => {
    resetFields();
    openProductModal(false);
  };

  const deleteProduct = (id: string) => {
    setLoading(true);
    db.collection("products")
      .doc(id)
      .delete()
      .then(function () {
        fetchData();
        handleSearchProduct("");
        success(`Product Successfully Deleted!`);
      })
      .catch(function (error) {
        errorMessage("Action Failed");
        fetchData();
        handleSearchProduct("");
      });
  };

  const handleSearchProduct = (name: string) => {
    searchFilteredProduct(name);
  };

  const handleFilteredProducts = (products: any) =>
    setFilteredProducts((state) => (state = products));

  const searchFilteredProduct = async (name: string) => {
    setLoading(true);
    const searchValue = name ? name : "";
    const filteredProducts: any = await _.filter(products, (product: any) => {
      return (
        product.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      );
    });
    handleFilteredProducts(filteredProducts);
    setLoading(false);
  };

  return (
    <Segment className="trial">
      <h1 className="trial-header">Trial Cell 5</h1>
      <div className="trial__options">
        <Search type={"Product"} setSearchValue={handleSearchProduct} />
        <>
          <Modal
            size={"tiny"}
            open={productModal || productID !== ""}
            onClose={() => {
              closeProductModal();
            }}
            onOpen={() => {
              openProductModal(true);
            }}
            closeIcon={true}
            className="product-modal"
            trigger={
              <Button
                primary={true}
                className="product-btn"
                onClick={handleAddProduct}
              >
                Add New Product
              </Button>
            }
          >
            <Modal.Header className="product-modal__header">
              {productID === "" ? "Add New Product" : "Update Product"}
            </Modal.Header>
            <Modal.Content>
              <Grid.Row columns={1} className="product-modal__content">
                <Form className="product-modal__form" onSubmit={handleSubmit}>
                  <Form.Input
                    size="large"
                    label="Name"
                    type="text"
                    placeholder="Name"
                    {...bindName}
                    required
                    error={
                      nameError
                        ? { content: "Product Name already exist!" }
                        : false
                    }
                  />
                  <Form.Group className="product-modal__group">
                    <Form.Field
                      className="product-modal__group__category"
                      size="large"
                    >
                      <label htmlFor="Category">Category</label>
                      <Dropdown
                        id="Category"
                        className="selection"
                        openOnFocus
                        trigger={
                          <span className="category-label">
                            {selectedCategory.name}
                          </span>
                        }
                      >
                        <Dropdown.Menu>
                          {categoryList.map((option, key) => {
                            return (
                              <Dropdown.Item
                                key={key}
                                text={option.name}
                                value={option.dataKey}
                                onClick={() => {
                                  setSelectedCategory(option);
                                }}
                              />
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Field>
                    <Form.Input
                      className="product-modal__group__price"
                      size="large"
                      label="Price"
                      type="Number"
                      placeholder="Product Price"
                      {...bindPrice}
                    />
                  </Form.Group>
                  <Form.Field
                    size="large"
                    className="signup-container__form__signup"
                    control={Button}
                    primary={true}
                    value="Submit"
                  >
                    {productID === "" ? "Add" : "Update"}
                  </Form.Field>
                </Form>
              </Grid.Row>
            </Modal.Content>
          </Modal>
        </>
      </div>
      {_.isEmpty(filteredProducts) ? (
        <h1> Empty Data</h1>
      ) : loading ? (
        <h1>loading</h1>
      ) : (
        <SortableTable
          products={filteredProducts}
          getProductData={getProductData}
          deleteProduct={deleteProduct}
        />
      )}
    </Segment>
  );
}

export default Trial;
