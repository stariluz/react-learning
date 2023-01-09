'use strict';

const RCE = React.createElement;
function ButtonName(props){
  let name=props.buttonName
  if(props.isActive){
    name+=" clicked :)";
  }
  return <span>{name}</span>;
}
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }
  // Convert al the code follow code to JSX sintax
  onClickButton(){
    this.setState({
      isActive:!this.state.isActive,
    })
  }
  render() {

    return (
      <button
        id={this.props.buttonID}
        onClick={() => this.onClickButton()}
      >
        <ButtonName
          buttonName={this.props.buttonName}
          isActive={this.state.isActive}
        />
      </button>
    );
  }
}
function ButtonsContainer(props){
  return <div>
    <LikeButton
      buttonID={1}
      buttonName="Button A"
    />
    <LikeButton
      buttonID={2}
      buttonName="Button B"
    />
    <LikeButton
      buttonID={3}
      buttonName="Button C"
    />
  </div>
}

const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(<ButtonsContainer/>);

document.querySelectorAll(".button_container_js").forEach((domContainer)=>{
  const buttonID=parseInt(domContainer.dataset.button_id);
  const buttonName=domContainer.dataset.button_name;
  const root=ReactDOM.createRoot(domContainer);
  root.render(
    <LikeButton
      buttonID={buttonID}
      buttonName={buttonName}
    />
  )
})