import * as React from 'react';
import * as Point from 'esri/geometry/Point';
import * as MapView from 'esri/views/MapView';

// Here is a case where maybe I want a
// specific type alias called Coordinates.
// I couldn't really use an interface for this.
type Coordinates = Point | number[] | any;

interface Props {
  view: MapView;
  initialCenter: Coordinates;
}

interface Center {
  x: number;
  y: number;
}

interface State extends Center {
  interacting: boolean;
}

interface Style {
  textShadow: string;
}

class Recenter extends React.Component<Props, State> {
  state = { x: 0, y: 0, interacting: false };
  constructor() {
    super();
    this.onCenterChange = this.onCenterChange.bind(this);
    this.defaultCenter = this.defaultCenter.bind(this);
  }
  componentDidMount() {
    this.props.view.watch('center', this.onCenterChange);
    this.props.view.watch('interacting', this.onCenterChange);
  }
  onCenterChange() {
    let {interacting, center} = this.props.view;
    this.setState({
      x: center.x,
      y: center.y,
      interacting
    });
  }
  defaultCenter() {
    this.props.view.center = this.props.initialCenter;
  }
  render() {
    let style: Style = {
      textShadow: this.state.interacting ? '-1px 0 red, 0 1px red, 1px 0 red, 0 -1px red' : ''
    };
    let { x, y } = this.state;
    return (
      <div className='recenter-tool'  style={style} onClick={this.defaultCenter}>
        <p>x: {Number(x).toFixed(3)}</p>
        <p>y: {Number(y).toFixed(3)}</p>
      </div>
    );
  }
}

export default Recenter;
