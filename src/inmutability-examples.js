
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
  }

  handleClick() {
    // This code mutates the words array in the handle click method.
    // const words = this.state.words;
    // words.push('marklar');

    // Concatenation makes a copy of the array, then there is no mutation.
    const words = [...this.state.words, 'marklar'];
    this.setState({
      words: words,
    })
  }

  render() {
    return (
      <div>
        <button onClick={()=>this.handleClick()} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}