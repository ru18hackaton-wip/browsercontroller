import React, { Component } from 'react'
// import Slider from './components/Slider'
import Slider from 'rc-slider'
import Button from './components/Button'

import 'rc-slider/assets/index.css'
import './App.scss'

const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  FORWARD: 'forward',
  BACKWARD: 'backward',
}

class App extends Component {
  state = {
    speed: 0,
    grabber: 0,
    touches: 0,
    direction: DIRECTIONS.FORWARD,
  }

  setState(...params) {
    console.log('setState', ...params)
    return super.setState(...params)
  }

  accelerate = (multiplier = 1, direction) => {
    console.log('accelerating', multiplier)
    const { speed } = this.state
    const combiner = (a, b) => direction === DIRECTIONS.BACKWARD
      ? a - b
      : a + b
    const x = speed === 0 
      ? direction === DIRECTIONS.BACKWARD ? -5 : 5
      : speed < 30 || speed < -10
        ? combiner(speed, 1)
        : combiner(speed, 2)
    const newSpeed = x * multiplier
    const maxSpeed = 100
    const minSpeed = -100

    

    this.setState({
      direction,
      speed: newSpeed <= maxSpeed && newSpeed >= minSpeed
        ? newSpeed
        : newSpeed > maxSpeed 
          ? maxSpeed 
          : newSpeed < minSpeed
            ? minSpeed
            : new Error('What?')
    })
  }

  decelerate = () => {
    const { speed, touches } = this.state

    if (touches) {
      return false
    }

    if (speed > 0) {
      this.setState({
        speed: Math.round(speed < 30 ? speed - 1 : speed - 2)
      })
    } else if (speed < 0) {
      this.setState({
        speed: Math.round(speed + 5)
      })
    }
  }
 
  componentDidMount() {
    window.addEventListener('touchstart', (e) => {
      this.setState({ touches: e.touches.length })
    })

    window.addEventListener('touchend', (e) => {
      this.setState({
        touches: this.state.touches - 1,
      })
    })

    setInterval(() => {
      this.decelerate()
    }, 100)
  }

  render() {
    const { grabber, speed, direction } = this.state
    return (
      <div className="App">
        <div className="meters">
          <h3>The Hand</h3>
          <Slider 
            min={0}
            max={100}
            value={grabber}
            marks={{
              0: 'Disengaged',
              100: 'Fully engaged'
            }}
            onChange={(value) => this.setState({ grabber: value })} />

            <h3>Speed</h3>
            <Slider 
              min={-100}
              max={100}
              value={speed}
              marks={{
                '-100': 'Htaed',
                '-20': 'wolS',
                '-50': 'tsaF',
                0: 'Stop',
                20: 'Slow',
                50: 'Fast',
                100: 'Death'
              }}
              onChange={(value) => this.setState({ speed: value })} />

              <h3>
                Direction
              </h3>
              <span>{direction}</span>
        </div>

        <div className="drive">
          <div className="controls">
            <Button 
              className="left" 
              holdInterval={() => setInterval(() => this.accelerate(1, DIRECTIONS.LEFT), 100)}
              doubleHoldInterval={() => setInterval(() => this.accelerate(1.3, DIRECTIONS.LEFT), 100)}
            >
              Left
            </Button>
            <div className="control-wrapper">
              <Button 
              holdInterval={() => setInterval(() => this.accelerate(1, DIRECTIONS.FORWARD), 100)}
              doubleHoldInterval={() => setInterval(() => this.accelerate(1.3, DIRECTIONS.FORWARD), 100)}
            >
                Forward 
              </Button>
              <Button className="backwards"
                holdInterval={() => setInterval(() => this.accelerate(1, DIRECTIONS.BACKWARD), 100)}
                doubleHoldInterval={() => setInterval(() => this.accelerate(1.3, DIRECTIONS.BACKWARD), 100)}
              >

                Backwards 
              </Button>
            </div>
            <Button className="right" key="right"
              holdInterval={() => setInterval(() => this.accelerate(1, DIRECTIONS.RIGHT), 100)}
              doubleHoldInterval={() => setInterval(() => this.accelerate(1.3, DIRECTIONS.RIGHT), 100)}
            >

               Right 
            </Button>
          </div>

          <p>Fingers on screen: {this.state.touches}</p>
        </div>

      </div>
    )
  }
}

export default App
