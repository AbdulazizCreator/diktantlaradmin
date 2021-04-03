import { useState } from "react";
import { connect } from "react-redux";
import { Button, Label } from "reactstrap";
import { updateState } from "../../../redux/actions/guideAction";

const CreatorList = ({
  num,
  updateState,
  value,
  selectedGuide,
  creatorList,
}) => {
  const [buttonOpen, setButtonOpen] = useState(false);
  const [creatorItem, setCreatorItem] = useState(value);
  const saveCreator = (e) => {
    setCreatorItem({ ...creatorItem, [e.target.name]: e.target.value });
    setButtonOpen(false);
  };

  return (
    <div className="creatorList">
      <div className="form-group">
        <Label for="name">Ism Familiyasi</Label>
        <input
          className="form-control"
          onChange={saveCreator}
          name="name"
          id="name"
          required
          value={creatorItem.name}
        />
      </div>
      <div className="form-group" xs="12">
        <Label>Yaratuvchi haqida </Label>
        <input
          className="form-control"
          onChange={saveCreator}
          name="description"
          required
          value={creatorItem.description}
        />
      </div>
      <div className="form-group" xs="12">
        <Label>Ish o'rni </Label>
        <input
          className="form-control"
          onChange={saveCreator}
          name="jobPosition"
          required
          value={creatorItem.jobPosition}
        />
      </div>
      <div className="form-group" xs="12">
        <Label>Facebook manzili </Label>
        <input
          className="form-control"
          onChange={saveCreator}
          type="text"
          name="facebookUrl"
          required
          value={creatorItem.facebookUrl}
        />
      </div>
      <div className="form-group" xs="12">
        <Label>LinkedLn manzili </Label>
        <input
          className="form-control"
          onChange={saveCreator}
          name="linkedLnUrl"
          required
          value={creatorItem.linkedLnUrl}
        />
      </div>
      <div className="form-group" xs="12">
        <Label>Twitter manzili </Label>
        <input
          className="form-control"
          onChange={saveCreator}
          name="twitterUrl"
          required
          value={creatorItem.twitterUrl}
        />
      </div>
      <div className="form-group" xs="12">
        <Label>Youtube manzili </Label>
        <input
          className="form-control"
          onChange={saveCreator}
          name="youtubeUrl"
          required
          value={creatorItem.youtubeUrl}
        />
      </div>
      <div className="button-box">
        <Button
          className="btn-success"
          disabled={buttonOpen}
          onClick={() => {
            updateState({ creatorList: [...creatorList, creatorItem] });
            setButtonOpen(true);
          }}
          type="button"
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
    creatorList: state.guides.creatorList,
  };
};

export default connect(mapStateToProps, { updateState })(CreatorList);
