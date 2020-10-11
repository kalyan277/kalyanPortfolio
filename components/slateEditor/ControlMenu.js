import { Button } from "reactstrap";

const ControllMenu = (props) => {
  return (
    <div className="control-menu">
      <h1 className="title"> Write Your Story... </h1>
      <div className="status-box">
        {props.isloading ? "Saving..." : ""}
      </div>
      <Button disabled={props.isloading} onClick={props.save} color="success">
        Save
      </Button>
    </div>
  );
};

export default ControllMenu;
