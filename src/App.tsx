import "./App.css";
import * as React from "react";
import firebase from "firebase";
import SortableTable from "./components/table";
import "semantic-ui-css/semantic.min.css";
import { Button, Dropdown, Form, Grid, Modal } from "semantic-ui-react";
import { categoryList } from "./constants/category";
import { useInput } from "./hooks/useInput";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

function App() {
  const db = firebase.firestore();
  const [products, setProducts] = React.useState([]);
  const [productModal, openProductModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [productID, setProductID] = React.useState("");
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
  // const [nameError, setNameError] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState({
    name: `Processor`,
    dataKey: "processor",
  });

  React.useEffect(() => {
    console.log("fetchData: ");
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data: any = await db.collection("products").get();
    setProducts(data.docs.map((doc: any) => doc.data()));
    resetFields();
    setLoading(false);
  };

  const handleAddProduct = () => {
    openProductModal(true);
  };

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();
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
        openProductModal(false);
        fetchData();
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
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
    console.log("id: ", id);
    console.log("current data: ", currentProduct);
  };

  const closeProductModal = () => {
    resetFields();
    openProductModal(false);
  };
  return (
    <div className="App">
      <h1>Trial</h1>
      {_.isEmpty(products) || loading ? (
        <h1> Loading</h1>
      ) : (
        <SortableTable products={products} getProductData={getProductData} />
      )}
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
                />
                <Form.Group className="product-modal__group">
                  <Form.Field
                    className="product-modal__group__country"
                    size="large"
                  >
                    <label htmlFor="Country">Country</label>
                    <Dropdown
                      id="Country"
                      className="selection"
                      openOnFocus
                      trigger={
                        <span className="country-label">
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
                  {productID === "" ? "Add" : 'Update'}
                </Form.Field>
              </Form>
            </Grid.Row>
          </Modal.Content>
        </Modal>
      </>
    </div>
  );
}

export default App;
