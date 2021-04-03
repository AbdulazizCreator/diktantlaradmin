import {
  AvFeedback,
  AvForm,
  AvGroup,
  AvInput,
} from "availity-reactstrap-validation";
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
  const [creatorItem, setCreatorItem] = useState(value);
  const saveCreator = (e) => {
    setCreatorItem({ ...creatorItem, [e.target.name]: e.target.value });
  };

  return (
    <AvForm>
      <AvGroup>
        <Label for="name">Ism Familiyasi</Label>
        <AvInput onChange={saveCreator} name="name" id="name" required />
        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <AvGroup xs="12">
        <Label>Yaratuvchi haqida </Label>
        <AvInput onChange={saveCreator} name="description" required />
        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <AvGroup xs="12">
        <Label>Ish o'rni </Label>
        <AvInput onChange={saveCreator} name="jobPosition" required />
        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <AvGroup xs="12">
        <Label>Facebook manzili </Label>
        <AvInput
          onChange={saveCreator}
          type="text"
          name="facebookUrl"
          required
        />
        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <AvGroup xs="12">
        <Label>LinkedLn manzili </Label>
        <AvInput onChange={saveCreator} name="linkedLnUrl" required />
        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <AvGroup xs="12">
        <Label>Twitter manzili </Label>
        <AvInput onChange={saveCreator} name="twitterUrl" required />
        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <AvGroup xs="12">
        <Label>Youtube manzili </Label>
        <AvInput onChange={saveCreator} name="youtubeUrl" required />
        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <div className="button-box">
        <Button
          className="btn-success"
          onClick={() =>
            updateState({ creatorList: [...creatorList, creatorItem] })
          }
          type="button"
        >
          Save
        </Button>
      </div>
    </AvForm>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedGuide: state.guides.selectedGuide,
    creatorList: state.guides.creatorList,
  };
};

export default connect(mapStateToProps, { updateState })(CreatorList);
