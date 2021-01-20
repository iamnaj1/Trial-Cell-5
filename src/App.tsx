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
  const [addModal, openAddModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const { value: price, bind: bindPrice, reset: resetPrice } = useInput("");
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
    openAddModal(true);
  };

  const handleSubmit = async (event: any) => {
    // Block native form submission.
    event.preventDefault();
    setLoading(true);
    const newId = uuidv4();
    db.collection("products")
      .doc(newId)
      .set({
        name: name,
        price: price,
        category: selectedCategory.name,
      })
      .then(function () {
        openAddModal(false);
        fetchData();
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
        openAddModal(false);
        fetchData();
      });
  };

  const resetFields = () => {
    resetName();
    resetPrice();
    setSelectedCategory({
      name: `Processor`,
      dataKey: "processor",
    });
  };
  return (
    <div className="App">
      <h1>Trial</h1>
      {_.isEmpty(products) || loading ? (
        <h1> Loading</h1>
      ) : (
        <SortableTable products={products} />
      )}
      <>
        <Modal
          size={"tiny"}
          open={addModal}
          onClose={() => openAddModal(false)}
          onOpen={() => openAddModal(true)}
          closeIcon={true}
          className="add-new-product-modal"
          trigger={
            <Button
              primary={true}
              className="add-new-product-btn"
              onClick={handleAddProduct}
            >
              Add New Product
            </Button>
          }
        >
          <Modal.Header className="add-new-product-modal__header">
            Add New Product
          </Modal.Header>
          <Modal.Content>
            <Grid.Row columns={1} className="add-new-product-modal__content">
              <Form
                className="add-new-product-modal__form"
                onSubmit={handleSubmit}
              >
                <Form.Input
                  size="large"
                  label="Name"
                  type="text"
                  placeholder="Name"
                  {...bindName}
                  required
                />
                <Form.Group className="add-new-product-modal__group">
                  <Form.Field
                    className="add-new-product-modal__group__country"
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
                    className="add-new-product-modal__group__price"
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
                  Add
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
