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
  audioSave,
}) => {
  const [audioItem, setAudioItem] = useState(value);
  const [buttonOpen, setButtonOpen] = useState(false);

  const handleAudioItemName = (e) => {
    setAudioItem({
      audioFiles: guideAudio,
      title: e.target.value,
      categoryType: "",
      orderNumber: orderNumber,
    });
    setButtonOpen(false);
  };
  const submitAudio = (info) => {
    saveFile(info.file.originFileObj, "audio", guideAudio);
    console.log(guideAudio);
    setAudioItem({
      title: audioItem.title,
      categoryType: "",
      audioFiles: guideAudio,
      orderNumber: orderNumber,
    });
    setButtonOpen(false);
  };
  audioItem.audioFiles !== guideAudio &&
    selectedGuide === null &&
    setAudioItem({
      title: audioItem.title,
      categoryType: "",
      audioFiles: guideAudio,
      orderNumber: orderNumber,
    });
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  
  console.log(audioItem);
  console.log(Object.keys(audioItem).length);
  Object.keys(audioItem).length === 7
    ? console.log(audioItem.audioFiles)
    : console.log("");

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
            listType="picture"
            onChange={submitAudio}
            defaultFileList={
              audioItem.audioFiles !== [] && audioItem.audioFiles !== undefined
                ? audioItem.audioFiles.map((item, index) => {
                    return {
                      uid: index,
                      url: item.downloadUrl,
                      thumbUrl: item.downloadUrl,
                    };
                  })
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
            let audioList2 = audioList;
            audioList2[num] = audioItem;
            updateState({ audioList: audioList2 });
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
    audioSave: state.guides.audioSave,
  };
};

export default connect(mapStateToProps, { updateState, saveAudio, saveFile })(
  AudioList
);
