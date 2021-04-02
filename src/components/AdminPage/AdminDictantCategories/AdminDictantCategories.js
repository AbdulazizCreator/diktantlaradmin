import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import AdminLayout from "../AdminLayout/AdminLayout";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { connect } from "react-redux";
import {
  updateState,
  addDictantCategory,
  getDictantCategories,
  deleteDictantCategory,
  editDictantCategory,
} from "../../../redux/actions/dictantCategoryAction";
import { TOKEN_PATH } from "../../../tools/constants";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export class AdminBookCategories extends Component {
  componentDidMount() {
    this.props.getDictantCategories();
    localStorage.getItem(TOKEN_PATH);
  }
  render() {
    const bk = this.props.dictantCategory;
    const changeModal = () => {
      this.props.updateState({ modalOpen: !bk.modalOpen });
    };
    const changeDeleteModal = () => {
      this.props.updateState({
        deleteModalOpen: !bk.deleteModalOpen,
      });
    };
    const saveDictantCategory = (event, values) => {
      bk.selectedDictantCategory
        ? this.props.editDictantCategory(bk.selectedId, values)
        : this.props.addDictantCategory(values);
    };
    return (
      <AdminLayout>
        <div className="adminBookCategories">
          <div className="d-flex justify-content-between">
            <div>
              <h3>DIKTANT KATEGORIYALARI</h3>
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
              {bk.dictantCategories.map((item) => (
                <tr key={item.id}>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td className="comment-box">
                    <p>{item.essayCount}</p>
                  </td>
                  <td>
                    <Link
                      to={"/admin/dictantcategory/" + item.name}
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
                            selectedDictantCategory: item,
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
              onValidSubmit={saveDictantCategory}
              model={bk.selectedDictantCategory}
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
                <Button type="button" onClick={changeModal}>
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
                onClick={() => this.props.deleteDictantCategory(bk.selectedId)}
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
    dictantCategory: state.dictantCategory,
  };
};

export default connect(mapStateToProps, {
  updateState,
  addDictantCategory,
  getDictantCategories,
  deleteDictantCategory,
  editDictantCategory,
})(AdminBookCategories);
