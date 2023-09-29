import React from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from '../src/HeatmapLayer';
import { addressPoints } from './realworld.10000.js';
import { kenritsuPoints } from './kenritu.1000';

const tableCellStyle ={
  border: '1px solid #000000',
  padding: '0.5em',
  textAlign: 'center',
  width: '100px',
  height: '20px',
  fontSize: '20px',
}

class MapExample extends React.Component {

  latlngs = {
    lng: 137.09784732636578,
    lat: 36.7063729906339,
  }

  state = {
    mapHidden: false,
    layerHidden: false,
    addressPoints,
    kenritsuPoints,
    radius: 4,
    blur: 8,
    max: 0.5,
    limitAddressPoints: true,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ blur: Math.random() * 100 % 80 })
      console.log(this.state.blur)
    }, 300 * 1000)
  }

  /**
   * Toggle limiting the address points to test behavior with refocusing/zooming when data points change
   */
  toggleLimitedAddressPoints() {
    if (this.state.limitAddressPoints) {
      this.setState({ addressPoints: addressPoints.slice(500, 1000), limitAddressPoints: false });
    } else {
      this.setState({ addressPoints, limitAddressPoints: true });
    }
  }

  render() {
    if (this.state.mapHidden) {
      return (
        <div>
          <input
            type="button"
            value="Toggle Map"
            onClick={() => this.setState({ mapHidden: !this.state.mapHidden })}
          />
        </div>
      );
    }

    const gradient = {
      0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
      0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
    };

    return (
      <div>
        <h1>
          食堂の混雑状況可視化アプリ
        </h1>
        <Map center={[36.7063729906339, 137.09784732636578]} zoom={13}>
          {!this.state.layerHidden &&
              <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={this.state.kenritsuPoints}
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                gradient={gradient}
                intensityExtractor={m => parseFloat(m[2])}
                // radius={Number(this.state.radius)}
                radius = {30}
                blur={Number(this.state.blur)}
                max={Number.parseFloat(this.state.max)}
              />
            }
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
        {/* 混雑度のテーブルを色・場所名・混雑度で表示 */}
        <table>
          <tr style={{backgroundColor:"rgba(0,0,0,0.2)"}}>
            <th style={tableCellStyle}>色</th>
            <th style={tableCellStyle}>混雑度</th>
          </tr>
          <tr>
            <td style={tableCellStyle}>赤</td>
            <td style={tableCellStyle}>高</td>
          </tr>
          <tr>
            <td style={tableCellStyle}>黄</td>
            <td style={tableCellStyle}>中</td>
          </tr>
          <tr>
            <td style={tableCellStyle}>青</td>
            <td style={tableCellStyle}>低</td>
          </tr>
          </table>
        {/* <input
          type="button"
          value="Toggle Map"
          onClick={() => this.setState({ mapHidden: !this.state.mapHidden })}
        /> */}
        {/* <input
          type="button"
          value="Toggle Layer"
          onClick={() => this.setState({ layerHidden: !this.state.layerHidden })}
        />
        <input
          type="button"
          value="Toggle Limited Data"
          onClick={this.toggleLimitedAddressPoints.bind(this)}
        /> */}

        {/* <div>
          Radius
          <input
            type="range"
            min={1}
            max={40}
            value={this.state.radius}
            onChange={(e) => this.setState({ radius: e.currentTarget.value })}
          /> {this.state.radius}
        </div> */}
{/* 
        <div>
          Blur
          <input
            type="range"
            min={1}
            max={20}
            value={this.state.blur}
            onChange={(e) => this.setState({ blur: e.currentTarget.value })}
          /> {this.state.blur}
        </div> */}
{/* 
        <div>
          Max
          <input
            type="range"
            min={0.1}
            max={3}
            step={0.1}
            value={this.state.max}
            onChange={(e) => this.setState({ max: e.currentTarget.value })}
          /> {this.state.max}
        </div> */}
      </div>
    );
  }



}

render(<MapExample />, document.getElementById('app'));
