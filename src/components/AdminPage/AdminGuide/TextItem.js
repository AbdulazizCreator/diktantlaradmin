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

const TextItem = ({ num, updateState, value, selectedGuide, textList }) => {
  const [textItem, setTextItem] = useState(value);
  const saveText = (e) => {
    setTextItem({ ...textList, [e.target.name]: e.target.value });
  };

  return (
    <AvForm>
      <AvGroup>
        <Label for="title">Mavzuni nomi</Label>
        <AvInput onChange={saveText} name="title" id="title" required />
        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <AvGroup xs="12">
        <AvField
          onChange={saveText}
          name="description"
          label="Malumotlarni kiriting"
          required
        />
      </AvGroup>
      <Button
        onClick={() => updateState({ textList: [...textList, textItem] })}
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
    textList: state.guides.textList,
  };
};

export default connect(mapStateToProps, { updateState })(TextItem);
