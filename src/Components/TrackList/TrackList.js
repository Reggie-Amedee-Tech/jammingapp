import React from 'react';
import './TrackList.css'

class TrackList extends React.Component {

    render() {
        return (
            <div className="Track">
  <div className="Track-information">
    <h3>Calico</h3>
    <p>10-4 | ShoeboxMoney Vol 1</p>
  </div>
  <button className="Track-action"></button>
</div>
        )
    }
}

export default TrackList