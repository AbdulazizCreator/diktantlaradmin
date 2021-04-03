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
import "./AdminDictants.scss";
import { Label } from "reactstrap";
import { Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  saveFile,
  addDictant,
  updateState,
  getDictants,
  deleteDictant,
  editDictant,
} from "../../../redux/actions/dictantAction";
import { getDictantCategories } from "../../../redux/actions/dictantCategoryAction";
import Term from "./Term";
import { MdEdit, MdDelete } from "react-icons/md";
import ReactPaginate from "react-paginate";

class AdminDictants extends Component {
  componentDidMount() {
    this.props.getDictantCategories();
    this.props.getDictants(0, 6);
    this.setState({
      chorak1: this.props.dictants.selectedDictant
        ? this.props.dictants.selectedDictant.term1.map((item, index) => (
            <Term termNum={1} num={index} value={item} />
          ))
        : [<Term termNum={1} num={1} value={{}} />],
      chorak2: this.props.dictants.selectedDictant
        ? this.props.dictants.selectedDictant.term2.map((item, index) => (
            <Term termNum={2} num={index} value={item} />
          ))
        : [<Term termNum={2} num={1} value={{}} />],
      chorak3: this.props.dictants.selectedDictant
        ? this.props.dictants.selectedDictant.term3.map((item, index) => (
            <Term termNum={3} num={index} value={item} />
          ))
        : [<Term termNum={3} num={1} value={{}} />],
      chorak4: this.props.dictants.selectedDictant
        ? this.props.dictants.selectedDictant.term4.map((item, index) => (
            <Term termNum={4} num={index} value={item} />
          ))
        : [<Term termNum={4} num={1} value={{}} />],
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      chorak1: [<Term termNum={1} num={1} value={{}} />],
      chorak2: [<Term termNum={2} num={1} value={{}} />],
      chorak3: [<Term termNum={3} num={1} value={{}} />],
      chorak4: [<Term termNum={4} num={1} value={{}} />],
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
        ? this.props.editDictant(d.selectedDictant, {
            ...values,
            imageUrl: d.dictantImage.downloadUrl || d.selectedDictant.imageUrl,
            downloadUrl:
              d.dictantFile.downloadUrl || d.selectedDictant.downloadUrl,
            imageId: d.dictantImage.id || d.selectedDictant.imageId,
            pdfId: d.dictantFile.id || d.selectedDictant.pdfId,
            id: d.selectedDictant.id,
            term1: d.term1,
            term2: d.term2,
            term3: d.term3,
            term4: d.term4,
          })
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
      this.props.getDictants(selected, 6);
    };
    const pageCount = d.dictants ? d.dictants.totalPages : 0;
    return (
      <AdminLayout>
        <div className="adminDictants ">
          <div className="menu-name d-flex justify-content-between">
            <div>
              <h3>DIKTANTLAR</h3>
            </div>
            <div>
              <Button
                color="success"
                onClick={() => {
                  this.props.updateState({
                    selectedDictant: null,
                    term1: [],
                    term2: [],
                    term3: [],
                    term4: [],
                  });
                  this.setState({
                    chorak1: [<Term termNum={1} num={1} value={{}} />],
                    chorak2: [<Term termNum={2} num={1} value={{}} />],
                    chorak3: [<Term termNum={3} num={1} value={{}} />],
                    chorak4: [<Term termNum={4} num={1} value={{}} />],
                  });
                  changeModal();
                }}
              >
                Qo'shish
              </Button>
            </div>
          </div>
          <div className="all-products">
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
                {d.dictants ? (
                  d.dictants.content.map((item) => (
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
                              this.setState({
                                chorak1: item.term1.map((item, index) => (
                                  <Term termNum={1} num={index} value={item} />
                                )),
                                chorak2: item.term2.map((item, index) => (
                                  <Term termNum={2} num={index} value={item} />
                                )),
                                chorak3: item.term3.map((item, index) => (
                                  <Term termNum={3} num={index} value={item} />
                                )),
                                chorak4: item.term4.map((item, index) => (
                                  <Term termNum={4} num={index} value={item} />
                                )),
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
          </div>
          {(d.dictants ? d.dictants.totalElements <= d.dictants.size : true) ? (
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
                <AvGroup>
                  <Label>Kategoriyani tanlang</Label>
                  <AvInput required type="select" name="essayCategoryId">
                    {this.props.dictantCategories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </AvInput>
                  <AvFeedback>Tanlanmagan</AvFeedback>
                </AvGroup>
                <hr />
                <div className="chorak">
                  <div className="label-box">
                    <span>1-chorak</span>
                    <span
                      onClick={() => {
                        this.setState({ counter1: this.state.counter1 + 1 });
                        this.setState({
                          chorak1: [
                            ...this.state.chorak1,
                            <Term
                              termNum={1}
                              num={this.state.counter1}
                              value={{}}
                            />,
                          ],
                        });
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div className="term1">
                    {d.selectedDictant
                      ? this.state.chorak1.map((item, index) => item)
                      : this.state.chorak1.map((item, index) => item)}
                  </div>
                </div>
                <hr />
                <div className="chorak">
                  <div className="label-box">
                    <span>2-chorak</span>
                    <span
                      onClick={() => {
                        this.setState({ counter2: this.state.counter2 + 1 });
                        this.setState({
                          chorak2: [
                            ...this.state.chorak2,
                            <Term
                              termNum={2}
                              num={this.state.counter2}
                              value={{}}
                            />,
                          ],
                        });
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div className="term2">
                    {d.selectedDictant
                      ? this.state.chorak2.map((item, index) => item)
                      : this.state.chorak2.map((item, index) => item)}
                  </div>
                </div>
                <hr />
                <div className="chorak">
                  <div className="label-box">
                    <span>3-chorak</span>
                    <span
                      onClick={() => {
                        this.setState({ counter3: this.state.counter3 + 1 });
                        this.setState({
                          chorak3: [
                            ...this.state.chorak3,
                            <Term
                              termNum={3}
                              num={this.state.counter3}
                              value={{}}
                            />,
                          ],
                        });
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div className="term3">
                    {d.selectedDictant
                      ? this.state.chorak3.map((item, index) => item)
                      : this.state.chorak3.map((item, index) => item)}
                  </div>
                </div>
                <hr />
                <div className="chorak">
                  <div className="label-box">
                    <span>4-chorak</span>
                    <span
                      onClick={() => {
                        this.setState({ counter4: this.state.counter4 + 1 });
                        this.setState({
                          chorak4: [
                            ...this.state.chorak4,
                            <Term
                              termNum={4}
                              num={this.state.counter4}
                              value={{}}
                            />,
                          ],
                        });
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div className="term4">
                    {d.selectedDictant
                      ? this.state.chorak4.map((item, index) => item)
                      : this.state.chorak4.map((item, index) => item)}
                  </div>
                </div>
                <hr />
                <AvField
                  name="isFavourite"
                  type="checkbox"
                  label="Sevimlimi ?"
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
                <Button
                  type="button"
                  onClick={() => {
                    this.props.updateState({ selectedDictant: null });
                    changeModal();
                  }}
                  color="danger"
                >
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
                onClick={() => {
                  this.props.updateState({ selectedDictant: null });
                  changeDeleteModal();
                }}
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
  getDictantCategories,
  getDictants,
  addDictant,
  updateState,
  deleteDictant,
  editDictant,
})(AdminDictants);
