import React, { Component } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import {
  AvField,
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import "./DictantCategoryProducts.scss";
import { Label } from "reactstrap";
import { Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  saveFile,
  addDictant,
  updateState,
  getCategoryDictants,
  getDictants,
  deleteDictant,
  editDictant,
} from "../../../redux/actions/dictantAction";
import { getDictantCategories } from "../../../redux/actions/dictantCategoryAction";
// import Term from "./Term";
import { MdEdit, MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";
import Term from "../AdminDictants/Term";

class AdminDictants extends Component {
  componentDidMount() {
    this.props.getDictantCategories();
    this.props.getCategoryDictants(this.props.match.params.id, 0, 6);
  }

  constructor(props) {
    super(props);
    this.state = {
      chorak1: [<Term termNum={1} num={1} />],
      chorak2: [<Term termNum={2} num={1} />],
      chorak3: [<Term termNum={3} num={1} />],
      chorak4: [<Term termNum={4} num={1} />],
      counter1: 2,
      counter2: 2,
      counter3: 2,
      counter4: 2,
      pageNumber: 0,
    };
  }
  render() {
    const d = this.props.dictants;

    const submitImage = (info) => {
      this.props.saveFile(info.file.originFileObj, "image");
    };
    const submitFile = (info) => {
      this.props.saveFile(info.file.originFileObj, "file");
    };
    const changeModal = () => {
      this.props.updateState({ modalOpen: !d.modalOpen });
    };
    const changeDeleteModal = () => {
      this.props.updateState({
        deleteModalOpen: !d.deleteModalOpen,
      });
    };
    const saveDictant = (event, values) => {
      d.selectedDictant
        ? this.props.editDictant(d.selectedDictant, values)
        : this.props.addDictant({
            ...values,
            imageUrl: d.dictantImage.downloadUrl,
            imageId: d.dictantImage.id,
            downloadUrl: d.dictantFile.downloadUrl,
            pdfId: d.dictantFile.id,
            term1: d.term1,
            term2: d.term2,
            term3: d.term3,
            term4: d.term4,
          });
    };
    const dummyRequest = ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    };
    const changePage = ({ selected }) => {
      this.setState({ pageNumber: selected });
      this.props.getCategoryDictants(this.props.match.params.id, selected, 6);
    };
    const pageCount = d.categoryDictants ? d.categoryDictants.totalPages : 0;
    return (
      <AdminLayout>
        <div className="dictantCategoryProducts">
          <table className="table table-striped table-hover mt-3">
            <thead>
              <tr>
                <th>Rasmi</th>
                <th>Diktant nomi</th>
                <th>Kategoriya</th>
                <th>Izoh</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {d.categoryDictants ? (
                d.categoryDictants.content.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {d.isLoading ? (
                        <span className="spinner-border spinner-border-sm mr-3"></span>
                      ) : (
                        <img
                          className="bookImg"
                          src={item.imageUrl}
                          alt={item.imageUrl}
                        />
                      )}
                    </td>
                    <td>
                      <p>{item.title}</p>
                    </td>
                    <td>
                      <p>{item.categoryName}</p>
                    </td>
                    <td>
                      <p>{item.description}</p>
                    </td>
                    <td>
                      <div className="action">
                        <button
                          type="button"
                          className="btn btn-primary mr-2"
                          onClick={() => {
                            this.props.updateState({
                              selectedDictant: item,
                            });
                            changeModal();
                          }}
                        >
                          <MdEdit />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            this.props.updateState({ selectedDictant: item });
                            changeDeleteModal();
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
          {(
            d.categoryDictants
              ? d.categoryDictants.totalElements <= d.categoryDictants.size
              : true
          ) ? (
            ""
          ) : (
            <ReactPaginate
              previousLabel={"Oldingi"}
              nextLabel={"Keyingi"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          )}
          <Modal isOpen={d.modalOpen}>
            <ModalBody>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="large"
              >
                <Upload
                  customRequest={dummyRequest}
                  required={true}
                  listType="picture"
                  accept=".doc,.docx,.pdf"
                  maxCount={1}
                  onChange={submitFile}
                  defaultFileList={
                    d.selectedDictant
                      ? [
                          {
                            url: d.selectedDictant.downloadUrl,
                            thumbUrl: d.selectedDictant.downloadUrl,
                          },
                        ]
                      : []
                  }
                >
                  <Button icon={<UploadOutlined />}>Kitobni yuklash</Button>
                </Upload>
              </Space>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="large"
              >
                <Upload
                  customRequest={dummyRequest}
                  required={true}
                  listType="picture"
                  onChange={submitImage}
                  defaultFileList={
                    d.selectedDictant
                      ? [
                          {
                            url: d.selectedDictant.imageUrl,
                            thumbUrl: d.selectedDictant.imageUrl,
                          },
                        ]
                      : []
                  }
                  maxCount={1}
                  accept=".jpg, .gif, .png, .gif"
                >
                  <Button className="my-3" icon={<UploadOutlined />}>
                    Rasmni yuklang
                  </Button>
                </Upload>
              </Space>
            </ModalBody>
            <AvForm onValidSubmit={saveDictant} model={d.selectedDictant}>
              <ModalBody>
                <AvGroup>
                  <Label htmlFor="bookName">Kitob nomini kiriting</Label>
                  <AvInput name="title" id="bookName" required />
                  <AvFeedback>To'ldirilmagan</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <Label htmlFor="bookInform">
                    Mavzuga oid malumotlarni kiriting
                  </Label>
                  <AvInput
                    type="textarea"
                    name="description"
                    id="bookInform"
                    required
                  />
                  <AvFeedback>To'ldirilmagan</AvFeedback>
                </AvGroup>
                <div className="chorak1">
                  <div className="label-box">
                    <Label htmlFor="term1">1-chorak</Label>
                    <span
                      onClick={() => {
                        this.setState({ counter1: this.state.counter1 + 1 });
                        this.setState({
                          chorak1: [
                            ...this.state.chorak1,
                            <Term termNum={1} num={this.state.counter1} />,
                          ],
                        });
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div className="term1">
                    {this.state.chorak1.map((item, index) => (
                      <Term termNum={1} num={index} key={index} />
                    ))}
                  </div>
                </div>
                <div className="chorak2">
                  <div className="label-box">
                    <Label htmlFor="term2">2-chorak</Label>
                    <span
                      onClick={() => {
                        this.setState({ counter2: this.state.counter2 + 1 });
                        this.setState({
                          chorak2: [
                            ...this.state.chorak2,
                            <Term termNum={2} num={this.state.counter2} />,
                          ],
                        });
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div className="term2">
                    {this.state.chorak2.map((item, index) => (
                      <Term termNum={2} num={index} key={index} />
                    ))}
                  </div>
                </div>
                <div className="chorak3">
                  <div className="label-box">
                    <Label htmlFor="term3">3-chorak</Label>
                    <span
                      onClick={() => {
                        this.setState({ counter3: this.state.counter3 + 1 });
                        this.setState({
                          chorak3: [
                            ...this.state.chorak3,
                            <Term termNum={3} num={this.state.counter3} />,
                          ],
                        });
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div className="term3">
                    {this.state.chorak3.map((item, index) => (
                      <Term termNum={3} num={index} key={index} />
                    ))}
                  </div>
                </div>
                <div className="chorak4">
                  <div className="label-box">
                    <Label htmlFor="term4">4-chorak</Label>
                    <span
                      onClick={() => {
                        this.setState({ counter4: this.state.counter4 + 1 });
                        this.setState({
                          chorak4: [
                            ...this.state.chorak4,
                            <Term termNum={4} num={this.state.counter4} />,
                          ],
                        });
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div className="term4">
                    {this.state.chorak4.map((item, index) => (
                      <Term termNum={4} num={index} key={index} />
                    ))}
                  </div>
                </div>
                <AvField
                  required
                  type="select"
                  name="essayCategoryId"
                  label="Kategoriyani tanlang"
                >
                  {this.props.dictantCategories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </AvField>
                <AvField
                  name="isFavourite"
                  type="checkbox"
                  label="IsFavourite"
                  value={d.isFavourite}
                  onChange={() =>
                    this.props.updateState({
                      isFavourite: !d.isFavourite,
                    })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="success">
                  Saqlash
                </Button>
                <Button type="button" onClick={changeModal} color="danger">
                  Bekor qilish
                </Button>
              </ModalFooter>
            </AvForm>
          </Modal>
          <Modal isOpen={d.deleteModalOpen}>
            <ModalBody>
              <h5>Rostan ham o'chirmoqchisiz ?</h5>
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  this.props.deleteDictant(d.selectedDictant);
                  changeDeleteModal();
                }}
              >
                Ha
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={changeDeleteModal}
              >
                Yo'q
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </AdminLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dictants: state.dictants,
    dictantCategories: state.dictantCategory.dictantCategories,
  };
};

export default connect(mapStateToProps, {
  saveFile,
  getCategoryDictants,
  getDictantCategories,
  getDictants,
  addDictant,
  updateState,
  deleteDictant,
  editDictant,
})(AdminDictants);
