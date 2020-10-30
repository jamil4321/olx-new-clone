import React, { Component } from 'react'
import logo from '../../asset/Logo.png'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";


class header extends Component {
    render() {
        return (
            <>
                <div className="header fixed flex aic">
                    <div className="logo">
                        <img src={logo} alt="" />
                    </div>
                    <div className="location rel flex aic">
                        <div className="fas fa-search ico s24" />
                        <input className="label s15 font" placeholder="Your Location" value="Pakistan" />
                        <button className="fas fa-chevron-down arrow s24" />
                    </div>
                    <div className="search flex aic">
                        <input className="query" placeholder="Your Location" value="Find Cars, Mobile Phones and More...." />
                        <button className="fas fa-search go s24" />
                    </div>
                    <div className="action flex aic">
                        <Link to="accuont/login" className="color fontb s15 noulh noul">Login</Link>
                        <button className="sell flex aic">
                            <div className="fas fa-plus ico s24" />
                            <h2 className="s18 font">sell</h2>
                        </button>
                    </div>
                </div>
                <div className="hnav fixed flex aic">
                    <button className="view-cates flex aic color">
                        <h2 className="s18 font">All Categories</h2>
                        <button className="fas fa-chevron-down arrow s18" />
                    </button>
                    {this.props.nav.map(item => <Link key={item.id} to={`/browser/${item.label}`} className="bl noul noulh font s15 color">{item.label}</Link>)}
                </div>
                <div className="hclr" />
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }
}
const mapDispatchToProps = dispatch => {

}
export default connect(mapStateToProps, mapDispatchToProps)(header)
