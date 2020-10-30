import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdItem from './ListItem';
export class AddFilter extends Component {
    render() {
        console.log(this.props.match)
        return (
            <div className="AddFilter flex">
                <div className="filterOptions">
                    <h5>Home</h5>
                    <h2>{this.props.match.params.id}</h2>
                    <h3>Filters</h3>
                    <hr />
                    <h3>CATEGORIES</h3>
                    <p>All Categories</p>
                    <hr />
                    <h3>LOCATIONS</h3>
                    <p className="bold">Pakistan</p>
                    <hr />
                    <h3>Price</h3>
                    <input type="number" name="min" id="min" />
                    <input type="number" name="max" id="max" />
                    <button>Enter</button>
                </div>
                <div className="filterData">
                    <div className="ad-list flex">
                        {
                            !this.props.isDataLoading ? Object.keys(this.props.data).map((key, i) => <AdItem key={key} placeholder={this.props.isDataLoading} data={this.props.data[key]} />) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isDataLoading: state.isDataLoading,
    data: state.data,
    images: state.images

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AddFilter)
