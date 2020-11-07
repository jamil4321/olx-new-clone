import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class FormComponent extends Component {
    state = {
        showSubcat: false,
        subCatId: '',
    }
    onDivClicked = (data) => {
        this.setState({ showSubcat: true, subCatId: data })
    }
    render() {
        console.log(this.props.history)
        return (
            <div className="formComponent flex">
                <div className="category">
                    {this.props.catorgery.map((data, i) => <div className="cat-name" onClick={() => this.onDivClicked(i)}><p><i className={this.props.catIcon[i]}></i> {data}</p></div>)}
                </div>
                <div className="subcat">
                    {this.state.showSubcat ? Object.values(this.props.subCat)[this.state.subCatId].map(data => <Link to={`/${data}/form/`}><p>{data}</p></Link>) : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    catorgery: state.catorgery,
    catIcon: state.catIcon,
    subCat: state.subCat

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent)
