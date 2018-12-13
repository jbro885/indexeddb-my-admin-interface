import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDatabaseAction, removeDatabaseAction } from '../../actions';


class Databases extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    const input = e.target['database_name'];
    const { list } = this.props.database;
    const joinNames = [...list, input.value];

    if (!list.includes(input.value)) {
      this.props.addDatabase({ list: joinNames });
      input.value = '';
    }
  }

  handleDelete(name) {
    let { list } = this.props.database;
    list = list.filter(item => (item !== name));

    this.props.removeDatabase({ list });
  }

  render() {
    const { list } = this.props.database;

    return (
      <div className="m-5">
        <div className="container">
          <h2 className="h5">Databases salved:</h2>
          <ul>
            {
              list.map((name, key) => {
                return <li key={key}><button onClick={ this.handleDelete.bind(this, name) }>X</button> <span>{name}</span></li>;
              })
            }
          </ul>
        </div>

        <div className="container">
          <h2 className="h5">Add databases:</h2>
          <form action="." onSubmit={ this.handleSubmit.bind(this) } >
            <fieldset>
              <input minLength="1" type="text" name="database_name" required/>
              <button>Add</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => (state);

const mapDispatchToProps = dispatch => ({
  addDatabase: payload => dispatch(addDatabaseAction(payload)),
  removeDatabase: payload => dispatch(removeDatabaseAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Databases);
