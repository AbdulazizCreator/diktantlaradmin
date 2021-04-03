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
  const [buttonOpen, setButtonOpen] = useState(false);

  const [textItem, setTextItem] = useState(value);
  const saveText = (e) => {
    setTextItem({
      ...textItem,
      [e.target.name]: e.target.value,
      orderNumber: orderNumber,
    });
    setButtonOpen(false);
  };

  return (
    <div className="textItem">
      <div className="form-group">
        <Label for="title">Mavzuni nomi</Label>
        <input
          className="form-control"
          onChange={saveText}
          value={textItem.title}
          name="title"
          id="title"
          required
        />
      </div>
      <div className="form-group" xs="12">
        <textarea
          className="form-control"
          type="textarea"
          onChange={saveText}
          name="content"
          value={textItem.content}
          label="Malumotlarni kiriting"
          required
        />
      </div>
      <div className="button-box">
        <Button
          disabled={buttonOpen}
          onClick={() => {
            updateState({ textList: [...textList, textItem] });
            setButtonOpen(true);
          }}
          type="button"
          className="btn-success"
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
    textList: state.guides.textList,
    orderNumber: state.guides.orderNumber,
  };
};

export default connect(mapStateToProps, { updateState })(TextItem);
