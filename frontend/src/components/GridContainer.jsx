import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';

export default class GridContainer extends React.Component {

    state = {
        dataState:{
            sort:[{
                field: "UnitPrice",
                dir:"asc"
            }]
        }
    }
    processData = (data) => {
        data.forEach(item => {
            item.PriceHistory = Array.from({length: 40}, () => Math.floor(Math.random() * 100));
            return item
        })
        return process(data,this.state.dataState);
    }

    handleDataStateChange = (e) => {
        this.setState({
            dataState:e.data
        })
    }

    render() {
        return (
            <div>
                <Grid
                    style={{ height: '300px' }}
                    data={this.processData(this.props.data)}
                    {...this.state.dataState}
                    onDataStateChange={this.handleDataStateChange}
                    sortable
                >
                    <Column field="ID" title="ID" sortable={false} width="40px"/>
                    <Column field="Nom" title="Matière" />
                    <Column field="Note" title="Note" />
                </Grid>
            </div>
        );
    }
}