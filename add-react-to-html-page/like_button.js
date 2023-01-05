'use strict';

const RCE = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }
  onClickButton(){
    this.setState({
      isActive:!this.state.isActive,
    })
  }
  render() {

    return RCE(
      'button',
      {
        onClick: () => {this.onClickButton()},
        id: this.props.buttonID
      },
      // this.props.buttonName,
      RCE((props)=>{
        let name=this.props.buttonName
        if(this.state.isActive){
          name+=" clicked :)";
        }
        return RCE('span',{},name);
      }),
    );
  }
}
function ButtonsContainer(props){
  return RCE(
    'div',
    {},
    RCE(LikeButton, {buttonID:1, buttonName:"Button A"}),
    RCE(LikeButton, {buttonID:2, buttonName:"Button B"}),
    RCE(LikeButton, {buttonID:3, buttonName:"Button C"})
  );
}

const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(RCE(ButtonsContainer));

document.querySelectorAll(".button_container_js").forEach((domContainer)=>{
  const buttonID=parseInt(domContainer.dataset.button_id);
  const buttonName=domContainer.dataset.button_name;
  const root=ReactDOM.createRoot(domContainer);
  root.render(
    RCE(
      LikeButton,
      {
        buttonID: buttonID,
        buttonName: buttonName
      }
    )
  )
})