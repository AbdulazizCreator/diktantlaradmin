import { Space, Upload } from "antd";
import { useState } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { updateState, saveAudio } from "../../../redux/actions/guideAction";
import { UploadOutlined } from "@ant-design/icons";
import { saveFile } from "../../../redux/actions/guideAction";

const AudioList = ({
  num,
  updateState,
  saveAudio,
  value,
  guideAudio,
  selectedGuide,
  audioList,
  orderNumber,
  saveFile,
}) => {
  const [audioItem, setAudioItem] = useState(value);
  const [buttonOpen, setButtonOpen] = useState(false);

  const handleAudioItemName = (e) => {
    setAudioItem({
      ...audioItem,
      title: e.target.value,
      categoryType: "",
      orderNumber: orderNumber,
    });
    setButtonOpen(false);
  };
  const submitAudio = (info) => {
    saveFile(info.file.originFileObj, "audio", guideAudio);
    setAudioItem({
      ...audioItem,
      audioFiles: guideAudio,
      orderNumber: orderNumber,
    });
    console.log(info);
    saveAudio(info.fileList);
    setButtonOpen(false);
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  console.log(audioItem);
  return (
    <div className="audioItem">
      <div className="form-group">
        <label for="title">Mavzu nomi</label>
        <input
          className="form-control"
          value={audioItem.title}
          type="text"
          name="title"
          id="title"
          onChange={handleAudioItemName}
          required
        />
      </div>
      <div className="form-group">
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Upload
            customRequest={dummyRequest}
            required={true}
            ItemType="picture"
            onChange={submitAudio}
            defaultFileList={
              Object.keys(audioItem).length === 4
                ? [
                    audioItem.audioFiles.map((item) => ({
                      url: item.downloadUrl,
                      thumbUrl: item.downloadUrl,
                    })),
                  ]
                : []
            }
            accept=".wav, .mp3"
          >
            <Button className="my-3" icon={<UploadOutlined />}>
              Audiolarni joylang
            </Button>
          </Upload>
        </Space>
      </div>
      <div className="button-box">
        <Button
          className="btn-success"
          disabled={buttonOpen}
          onClick={() => {
            updateState({ audioList: [...audioList, audioItem] });
            setButtonOpen(true);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedGuide: state.guides.selectedGuide,
    audioList: state.guides.audioList,
    orderNumber: state.guides.orderNumber,
    guideAudio: state.guides.guideAudio,
  };
};

export default connect(mapStateToProps, { updateState, saveAudio, saveFile })(
  AudioList
);
