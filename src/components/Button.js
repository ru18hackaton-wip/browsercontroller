import React, { Component } from 'react'

/*
 * Button component. 
 * Props onHold & onDoubleHold require a function that returns an interval
 */
class Button extends Component {
  state = {
    classNames: ['button'],
    onHold: false,
    onDoubleHold: false,
  }

  async wait(ms) {
    await new Promise(resolve => setTimeout(resolve, ms))
  }

  addClass(name) {
    this.setState({
      classNames: [...this.state.classNames, name],
    })
  }

  removeClass(name) {
    const removed = this.state.classNames.filter(cn => cn !== name)
    this.setState({
      classNames: removed,
    })
  }

  accelerate() {

  }

/*   onTap = async () => {
    if (this.state.onHold || this.state.onDoubleHold) {
      return false
    }

    this.addClass('tapped')
    await this.wait(100)

    this.removeClass('tapped')
    const removed = this.state.classNames.filter(cn => cn !== 'tapped')
    this.setState({
      classNames: removed,
    })
  } */

  onHold = () => {
    const { holdInterval } = this.props

    console.log('started hold')
    this.setState({
      onHold: holdInterval ? holdInterval() : true
    })
    this.addClass('hold')
  }

  onHoldExit = async () => {
    const { onHold } = this.state

    console.log('exiting hold', onHold)
    if (typeof onHold === 'number') {
      clearInterval(onHold)
    }

    this.removeClass('hold')

    await new Promise(resolve => {
      this.setState({
        onHold: false,
      }, resolve)
    })
  }

  onDoubleHold = () => {
    const { doubleHoldInterval } = this.props

    this.setState({
      onDoubleHold: doubleHoldInterval ? doubleHoldInterval() : true
    })

    console.log('started double hold')
    console.log(this.state)
    this.onHoldExit() // Force exit from single hold
    console.log(this.state)
    this.addClass('double-hold')
  }

  onDoubleHoldExit = async () => {
    const { onDoubleHold } = this.state

    if (typeof onDoubleHold === 'number') {
      clearInterval(onDoubleHold)
    }

    console.log('exiting double hold')
    this.removeClass('double-hold')

    await new Promise(resolve => {
      this.setState({
        onDoubleHold: false,
      }, resolve)
    })
  }

  componentDidMount() {
    const getTrueTouches = (touches) => Array.from(touches)
      .filter(touch => touch.target === this.element)


    this.element.addEventListener('touchstart', (e) => {
      if (getTrueTouches(e.touches).length > 1) {
        this.onDoubleHold()
      } else if (getTrueTouches(e.touches).length === 1) {
        this.onHold()
      } else {
        // this.onTap()
      }
    }) 

    this.element.addEventListener('touchend', (e) => {
      if (getTrueTouches(e.touches).length === 1) {
        this.onDoubleHoldExit()
      } else if (getTrueTouches(e.touches).length === 0) {
        this.onHoldExit()
      }
    })
  }

  render() {
    const { children, className, holdInterval, doubleHoldInterval, ...props } = this.props
    const { classNames } = this.state

    return (
      <button 
        className={`${className} ${classNames.join(' ')}`} 
        ref={n => { this.element = n }}
        {...props}
      >
        {children}
      </button>
    )
  }
}

export default Button