import { Space, Upload } from "antd";
import { AvFeedback, AvGroup } from "availity-reactstrap-validation";
import { useState } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { updateState } from "../../../redux/actions/guideAction";
import { UploadOutlined } from "@ant-design/icons";

const AudioList = ({ num, updateState, value, selectedGuide, audioList }) => {
  const [audioItem, setAudioItem] = useState(value);
  const handleAudioItemName = (e) => {
    setAudioItem({ ...audioItem, title: e.target.value });
  };
  const submitAudio = (info) => {
    setAudioItem({ ...audioItem, audioFiles: info.fileList });
    console.log(info);
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  console.log(audioItem);
  return (
    <div className="audioItem">
      <AvGroup>
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
        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <AvGroup>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Upload
            customRequest={dummyRequest}
            required={true}
            ItemType="picture"
            onChange={submitAudio}
            defaultFileList={
              selectedGuide
                ? [
                    selectedGuide.audioPayloadList[num].audioFiles.map(
                      (item) => ({
                        url: item.downloadUrl,
                        thumbUrl: item.downloadUrl,
                      })
                    ),
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

        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <div className="button-box">
        <Button
          onClick={() => updateState({ audioList: [...audioList, audioItem] })}
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
  };
};

export default connect(mapStateToProps, { updateState })(AudioList);
