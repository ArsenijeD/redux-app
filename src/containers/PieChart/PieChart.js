import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect } from 'react-redux';
import ProgressBar from 'react-bootstrap/ProgressBar';

import './PieChart.css';
import { getCommitsPerActiveDevelopers } from './../../store/selectors/selectors';

class PieChart extends Component {

    render() {
        const reactApexChartConfig = { 
            options: {
                labels: this.props.activeDevelopersNames,
                chart: {
                    type: 'donut',
                    width: '100%',
                    height: '100%',
                    offsetY: 50
                },
                legend: {
                    position: 'bottom'
                },
                responsive: [{
                    breakpoint: 480
                }],
                plotOptions: {
                    pie: {
                      donut: {
                        labels: {
                          show: true,
                          name: {
                              show: true,
                          },
                          value: {
                              show: true
                          }
                        }
                      }
                    }
                }
            }
        };

        const showPieChart = Object.keys(this.props.activeDevelopersNames).length !== 0;
        let progress = null;
        let pieChart = null;

        if (showPieChart) {
            pieChart = (
                <ReactApexChart height="420" width="340" options={reactApexChartConfig.options} series={this.props.commitsPerActiveDevelopers } type="donut" />
            );
        } else {
            progress = (
                <ProgressBar className="progress-bar progress-bar-striped progress-bar-animated" now={100}>Please set developer as active...</ProgressBar>
            );
        }
        

        return (
            <div className="root-pie-chart-container">
                {progress}
                {pieChart}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // Its needed to call map on Object.values because ReactApexChart doesnt work with Array(), only with []
        activeDevelopersNames: Object.keys(getCommitsPerActiveDevelopers(state)).map(commitsPerActiveDeveloper => commitsPerActiveDeveloper),
        commitsPerActiveDevelopers: Object.values(getCommitsPerActiveDevelopers(state)).map(commitsPerActiveDeveloper => commitsPerActiveDeveloper)
    }
};

export default connect(mapStateToProps)(PieChart);