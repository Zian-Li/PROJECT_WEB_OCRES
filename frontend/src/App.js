import React, {Component} from 'react';
import './App.css';

import GridContainer from './components/GridContainer'
import PanelBarContainer from './components/PanelBarContainer'
import { DonutChartContainer }  from './components/DonutChartContainer'
import { BarChartContainer } from './components/BarChartContainer';

import { Ripple } from '@progress/kendo-react-ripple';

import '@progress/kendo-theme-material/dist/all.css'

import { donutChartData, gridData, barChartData, barChartCategories } from './data/appData';

class App extends Component {
    app;
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    state = {
      showDialog: false,
      value: "Marc kzejgfo",
      donutChartData:donutChartData,
      gridData: gridData,
      barChartData: barChartData,
      barChartCategories: barChartCategories
    }

    handleDataChange = (value) => {
      let newData = this.randomizeData(value)
      this.setState({
        ...newData
      })
    }

    getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomizeData = (value) => {
      let gridData = this.state.gridData.map(element =>{
        element.UnitPrice = this.getRandomInt(1,100)
        element.UnitsInStock = this.getRandomInt(1,100)
        element.PriceHistoru =  Array.from({length: 40}, () => Math.floor(Math.random() * 100));
        return element
      })
      let barChartData = this.state.barChartData.map(element =>{
        element.data =  this.isDayReport(value) ?[this.getRandomInt(1,10)] : [this.getRandomInt(1,10)]
        return element
      })
      let barChartCategoriesUpdated = this.isDayReport(value) ? [value] : barChartCategories
      let donutChartData = this.state.donutChartData.map(element =>{
        element.share = this.getRandomInt(1,5) / 10
        return element
      })
      return {
        donutChartData:donutChartData,
        gridData: gridData,
        barChartData: barChartData,
        barChartCategories: barChartCategoriesUpdated,
        value: value
      }

    }

    isDayReport = (value) => {
      return this.days.includes(value)
    }

    render() {
        let headerText = this.state.value.replace('Etudiant','');
        return (
          <Ripple>
            <div className="app-container" ref={(app) => this.app = app}>
                <div className="row">
                  <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <h1>Etudiant : {headerText}</h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                    <PanelBarContainer changeData={this.handleDataChange} activeItem={this.state.value}/>
                  </div>
                  <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <div className="row">
                      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        <div className="row">
                          Répartition des cours :
                        </div>
                        <div className="row">
                          <DonutChartContainer data={this.state.donutChartData}/>
                        </div>
                      </div>
                      <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                        <BarChartContainer data={this.state.barChartData} categories={this.state.barChartCategories}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        <GridContainer data={this.state.gridData}/>
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        Liste des devoirs :<br></br><br></br>
                        <table>
                          <tr>
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td>Devoir&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td>Date</td>
                          </tr>
                          <tr>
                            <td>web</td>
                            <td>projet partie 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td>30/11/2020</td>
                          </tr>
                          <tr>
                            <td>UX design</td>
                          </tr>
                          <tr>
                            <td>anglais</td>
                          </tr>
                          <tr>
                            <td>urba des SI</td>
                          </tr>
                          <tr>
                            <td>management</td>
                          </tr>
                          <tr>
                            <td>gestion</td>
                          </tr>
                        </table>
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        Vos absences et retard :<br></br><br></br>
                        <table>
                          <tr>
                            <td>numéro&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td>Heure</td>
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>25/11/2020</td>
                            <td>10h00</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>30/11/2020</td>
                            <td>14h00</td>
                          </tr>
                        </table>
                      </div>
                </div>
            </div>
          </Ripple>
        );
    }
}

export default App;
