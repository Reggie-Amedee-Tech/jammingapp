import React from 'react';
import './Track.css'

class Track extends React.Component {

    renderAction () {
        // this.props.isRemoval === true ? <button className='Track-action'> - </button> : <button className="Track-action"> + </button>
        if (this.props.isRemoval) {
            return <button className='Track-action'>-</button>
        } else {
            return <button className='Track-action'>+</button>
        }
    }



    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>Calico</h3>
                    <p>10-4 | ShowBoxMoney Vol. 1</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track