import React, { Component } from 'react'; 
import HighlightGraph from 'react-force-graph-2d';
import { connect } from 'react-redux';

import './CommitsGraph.css';
import { getActiveCommits, getSelectedCommit } from './../../store/selectors/selectors';
import * as actionCreators from './../../store/actions/index';

class CommitsGraph extends Component {

    getNodes = () => {
        return this.props.activeCommits.reverse().map((activeCommit, index) => {
            return {
                id: activeCommit.sha,
                name: index + 1
            }
        });
    }

    getLinks = () => {
        let links = [];
        this.props.activeCommits.forEach(activeCommit => {
            activeCommit.parents.forEach(parent => {
                if(this.commitParentExists(parent)) {
                    links.push( 
                    {
                        source: activeCommit.sha,
                        target: parent
                    });
                }
            });
        });
        return links;
    }

    commitParentExists = (sha) => {
        return this.props.activeCommits.filter(activeCommit => activeCommit.sha === sha).length !== 0;
    }

    render() {
        const graphData = {
            nodes: this.getNodes(),
            links: this.getLinks()
        };
        return (
            
            <div className="root-commits-graph-container">
                <HighlightGraph 
                    graphData={graphData} 
                    nodeRelSize={8} 
                    linkWidth={2} 
                    width={462} 
                    height={423} 
                    nodeLabel={(node) => node.name}
                    onNodeClick={(node) => this.props.setCommitAsSelected(node.id, this.props.selectedCommit)}
                />   
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeCommits: getActiveCommits(state),
        selectedCommit: getSelectedCommit(state)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setCommitAsSelected: (sha, selectedCommit) => {
            if(selectedCommit) {
                dispatch(actionCreators.changeCommitSelectedSatus(selectedCommit.sha));
            }
            dispatch(actionCreators.changeCommitSelectedSatus(sha));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitsGraph);