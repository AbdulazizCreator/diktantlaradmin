import { AvFeedback, AvGroup } from "availity-reactstrap-validation";
import { useState } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { updateState } from "../../../redux/actions/dictantAction";

const Term = ({
  termNum,
  num,
  updateState,
  value,
  term1,
  term2,
  term3,
  term4,
}) => {
  const [term, setTerm] = useState(value);
  console.log(term);
  const inputTermName = (e) => {
    setTerm({ ...term, title: e.target.value });
  };
  const inputTermAbout = (e) => {
    setTerm({ ...term, description: e.target.value });
  };

  const fun = (a) => {
    switch (a) {
      case 1:
        return { term1: [...term1, term] };
      case 2:
        return { term2: [...term2, term] };
      case 3:
        return { term3: [...term3, term] };
      case 4:
        return { term4: [...term4, term] };
      default:
        return { term1: [...term1, term] };
    }
  };

  return (
    <div className={`term${termNum}-term${num}`}>
      <AvGroup>
        <label for='title'>Mavzu nomi</label>
        <input
          value={term.title}
          className="form-control"
          type="text"
          name='title'
          id='title'
          onChange={inputTermName}
          required
        />
        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <AvGroup>
        <label for='description'>Mavzu haqida batafsil</label>
        <textarea
          value={term.description}
          className="form-control"
          name='description'
          id='description'
          onChange={inputTermAbout}
          required
        />
        <AvFeedback>To'ldirilmagan</AvFeedback>
      </AvGroup>
      <div className="button-box">
        <Button className='btn-success' onClick={() => updateState(fun(termNum))}>Save</Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDictant: state.dictants.selectedDictant,
    term1: state.dictants.term1,
    term2: state.dictants.term2,
    term3: state.dictants.term3,
    term4: state.dictants.term4,
  };
};

export default connect(mapStateToProps, { updateState })(Term);
