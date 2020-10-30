import React, { Component } from 'react';
import './App.css';
import Header from './components/ui/header'
import Home from './components/ui/Home';
import Footer from './components/ui/Footer';
import { BrowserRouter, Route } from 'react-router-dom';
import TemporaryData from './TemporaryData';
import { connect } from "react-redux";
import { database, storage } from 'firebase';
import AdDetailView from './components/ui/AdDetailView';
import AddFilter from './components/ui/AddFilter';

class App extends Component {
  componentDidMount() {
    database().ref('data').on('value', snapshot => {
      let data = snapshot.val();
      this.props.onDataLoad(data)
    })
    storage().ref().child('/images/').listAll().then(res => {
      let imagData = [];
      res.prefixes.forEach(folderRef => {
        let folderName = folderRef.name;
        let images = []
        folderRef.listAll().then(url => {
          url.items.forEach(async imgRef => {
            await imgRef.getDownloadURL().then(url => {
              let imgUrl = {
                name: imgRef.name,
                url: url
              }
              images.push(imgUrl)
            })
          })
        }).catch(err => { console.log(err) })
        imagData.push({ folderName: folderName, folderImages: images });
      })
      this.props.onImageLoad(imagData)
    })
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/temp" component={TemporaryData} />
          <Route path="/AdView/:id" component={AdDetailView} />
          <Route path="/browser/:id" component={AddFilter} />
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDataLoading: state.isDataLoading,
    data: state.data,
    images: state.images
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onDataLoad: async (data) => await dispatch({ type: "GETDATAFROMFIREBASE", isLoading: false, payload: data }),
    onImageLoad: async (data) => await dispatch({ type: "GETIMAGESFROMFIREBASE", payload: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
