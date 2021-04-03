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

const TextItem = ({
  num,
  updateState,
  value,
  selectedGuide,
  textList,
  orderNumber,
}) => {
  const [textItem, setTextItem] = useState(value);
  const saveText = (e) => {
    setTextItem({
      ...textItem,
      [e.target.name]: e.target.value,
      orderNumber: orderNumber,
    });
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
          name="content"
          label="Malumotlarni kiriting"
          required
        />
      </AvGroup>
      <div className="button-box">
        <Button
          onClick={() => updateState({ textList: [...textList, textItem] })}
          type="button"
          className="btn-success"
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
    textList: state.guides.textList,
    orderNumber: state.guides.orderNumber,
  };
};

export default connect(mapStateToProps, { updateState })(TextItem);
