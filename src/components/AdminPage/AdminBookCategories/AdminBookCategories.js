import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import AdminLayout from "../AdminLayout/AdminLayout";
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
  constructor(props) {
    super(props);
    this.state = {
      category: {
        name: "",
        keywords: [],
      },
      keywords: "",
    };
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
    const saveBookCategory = (e) => {
      e.preventDefault();
      bk.selectedBookCategory
        ? this.props.editBookCategory(bk.selectedId, this.state.category)
        : this.props.addBookCategory(this.state.category);
    };
    const handleKeywords = (e) => {
      const val = e.target.value;
      this.setState({ keywords: val });
      const keywords = val.split(" ");
      this.setState({
        category: { ...this.state.category, keywords: keywords },
      });
    };
    const handleInput = (e) => {
      this.setState({
        category: { ...this.state.category, name: e.target.value },
      });
    };
    console.log(this.state.category);
    return (
      <AdminLayout>
        <div className="adminBookCategories ">
          <div className="menu-name d-flex justify-content-between">
            <div>
              <h3>KITOB KATEGORIYALARI</h3>
            </div>
            <div>
              <Button
                color="success"
                onClick={() => {
                  this.setState({
                    category: {
                      name: "",
                      keywords: [],
                    },
                    keywords: "",
                  });
                  changeModal();
                }}
              >
                Qo'shish
              </Button>
            </div>
          </div>
          <table className="table table-striped table-hover mt-3">
            <thead>
              <tr>
                <th>Kategoriya nomi</th>
                <th>Kitoblar soni</th>
                <th>Kategoriya kalit so'zlari</th>
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
                    <p>{item.keywords.join(", ")}</p>
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
                          this.setState({
                            category: {
                              name: item.name,
                              keywords: item.keywords,
                            },
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
            <form onSubmit={saveBookCategory}>
              <ModalBody>
                <div className="form-group">
                  <label>Kategoriya nomi</label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    required
                    onChange={handleInput}
                    value={this.state.category.name}
                  />
                </div>
                <div className="form-group">
                  <label>Keywordlarni so'z shaklida kiriting</label>
                  <textarea
                    className="form-control"
                    name="keyword"
                    required
                    onChange={handleKeywords}
                    value={this.state.keywords}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" color="success">
                  Saqlash
                </Button>
                <Button type="button" color="danger" onClick={changeModal}>
                  Bekor qilish
                </Button>
              </ModalFooter>
            </form>
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
