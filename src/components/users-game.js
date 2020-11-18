import React, { Component } from "react";
import UsersDataServices from "../services/service-users";
import { BySearchUsername } from "./bysearch-username";
import { BySearchEmail } from "./bysearch-email";
import { Header } from "./header";
import { ListUsersGame } from "./list-usersgame";
import CreateUserGame from "./create-user-game";
import { MonitorUserGame } from "./monitor-usergame";

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
    this.searchUserGameTable = this.searchUserGameTable.bind(this);

    this.state = {
      userGame: {},
      filteredUsername: [],
      filteredEmail: [],
      usersGame: [],
      searchUserGameTable: "",
      nowUser: null,
      nowIndex: -1,
      numberOfUsersGameTable: 0,
    };
  }

  componentDidMount() {
    this.getUsersGame();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.usersGame !== this.state.usersGame) {
      console.log("TEST DID Update: ", true);

      // UsersDataServices.getAllUserGame(this.state.usersGame).then(
      //   (response) => {
      //     this.setState({ usersGame: });
      //   }
      // );
    } else {
      console.log("TEST DID Update: ", false);
    }
  }

  onChangeSearchUsername(e) {
    const searchUserGameTable = e.target.value;

    this.setState({
      searchUserGameTable: searchUserGameTable,
    });

    console.log(
      "\n",
      "users-game.js_onChangeSearchUsername: ",
      searchUserGameTable,
      "\n\n"
    );
  }

  onChangeFormUserGame = (e) => {
    let userGame = this.state.userGame;

    if (e.target.name === "username") {
      userGame.username = e.target.value;
    } else if (e.target.name === "email") {
      userGame.email = e.target.value;
    } else if (e.target.name === "password") {
      userGame.password = e.target.value;
    }

    this.setState({ userGame });

    console.log("\n", "users-game.js_onChangeFormUserGame: ", userGame, "\n\n");
  };

  createUserGame = (e) => {
    UsersDataServices.createUserGame(this.state.userGame).then((response) => {
      this.setState({
        numberOfUsersGameTable: this.state.numberOfUsersGameTable + 1,
      });
      console.log("\n", "users-game.js_createUserGame: ", response, "\n\n");
    });

    e.preventDefault();
  };

  getUsersGame() {
    UsersDataServices.getAllUserGame()
      .then((response) => {
        this.setState({
          usersGame: response.data,
          numberOfUsersGameTable: response.data.length,
        });
        console.log("\n", "users-game.js_getUsersGame: ", response, "\n\n");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //   refreshUserList() {
  //     this.getUsers();
  //     this.setState({
  //       nowUser: null,
  //       nowIndex: -1,
  //     });
  //   }

  setActiveUser(user, index) {
    this.setState({
      nowUsers: user,
      nowIndex: index,
    });

    console.log("\n", "users-game.js_setActiveUser: ", user, index);
  }

  searchUserGameTable(e) {
    UsersDataServices.searchByUsername(this.state.searchUserGameTable)
      .then((response) => {
        this.setState({
          filteredUsername: response.data,
        });
        console.log(
          "\n",
          "users-game.js_searchUsername_searchByUsername: ",
          response,
          "\n\n"
        );
      })
      .catch((e) => {
        console.log(e);
      });

    UsersDataServices.searchByEmail(this.state.searchUserGameTable)
      .then((response) => {
        this.setState({ filteredEmail: response.data });
        console.log(
          "\n",
          "users-game.js_searchUsername_searchByUsername: ",
          response,
          "\n\n"
        );
      })
      .catch((e) => {
        console.log(e);
      });

    e.preventDefault();
  }

  render() {
    const {
      userGame,
      usersGame,
      filteredUsername,
      filteredEmail,
      searchUserGameTable,
      nowUser,
      nowIndex,
    } = this.state;

    console.log(
      "\n",
      "📺 user-list.js_render: \n",
      " \n\n-userGame:",
      userGame,
      " \n\n-usersGame:",
      usersGame,
      " \n\n-filteredUsername:",
      filteredUsername,
      " \n\n-filteredEmail:",
      filteredEmail,
      " \n\n-searchUserGameTable:",
      searchUserGameTable,
      " \n\n-nowUser:",
      nowUser,
      " \n\n-nowIndex:",
      nowIndex,
      " \n\n"
    );
    return (
      <div className="dashboard">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-8 mb-4">
              <CreateUserGame
                userGame={this.state.userGame}
                onChangeFormUserGame={this.onChangeFormUserGame}
                createUserGame={this.createUserGame}
              ></CreateUserGame>
            </div>
            <div className="col-md-4">
              <MonitorUserGame
                numberOfUsersGameTable={this.state.numberOfUsersGameTable}
              ></MonitorUserGame>
              <form
                className="form-inline mt-4"
                onSubmit={this.searchUserGameTable}
              >
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control ds-input p-2"
                    placeholder="type your search.."
                    value={searchUserGameTable}
                    onChange={this.onChangeSearchUsername}
                  />
                </div>
                <div className="input-group-append">
                  <button
                    className="san-button-offset btn btn-success ml-4"
                    type="submit"
                    //   type="button"
                    //   onClick={this.searchUsername}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <ListUsersGame usersGame={this.state.usersGame}></ListUsersGame>
            <BySearchUsername
              searchUserGameTable={this.state.searchUserGameTable}
              filteredUsername={this.state.filteredUsername}
            ></BySearchUsername>
            <BySearchEmail
              searchUserGameTable={this.state.searchUserGameTable}
              filteredEmail={this.state.filteredEmail}
            ></BySearchEmail>
            {/* <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => {
                <li
                  className={
                    "list-group-item" + (index === nowIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                  key={index}
                >
                  {user.username}
                </li>;
              })}
          </ul>
        </div> */}
            {/* <div className="col-md-6">
          {nowUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Username:</strong>
                </label>
                {nowUser.username}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>
                {nowUser.email}
              </div>
              <div>
                <label>
                  <strong>Password:</strong>
                </label>
                {nowUser.password}
              </div>
            </div>
          ) : (
            ""
          )}
        </div> */}
          </div>
        </div>
      </div>
    );
  }
}