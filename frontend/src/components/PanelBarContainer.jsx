import React from 'react';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { classNames } from '@progress/kendo-react-common';
class CustomPanelBarItem extends React.Component {
    handleItemSelect = () => {
        this.props.onClick.call(undefined, { target: this });
    }
    render() {
        const className = classNames('contact', {
            'k-state-selected': this.props.selected === this.props.uniquePrivateKey
        });

        return (
            <div className={className} id={this.props.id} onClick={this.handleItemSelect}>
                <span className="contact">
                    <h5>{this.props.contact}</h5>
                </span>
            </div>
        )
    }
}
export default class PanelBarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: '.0.0'
        }
    }
    handleItemSelect = (event) => {
        if (event.target.props.uniquePrivateKey.length > 2) {
            this.setState({ selected: event.target.props.uniquePrivateKey });
            this.props.changeData(event.target.props.contact)
        }
    }

    render() {
        return (
            <PanelBar expandMode="single" onSelect={this.handleItemSelect} selected={this.state.selected}>
                <PanelBarItem expanded={true} title="contact">
                    <CustomPanelBarItem
                        onClick={this.handleItemSelect}
                        selected={this.state.selected}
                        contact="admin@gmail.com"
                        id="leo"
                        uniquePrivateKey='.0.0' />
                    <CustomPanelBarItem
                        onClick={this.handleItemSelect}
                        selected={this.state.selected}
                        contact="scolarite@gmail.com"
                        id="nancyg"
                        uniquePrivateKey='.0.1' />
                    <CustomPanelBarItem
                        onClick={this.handleItemSelect}
                        selected={this.state.selected}
                        contact="responsablemajeur@gmail.com"
                        id="robert"
                        uniquePrivateKey='.0.2' />
                </PanelBarItem>
            </PanelBar>
        );
    }
}