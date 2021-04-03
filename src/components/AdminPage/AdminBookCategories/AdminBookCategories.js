import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import AdminLayout from "../AdminLayout/AdminLayout";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import {
  updateState,
  addBookCategory,
  getBookCategories,
  deleteBookCategory,
  editBookCategory,
} from "../../../redux/actions/bookCategoryAction";
import { TOKEN_PATH } from "../../../tools/constants";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export class AdminBookCategories extends Component {
  componentDidMount() {
    this.props.getBookCategories();
    localStorage.getItem(TOKEN_PATH);
  }
  render() {
    const bk = this.props.bookCategory;
    const changeModal = () => {
      this.props.updateState({ modalOpen: !bk.modalOpen });
    };
    const changeDeleteModal = () => {
      this.props.updateState({
        deleteModalOpen: !bk.deleteModalOpen,
      });
    };
    const saveBookCategory = (event, values) => {
      bk.selectedBookCategory
        ? this.props.editBookCategory(bk.selectedId, values)
        : this.props.addBookCategory(values);
    };
    return (
      <AdminLayout>
        <div className="adminBookCategories ">
          <div className="menu-name d-flex justify-content-between">
            <div>
              <h3>KITOB KATEGORIYALARI</h3>
            </div>
            <div>
              <Button color="success" onClick={changeModal}>
                Qo'shish
              </Button>
            </div>
          </div>
          <table className="table table-striped table-hover mt-3">
            <thead>
              <tr>
                <th>Kategoriya nomi</th>
                <th>Kitoblar soni</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bk.bookCategories.map((item) => (
                <tr key={item.id}>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td className="comment-box">
                    <p>{item.bookCount}</p>
                  </td>
                  <td>
                    <Link
                      to={"/admin/bookcategory/" + item.name}
                      className="btn btn-info"
                    >
                      Ko'rish
                    </Link>
                  </td>
                  <td>
                    <div className="action">
                      <button
                        type="button"
                        className="btn btn-primary mr-3"
                        onClick={() => {
                          this.props.updateState({
                            selectedBookCategory: item,
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
                          this.props.updateState({
                            selectedId: item.id,
                          });
                          changeDeleteModal();
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal isOpen={bk.modalOpen}>
            <AvForm
              onValidSubmit={saveBookCategory}
              model={bk.selectedBookCategory}
            >
              <ModalBody>
                <AvField
                  name="name"
                  type="text"
                  label="Kategoriya nomi"
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="success">
                  Saqlash
                </Button>
                <Button type="button" color="danger" onClick={changeModal}>
                  Bekor qilish
                </Button>
              </ModalFooter>
            </AvForm>
          </Modal>
          <Modal isOpen={bk.deleteModalOpen} toggle={changeDeleteModal}>
            <ModalBody>
              <h5>Rostan ham o'chirmoqchisiz ?</h5>
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => this.props.deleteBookCategory(bk.selectedId)}
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
    bookCategory: state.bookCategory,
  };
};

export default connect(mapStateToProps, {
  updateState,
  addBookCategory,
  getBookCategories,
  deleteBookCategory,
  editBookCategory,
})(AdminBookCategories);
