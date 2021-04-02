import {
  AvFeedback,
  AvField,
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
        <AvFeedback>This is an error!</AvFeedback>
      </AvGroup>
      <AvGroup xs="12">
        <AvField
          onChange={saveCreator}
          name="description"
          label="description"
          required
        />
      </AvGroup>
      <AvGroup xs="12">
        <AvField
          onChange={saveCreator}
          name="jobPosition"
          label="Ish o'rni"
          required
        />
      </AvGroup>
      <AvGroup xs="12">
        <AvField
          onChange={saveCreator}
          type="text"
          name="facebookUrl"
          label="Facebook manzili"
          required
        />
      </AvGroup>
      <AvGroup xs="12">
        <AvField
          onChange={saveCreator}
          name="linkedLnUrl"
          label="LinkedLn manzili"
          required
        />
      </AvGroup>
      <AvGroup xs="12">
        <AvField
          onChange={saveCreator}
          name="twitterUrl"
          label="Twitter manzili"
          required
        />
      </AvGroup>
      <AvGroup xs="12">
        <AvField
          onChange={saveCreator}
          name="youtubeUrl"
          label="Youtube manzili"
          required
        />
      </AvGroup>
      <Button
        onClick={() =>
          updateState({ creatorList: [...creatorList, creatorItem] })
        }
        type="button"
      >
        Save
      </Button>
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
