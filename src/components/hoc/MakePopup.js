/**
 *  Higher Order Component that creates a react portal to
 *  turn a component into a popup with draggable capability
 * 	Usage:
 * 		NewComponent = MakePopup(OrigComponent, {custom style object}, draggable boolean (default=false))
 * 		<NewComponent ...OrigComponentProps />
 **/
import React, { Component } from "react";

const MakePopup = (PopupComponent, styles = {}, draggable = false) => {
  return class PoppedComponent extends Component {
    constructor(props) {
      super(props);

      const popupStyle = {
        boxShadow: "10px 10px 6px 3px rgba(150,150,150,0.5)",
        position: draggable ? "fixed" : "absolute",
        opacity: "1",
        zIndex: "5000",
        left: "50px",
        top: "100px",
        background: "#aaa",
        ...styles
      };
      // if right positioning is part of the styles paramter,
      // have to remove the left property in popupStyle
      if (styles.right) {
        delete popupStyle.left;
      }

      this.state = {
        popupStyle,
        shiftXY: {}
      };

      // in case the wrapped component has its own drag event
      // such as individual skills, need to stop the component
      // from moving if that inner component is dragging something

      this.attrs = draggable
        ? {
            draggable: true,
            onDragOver: this.handleDragOver,
            onDragEnd: this.handleDragEnd,
            onDragStart: this.handleDragStart
          }
        : {};
    }

    handleDragStart = event => {
      // have to figure out offset from where the mouse is in the div
      let shiftX = event.clientX - event.target.getBoundingClientRect().left;
      let shiftY = event.clientY - event.target.getBoundingClientRect().top;
      this.setState({
        shiftXY: { left: shiftX, top: shiftY }
      });
    };

    handleDragEnd = event => {
      this.setState({
        popupStyle: {
          ...this.state.popupStyle,
          left: event.clientX - this.state.shiftXY.left,
          top: event.clientY - this.state.shiftXY.top
        }
      });
    };

    handleDragOver = event => {
      event.preventDefault && event.preventDefault();
      return false;
    };

    render() {
      return (
        <div
          style={this.state.popupStyle}
          className="make-popup"
          {...this.attrs}
        >
          <PopupComponent {...this.props} />
        </div>
      );
    }
  };
};

export default MakePopup;
