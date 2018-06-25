import React from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { getDocs } from '../actions';

class Docs extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    const { d, c } = params;
    dispatch(getDocs(d, c));
  }

  render() {
    const { data } = this.props;
    const { isFetching, docs } = data;
    if (isFetching) return <p>loading...</p>;
    if (!(docs && docs.length)) return <p>无数据</p>;
    return (
      <div>
        {
          docs.map(doc => (
            <Card key={doc._id} style={{ marginBottom: '20px' }} initiallyExpanded={true}>
              <CardHeader title={doc._id} actAsExpander={true} showExpandableButton={true} />
              <CardText expandable={true}>
                <pre>{JSON.stringify(doc, null, 2)}</pre>
              </CardText>
            </Card>
          ))
        }
      </div>
    );
  }
}

export default connect(state => {
  const { isFetching, docs } = state;
  return {
    data: { isFetching, docs }
  };
})(Docs);
