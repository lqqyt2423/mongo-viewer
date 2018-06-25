import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { getCollections } from '../actions';

class Collections extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    const { database } = params;
    dispatch(getCollections(database));
  }

  render() {
    const { data, history, match } = this.props;
    const { params } = match;
    const { database } = params;
    const { isFetching, collections } = data;
    if (isFetching) return <p>loading...</p>;
    if (!(collections && collections.length)) return <p>loading...</p>;
    return (
      <List>
        {
          collections.map((collection, index) => (
            <ListItem
              key={index}
              primaryText={collection}
              onClick={() => {
                history.push(`/${database}/${collection}`);
              }}
            />
          ))
        }
      </List>
    );
  }
}

export default connect(state => {
  const { isFetching, collections } = state;
  return {
    data: { isFetching, collections }
  };
})(Collections);
