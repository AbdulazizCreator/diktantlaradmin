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
import "./AdminGuide.scss";
import { connect } from "react-redux";
import { getGuideCategories } from "../../../redux/actions/guideCategoryAction";
import {
  saveFile,
  addGuide,
  updateState,
  getGuides,
  deleteGuide,
  editGuide,
} from "../../../redux/actions/guideAction.js";
import ReactPaginate from "react-paginate";
import { MdEdit, MdDelete } from "react-icons/md";
import AudioList from "./AudioList";
import CreatorList from "./CreatorList";
import TextItem from "./TextItem";

class AdminGuide extends Component {
  componentDidMount() {
    this.props.getGuides(0, 6);
    this.props.getGuideCategories();
  }
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
      audioList: [<AudioList num={0} />],
      creatorList: [<CreatorList num={0} />],
      textList: [<TextItem num={0} />],
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
      this.props.saveFile(info.file.originFileObj, "image");
    };
    const submitFile = (info) => {
      this.props.saveFile(info.file.originFileObj, "file");
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
          })
        : this.props.addGuide({
            ...values,
            imageUrl: g.guideImage.downloadUrl,
            downloadUrl: g.guideFile.downloadUrl,
            imageId: g.guideImage.id,
            pdfId: g.guideFile.id,
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
          <div className="d-flex justify-content-between">
            <div>
              <h3>KUTUBXONA</h3>
            </div>
            <div>
              <Button
                color="success"
                onClick={() => {
                  this.props.updateState({ selectedGuide: null });
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
                <th>Rasm</th>
                <th>Nomi</th>
                <th>Kategoriya</th>
                <th>Haqida</th>
                <th>Kommentariyalar</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {g.guides ? (
                g.guides.content.map((item) => (
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
                  <AvFeedback>To'ldirilmagan</AvFeedback>
                </AvGroup>
                <div className="audio-box">
                  <div className="label-box">
                    <Label htmlFor="term1">Audiolar ro'yxati</Label>
                    <span
                      onClick={() => {
                        this.setState({
                          counterAudio: this.state.counterAudio + 1,
                        });
                        const audioList = this.state.audioList;
                        audioList.splice(
                          0,
                          0,
                          <AudioList num={this.state.counterAuido} />
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
                      ? this.state.audioList.map((item, index) => (
                          <AudioList
                            num={index}
                            key={index}
                            value={g.selectedGuide.audioPayloadList[index]}
                          />
                        ))
                      : this.state.audioList.map((item, index) => (
                          <AudioList num={index} key={index} value={{}} />
                        ))}
                  </div>
                </div>
                <div className="text-box">
                  <div className="label-box">
                    <Label htmlFor="">Qo'llanma haqidagi malumotlar</Label>
                    <span
                      onClick={() => {
                        this.setState({
                          counterText: this.state.counterText + 1,
                        });
                        const textList = this.state.textList;
                        textList.splice(
                          0,
                          0,
                          <TextItem num={this.state.counterText} />
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
                      ? this.state.textList.map((item, index) => (
                          <TextItem
                            num={index}
                            key={index}
                            value={
                              g.selectedGuide.textContentPayloadList[index]
                            }
                          />
                        ))
                      : this.state.textList.map((item, index) => (
                          <TextItem num={index} key={index} value={{}} />
                        ))}
                  </div>
                </div>

                <AvField
                  required
                  type="select"
                  name="bookCategoryId"
                  label="Kategoriyani tanlang"
                >
                  {this.props.guideCategories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </AvField>
                <div className="creator-box">
                  <div className="label-box">
                    <Label htmlFor="">Yaratuvchilar ro'yxati</Label>
                    <span
                      onClick={() => {
                        this.setState({
                          counterCreator: this.state.counterCreator + 1,
                        });
                        const creatorList = this.state.creatorList;
                        creatorList.splice(
                          0,
                          0,
                          <CreatorList num={this.state.counterCreator} />
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
                      ? this.state.creatorList.map((item, index) => (
                          <CreatorList
                            num={index}
                            key={index}
                            value={g.selectedGuide.audioFiles[index]}
                          />
                        ))
                      : this.state.creatorList.map((item, index) => (
                          <CreatorList num={index} key={index} value={{}} />
                        ))}
                  </div>
                </div>
                <AvField
                  name="isFavourite"
                  type="checkbox"
                  label="IsFavourite"
                  value={g.isFavourite}
                  onChange={() =>
                    this.props.updateState({
                      isFavourite: !g.isFavourite,
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
                    this.props.updateState({ selectedGuide: null });
                    changeModal();
                  }}
                >
                  Bekor qilish
                </Button>
              </ModalFooter>
            </AvForm>
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
  getGuides,
  addGuide,
  updateState,
  deleteGuide,
  editGuide,
})(AdminGuide);
