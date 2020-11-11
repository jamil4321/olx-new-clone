import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from "react-redux";
import FireBase from './Firebase';
import Header from './components/ui/header'
import Home from './components/ui/Home';
import Footer from './components/ui/Footer';
import AdDetailView from './components/ui/AdDetailView';
import AddFilter from './components/ui/AddFilter';
import Form from './components/ui/Form'
import FormComponent from './components/ui/FormComponent';
import ChatBox from './components/ui/ChatBox'
class App extends Component {
  componentDidMount() {
    FireBase.database().ref('data').on('value', snapshot => {
      let data = snapshot.val();
      let states = [];
      Object.values(data).map(data => states.push(data.State))
      let NewStates = [...new Set(states)]
      states.filter((item, index) => states.indexOf(item) === index);
      states.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item])
      this.props.onDataLoad(data, NewStates)
    })
    FireBase.database().ref('user').on('value', snapshot => {
      let data = snapshot.val();
      this.props.onUserDataLoad(data)
    })
    FireBase.storage().ref().child('/images/').listAll().then(res => {
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
          <Route path="/AdView/:id" component={AdDetailView} />
          <Route exact path="/browser/" component={AddFilter} />
          <Route path="/browser/:id" component={AddFilter} />
          <Route path="/:id/form" component={Form} />
          <Route path="/select/category" component={FormComponent} />
          <Route exact path="/chat/">
            {!!localStorage.getItem('uid') ? <ChatBox /> : <Home />}
          </Route>
          <Route exact path="/chat/:id">
            {!!localStorage.getItem('uid') ? <ChatBox /> : <Home />}
          </Route>
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
    onDataLoad: async (data, states) => await dispatch({ type: "GETDATAFROMFIREBASE", isLoading: false, payload: data, states: states }),
    onImageLoad: async (data) => await dispatch({ type: "GETIMAGESFROMFIREBASE", payload: data }),
    onUserDataLoad: async (data) => await dispatch({ type: 'GETALLUSERS', payload: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
