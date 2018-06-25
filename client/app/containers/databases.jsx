import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import { getDatabases } from '../actions';

class Databases extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getDatabases());
  }

  render() {
    const { data, history } = this.props;
    const { isFetching, databases } = data;
    if (isFetching) return <p>loading...</p>;
    if (!(databases && databases.databases)) return <p>loading...</p>;
    return (
      <List>
        {
          databases.databases.map(db => (
            <ListItem
              key={db.name}
              primaryText={db.name}
              onClick={() => {
                history.push(`/${db.name}`);
              }}
            />
          ))
        }
      </List>
    );
  }
}

export default connect(state => {
  const { isFetching, databases } = state;
  return {
    data: { isFetching, databases }
  };
})(Databases);
