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
// import "./GuideCategoryProducts.scss";
import { connect } from "react-redux";
import { getGuideCategories } from "../../../redux/actions/guideCategoryAction";
import {
  saveFile,
  addGuide,
  updateState,
  getCategoryGuides,
  deleteGuide,
  editGuide,
} from "../../../redux/actions/guideAction.js";
import ReactPaginate from "react-paginate";
import { MdEdit, MdDelete } from "react-icons/md";
import AudioList from "../AdminGuide/AudioList";
import CreatorList from "../AdminGuide/CreatorList";
import TextItem from "../AdminGuide/TextItem";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class GuideCategoryProducts extends Component {
  componentDidMount() {
    this.props.getCategoryGuides(this.props.match.params.id, 0, 6);
    this.props.getGuideCategories();
  }
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
      audioList: [<AudioList num={0} value={{}} />],
      creatorList: [<CreatorList num={0} value={{}} />],
      textList: [<TextItem num={0} value={{}} />],
      counterAudio: 1,
      counterCreator: 1,
      counterText: 1,
    };
  }
  render() {
    const g = this.props.guides;
    const changeModal = () => {
      this.props.updateState({ modalOpen: !g.modalOpen });
    };
    const changeDeleteModal = () => {
      this.props.updateState({
        deleteModalOpen: !g.deleteModalOpen,
      });
    };
    const submitImage = (info) => {
      this.props.saveFile(info.file.originFileObj, "image", g.guideAudio);
    };
    const submitFile = (info) => {
      this.props.saveFile(info.file.originFileObj, "file", g.guideAudio);
    };
    const saveGuide = (event, values) => {
      g.selectedGuide
        ? this.props.editGuide(g.selectedGuide, {
            ...values,
            imageUrl: g.guideImage.downloadUrl || g.selectedGuide.imageUrl,
            downloadUrl: g.guideFile.downloadUrl || g.selectedGuide.downloadUrl,
            imageId: g.guideImage.id || g.selectedGuide.imageId,
            pdfId: g.guideFile.id || g.selectedGuide.pdfId,
            id: g.selectedGuide.id,
            audioPayloadList: g.audioList,
            creatorPayloadList: g.creatorList,
            textContentPayloadList: g.textList,
          })
        : this.props.addGuide({
            ...values,
            imageUrl: g.guideImage.downloadUrl,
            downloadUrl: g.guideFile.downloadUrl,
            imageId: g.guideImage.id,
            pdfId: g.guideFile.id,
            audioPayloadList: g.audioList,
            creatorPayloadList: g.creatorList,
            textContentPayloadList: g.textList,
          });
    };
    const dummyRequest = ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    };
    const changePage = ({ selected }) => {
      this.setState({ pageNumber: selected });
      this.props.getGuides(selected, 6);
    };
    const pageCount = g.guides ? g.guides.totalPages : 0;
    return (
      <AdminLayout>
        <div className="adminGuide">
          <div className="all-products">
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
                {g.categoryGuides ? (
                  g.categoryGuides.content.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {g.isLoading ? (
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
                                selectedGuide: item,
                                selectedId: item.id,
                              });
                              changeModal();
                              this.setState({
                                audioList: item.audioPayloadList.map(
                                  (item2, index) => (
                                    <AudioList
                                      num={index}
                                      key={index}
                                      value={item2}
                                    />
                                  )
                                ),
                                textList: item.textContentPayloadList.map(
                                  (item2, index) => (
                                    <TextItem
                                      num={index}
                                      key={index}
                                      value={item2}
                                    />
                                  )
                                ),
                                creatorList: item.creatorPayloadList.map(
                                  (item2, index) => (
                                    <CreatorList
                                      num={index}
                                      key={index}
                                      value={item2}
                                    />
                                  )
                                ),
                              });
                            }}
                          >
                            <MdEdit />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              this.props.updateState({ selectedGuide: item });
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
          {(g.guides ? g.guides.totalElements <= g.guides.size : true) ? (
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

          <Modal isOpen={g.modalOpen}>
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
                    g.selectedGuide
                      ? [
                          {
                            url: g.selectedGuide.downloadUrl,
                            thumbUrl: g.selectedGuide.downloadUrl,
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
                    g.selectedGuide
                      ? [
                          {
                            url: g.selectedGuide.imageUrl,
                            thumbUrl: g.selectedGuide.imageUrl,
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
            <AvForm onValidSubmit={saveGuide} model={g.selectedGuide}>
              <ModalBody>
                <AvGroup>
                  <Label htmlFor="bookName">Qo'llanma nomini kiriting</Label>
                  <AvInput name="title" id="bookName" required />
                  <AvFeedback>To'ldirilmagan</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <Label htmlFor="description">
                    Mavzuga oid malumotlarni kiriting
                  </Label>
                  <AvInput
                    type="textarea"
                    name="description"
                    id="description"
                    required
                  />
                  <AvFeedback>To'ldirilmagan</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <Label htmlFor="about">Qo'llanma haqida</Label>
                  <AvInput type="textarea" name="about" id="about" required />
                  {/*                   <CKEditor
                    editor={ClassicEditor}
                    config={{ resize_minHeight: 500 }}
                    onReady={(editor) => {
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                    }}
                  ></CKEditor> */}
                  <AvFeedback>To'ldirilmagan</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <Label>Kategoriyani tanlang</Label>
                  <AvInput required type="select" name="courseCategoryId">
                    {this.props.guideCategories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </AvInput>
                  <AvFeedback>To'ldirilmagan</AvFeedback>
                </AvGroup>
                <AvField
                  name="isFavourite"
                  type="checkbox"
                  label="Sevimlimi ?"
                  value={g.isFavourite}
                  onChange={() =>
                    this.props.updateState({
                      isFavourite: !g.isFavourite,
                    })
                  }
                />
              </ModalBody>
              <ModalFooter
                style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
              >
                <Button type="submit" color="success">
                  Saqlash
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    this.props.updateState({ selectedGuide: null });
                    changeModal();
                  }}
                  color="danger"
                >
                  Bekor qilish
                </Button>
              </ModalFooter>
            </AvForm>
            <ModalBody style={{ marginBottom: "70px" }}>
              <hr />
              <div className="audio-box">
                <div className="label-box">
                  <span>Audiolar ro'yxati</span>
                  <span
                    onClick={() => {
                      this.props.updateState({
                        orderNumber: g.orderNumber + 1,
                      });
                      this.setState({
                        counterAudio: this.state.counterAudio + 1,
                      });
                      const audioList = this.state.audioList;
                      audioList.splice(
                        0,
                        0,
                        <AudioList num={this.state.counterAudio} value={{}} />
                      );
                      this.setState({
                        audioList: audioList,
                      });
                    }}
                  >
                    +
                  </span>
                </div>
                <div className="audioList">
                  {g.selectedGuide
                    ? this.state.audioList.map((item, index) => item)
                    : this.state.audioList.map((item, index) => item)}
                </div>
              </div>
              <hr />
              <div className="text-box">
                <div className="label-box">
                  <span>Qo'llanma haqidagi malumotlar</span>
                  <span
                    onClick={() => {
                      this.props.updateState({
                        orderNumber: g.orderNumber + 1,
                      });
                      this.setState({
                        counterText: this.state.counterText + 1,
                      });
                      const textList = this.state.textList;
                      textList.splice(
                        0,
                        0,
                        <TextItem num={this.state.counterText} value={{}} />
                      );
                      this.setState({
                        textList: textList,
                      });
                    }}
                  >
                    +
                  </span>
                </div>
                <div className="textList">
                  {g.selectedGuide
                    ? this.state.textList.map((item, index) => item)
                    : this.state.textList.map((item, index) => item)}
                </div>
              </div>
              <hr />
              <div className="creator-box">
                <div className="label-box">
                  <span>Yaratuvchilar ro'yxati</span>
                  <span
                    onClick={() => {
                      this.setState({
                        counterCreator: this.state.counterCreator + 1,
                      });
                      const creatorList = this.state.creatorList;
                      creatorList.splice(
                        0,
                        0,
                        <CreatorList
                          num={this.state.counterCreator}
                          value={{}}
                        />
                      );
                      this.setState({
                        creatorList: creatorList,
                      });
                    }}
                  >
                    +
                  </span>
                </div>
                <div className="creatorList">
                  {g.selectedGuide
                    ? this.state.creatorList.map((item, index) => item)
                    : this.state.creatorList.map((item, index) => item)}
                </div>
              </div>
              <hr />
            </ModalBody>
          </Modal>
          <Modal isOpen={g.deleteModalOpen}>
            <ModalBody>
              <h5>Rostan ham o'chirmoqchisiz ?</h5>
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => {
                  this.props.deleteGuide(g.selectedGuide);
                  changeDeleteModal();
                }}
              >
                Ha
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  this.props.updateState({ selectedGuide: null });
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
    guides: state.guides,
    guideCategories: state.guideCategory.guideCategories,
  };
};

export default connect(mapStateToProps, {
  saveFile,
  getGuideCategories,
  getCategoryGuides,
  addGuide,
  updateState,
  deleteGuide,
  editGuide,
})(GuideCategoryProducts);
