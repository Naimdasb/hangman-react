class Hangman extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        word: '',
        input: '',
        display: null,
        lifes: 20,
        game: false
      }
      this.onNewGame = this.onNewGame.bind(this);
      this.letterChange = this.letterChange.bind(this);
      this.onGuess = this.onGuess.bind(this);
    }
    
    getWord () {
      fetch('https://random-word-api.herokuapp.com//word?number=1')
       .then(response => response.json())
       .then( randomWord =>  this.setState({
        word: randomWord,
        display : Array(randomWord[0].length).fill("*")
      })
        
         )
       
    }
    
    letterChange (event) {
      this.setState( {
        input: event.target.value.toLowerCase()
      })
    }
    
    onNewGame () {
      this.getWord()
      this.setState({
        lifes: 8,
        game: false
      })
     
    }
    
    onGuess () {
      if (this.state.lifes === 1) {
        this.setState({
          game: true
        })
      }
      
      if (this.state.input === this.state.word[0]) {
        this.setState({
          game: true
        })
      }
      console.log(this.state.word)
      let ran = this.state.word[0];
      if (ran.search(this.state.input) !== -1) {
        let pan = [...this.state.word[0]]
        
        let s = [...this.state.display]
        
        for(let i = 0; i < pan.length; i++) {
                 
          if(pan[i] === this.state.input) {
           
            
            s[i] = this.state.input
            
            
            
          }
          
            this.setState({
              display: s
            })
          
        }
          
          
        
        
        
        
      } else {
        this.setState({
          lifes: this.state.lifes -1
        })
      }
    
    
    
    
    }
    
    componentDidMount() {
      this.getWord()
    }
    
     
    render () {
      let decision = '';
      if(this.state.game && this.state.lifes > 0) {
        decision = 'You Win! Congratulations' 
      } else if (this.state.game && this.state.lifes === 0)
      {
        decision= 'You Lose! \t ... Maybe next time?'
      }
      
      return (
        <div className='game'>
            <h1 className='header'>Hangman game</h1>
            <h2 className='final'>{decision} </h2>
             <p>Answer: {this.state.word}</p>
            <h3 className='display'>{this.state.game ? this.state.word : this.state.display}</h3>
            <p className='lifes'>Lifes: {this.state.lifes}</p>
            <p className='input'>{this.state.input === ''? 'Input a letter or the whole word!' : this.state.input}</p>
            <input className='text' type='text' value={this.state.input} onChange={this.letterChange}/>
            <div className='buttons'>
              <button className='try' disabled={this.state.game} onClick={this.onGuess}>Try</button>
              <button className='new_game' onClick={this.onNewGame}>New Game</button>
            </div>
          
          <p className='sign'>Created by Naimdasb</p>
         </div>
      )
    }
  }
  
  
  class App extends React.Component {
    render () {
      return (
        <div className='container'>
          <Hangman />
        </div>
      )
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))
  