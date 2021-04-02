import React, { Component } from "react";
import AdminLayout from "../AdminLayout/AdminLayout";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { Label } from "reactstrap";
import { Upload, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvField,
} from "availity-reactstrap-validation";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./BookCategoryProducts.scss";
import { connect } from "react-redux";
import {
  saveFile,
  updateState,
  getCategoryBooks,
  deleteBook,
  editBook,
} from "../../../redux/actions/bookAction";
import { getBookCategories } from "../../../redux/actions/bookCategoryAction";
import ReactPaginate from "react-paginate";
import { MdEdit, MdDelete } from "react-icons/md";

class BookCategoryProducts extends Component {
  componentDidMount() {
    this.props.getBookCategories();
    this.props.getCategoryBooks(this.props.match.params.id, 0, 6);
  }
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
    };
  }
  render() {
    const b = this.props.books;
    const changeModal = () => {
      this.props.updateState({ modalOpen: !b.modalOpen });
    };
    const changeDeleteModal = () => {
      this.props.updateState({
        deleteModalOpen: !b.deleteModalOpen,
      });
    };
    const submitImage = (info) => {
      this.props.saveFile(info.file.originFileObj, "image");
    };
    const submitFile = (info) => {
      this.props.saveFile(info.file.originFileObj, "file");
    };
    const saveBook = (event, values) => {
      b.selectedBook
        ? this.props.editBook(b.selectedBook, {
            ...values,
            imageUrl: b.bookImage.downloadUrl,
            downloadUrl: b.bookFile.downloadUrl,
            imageId: b.bookImage.id,
            pdfId: b.bookFile.id,
            id: b.selectedBook.id,
          })
        : this.props.addBook({
            ...values,
            imageUrl: b.bookImage.downloadUrl,
            downloadUrl: b.bookFile.downloadUrl,
            imageId: b.bookImage.id,
            pdfId: b.bookFile.id,
          });
    };
    const dummyRequest = ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    };
    const changePage = ({ selected }) => {
      this.setState({ pageNumber: selected });
      this.props.getCategoryBooks(this.props.match.params.id, selected, 6);
    };
    const pageCount = b.categoryBooks ? b.categoryBooks.totalPages : 0;
    return (
      <AdminLayout>
        <div className="bookCategoryProducts">
          <table className="table table-striped table-hover mt-3">
            <thead>
              <tr>
                <th>Rasm</th>
                <th>Nomi</th>
                <th>Kategoriya</th>
                <th>Haqida</th>
                <th>Kommentariyalar</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {b.categoryBooks ? (
                b.categoryBooks.content.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {b.isLoading ? (
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
                      <p>
                        <Link
                          to="/admin/library/one"
                          type="button"
                          className="btn btn-primary"
                        >
                          Kommentariyalar{" "}
                          <span className="badge badge-light">4</span>
                        </Link>
                      </p>
                    </td>
                    <td>
                      <div className="action">
                        <button
                          type="button"
                          className="btn btn-primary mr-2"
                          onClick={() => {
                            this.props.updateState({
                              selectedBook: item,
                              selectedId: item.id,
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
                            this.props.updateState({ selectedBook: item });
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
            b.categoryBooks
              ? b.categoryBooks.totalElements <= b.categoryBooks.size
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

          <Modal isOpen={b.modalOpen}>
            <ModalBody>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="large"
              >
                <Upload
                  customRequest={dummyRequest}
                  required={true}
                  action=""
                  listType="picture"
                  accept=".doc,.docx,.pdf"
                  maxCount={1}
                  onChange={submitFile}
                  defaultFileList={
                    b.selectedBook
                      ? [
                          {
                            url: b.selectedBook.downloadUrl,
                            thumbUrl: b.selectedBook.downloadUrl,
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
                  action=""
                  required={true}
                  listType="picture"
                  onChange={submitImage}
                  defaultFileList={
                    b.selectedBook
                      ? [
                          {
                            url: b.selectedBook.imageUrl,
                            thumbUrl: b.selectedBook.imageUrl,
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
            <AvForm onValidSubmit={saveBook} model={b.selectedBook}>
              <ModalBody>
                <AvGroup>
                  <Label htmlFor="bookName">Kitob nomini kiriting</Label>
                  <AvInput name="title" id="bookName" required />
                  <AvFeedback>To'ldirilmagan</AvFeedback>
                </AvGroup>
                <Label htmlFor="bookInform">
                  Mavzuga oid malumotlarni kiriting
                </Label>
                <AvGroup>
                  <AvInput
                    type="textarea"
                    name="description"
                    id="bookInform"
                    required
                  />
                  <AvFeedback>To'ldirilmagan</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <Label htmlFor="bookInform">Kitob haqida qisqacha</Label>
                  <AvInput
                    type="textarea"
                    name="content1"
                    id="bookInform"
                    required
                  />
                  <AvFeedback>To'ldirilmagan</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <Label htmlFor="bookInform">Kitob haqida batafsil</Label>
                  <AvInput
                    type="textarea"
                    name="content2"
                    id="bookInform"
                    required
                  />
                  <AvFeedback>To'ldirilmagan</AvFeedback>
                </AvGroup>
                <AvField
                  required
                  type="select"
                  name="bookCategoryId"
                  label="Kategoriyani tanlang"
                >
                  {this.props.bookCategories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </AvField>
                <AvField
                  name="isFavourite"
                  type="checkbox"
                  label="IsFavourite"
                  value={b.isFavourite}
                  onChange={() =>
                    this.props.updateState({
                      isFavourite: !b.isFavourite,
                    })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="success">
                  Saqlash
                </Button>
                <Button type="button" onClick={changeModal}>
                  Bekor qilish
                </Button>
              </ModalFooter>
            </AvForm>
          </Modal>
          <Modal isOpen={b.deleteModalOpen}>
            <ModalBody>
              <h5>Rostan ham o'chirmoqchisiz ?</h5>
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  this.props.deleteBook(b.selectedBook);
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
    books: state.books,
    bookCategories: state.bookCategory.bookCategories,
  };
};

export default connect(mapStateToProps, {
  getBookCategories,
  getCategoryBooks,
  saveFile,
  updateState,
  deleteBook,
  editBook,
})(BookCategoryProducts);
