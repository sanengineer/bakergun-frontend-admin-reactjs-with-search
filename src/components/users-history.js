import React, { Component } from "react";
import UsersDataServices from "../services/service-users";
import { BySearchScore } from "./bysearch-score";
import { BySearchComment } from "./bysearch-comment";
import { ListUsersHistory } from "./list-users-history";
import CreateUserHistory from "./create-user-history";
import { MonitorUserHistory } from "./monitor-user-history";
import Fade from "react-reveal/Fade";

export default class UsersHistoryList extends Component {
  constructor(props) {
    super(props);

    this.onChangeSearchScore = this.onChangeSearchScore.bind(this);
    this.onChangeDeleteScore = this.onChangeDeleteScore.bind(this);
    this.onChangeFormUserHistory = this.onChangeFormUserHistory.bind(this);
    this.searchUserHistoryTable = this.searchUserHistoryTable.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      userHistory: {},
      filteredScore: [],
      filteredComment: [],
      usersHistory: [],
      searchUserHistoryTable: "",
      numberOfUsersHistoryTable: 0,
      show: false,
      deleteValue: "",
    };
  }

  handleClose(e) {
    this.setState({
      show: false,
    });
  }

  handleShow(e) {
    this.setState({
      show: true,
    });
  }

  componentDidMount() {
    this.getUsersHistory();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.numberOfUsersHistoryTable !==
      this.state.numberOfUsersHistoryTable
    ) {
      //
      //Debugging
      console.log(
        "\n",
        "🧪 TEST USERS-HISTORY.JS: ",
        "\n   ✅ Conditions status of componentDidUpdate:",
        true,
        "\n   ✅ Value of prevState:",
        prevState.numberOfUsersHistoryTable,
        "\n   ✅ Value of this.state:",
        this.state.numberOfUsersHistoryTable,
        "\n   ✅ Value of prevProps:",
        prevProps,
        "\n\n"
      );

      UsersDataServices.getAllUserHistory(this.state.usersHistory).then(
        (response) => {
          this.setState({ usersHistory: response.data });
        }
      );
    } else {
      //
      //Debugging
      console.log(
        "\n",
        "🧪 TEST USERS-HISTORY.JS:",
        "\n   ✅ Conditions Status of componentDidUpdate: ",
        false,
        "\n\n"
      );
    }
  }

  onChangeSearchScore(e) {
    const searchUserHistoryTable = e.target.value;

    this.setState({
      searchUserHistoryTable: searchUserHistoryTable,
    });

    //
    //Debugging
    console.log(
      "\n",
      "users-history.js_onChangeSearchScore: ",
      searchUserHistoryTable,
      "\n\n"
    );
  }

  onChangeDeleteScore(e) {
    const deleteValue = e.target.value;

    this.setState({
      deleteValue: deleteValue,
    });

    //
    //Debugging
    console.log(
      "\n",
      "users-history.js_onChangeDeleteScore: ",
      deleteValue,
      "\n\n"
    );
  }

  onChangeFormUserHistory = (e) => {
    let userHistory = this.state.userHistory;

    if (e.target.name === "user_id") {
      userHistory.user_id = e.target.value;
    } else if (e.target.name === "score") {
      userHistory.score = e.target.value;
    } else if (e.target.name === "comment") {
      userHistory.comment = e.target.value;
    }

    this.setState({ userHistory });

    //
    //Debugging
    console.log(
      "\n",
      "users-history.js_onChangeFormUserHistory: ",
      userHistory,
      "\n\n"
    );
  };

  createUserHistory = () => {
    UsersDataServices.createUserHistory(this.state.userHistory).then(
      (response) => {
        this.setState({
          numberOfUsersHistoryTable: this.state.numberOfUsersHistoryTable + 1,
        });
        // start test line code - apakah prevState harus dideclare dulu disini??
        this.setState((prevState) => {
          return {
            numberOfUsersHistoryTable: prevState.numberOfUsersHistoryTable,
          };
        });
        // end test line code

        //
        //Debugging
        console.log(
          "\n",
          "users-history.js_createUserHistory: ",
          response,
          "\n\n"
        );
      }
    );
  };

  updateUserHistory = (userid) => {
    UsersDataServices.updateOneUserHistory(userid)
      .then((response) => {
        this.setState({
          usersHistory: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getUsersHistory() {
    UsersDataServices.getAllUserHistory()
      .then((response) => {
        this.setState({
          usersHistory: response.data,
          numberOfUsersHistoryTable: response.data.length,
        });
        //test line code start
        // this.setState((prevState) => {
        //   return {
        //     usersHistory: response.data,
        //     numberOfUsersHistoryTable:
        //       prevState.numberOfUsersHistoryTabler.data.length,
        //   };
        // });
        //test line code end

        //
        //Debuggin
        console.log(
          "\n",
          "users-history.js_getUsersHistory: ",
          response,
          "\n\n"
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchUserHistoryTable(e) {
    UsersDataServices.searchByScore(this.state.searchUserHistoryTable)
      .then((response) => {
        this.setState({
          filteredScore: response.data,
        });

        //
        //Debugging
        console.log(
          "\n",
          "users-history.js_searchScore_searchByScore: ",
          response,
          "\n\n"
        );
      })
      .catch((e) => {
        console.log(e);
      });

    UsersDataServices.searchByComment(this.state.searchUserHistoryTable)
      .then((response) => {
        this.setState({ filteredComment: response.data });

        //
        //Debugging
        console.log(
          "\n",
          "users-history.js_searchScore_searchByScore: ",
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
      userHistory,
      usersHistory,
      filteredScore,
      filteredComment,
      searchUserHistoryTable,
      show,
      numberOfUsersHistoryTable,
      deleteValue,
    } = this.state;

    console.log(
      "\n",
      "🪦 user-history.js_render: \n",
      " \n\n   ✅ userHistory:",
      userHistory,
      " \n\n   ✅ usersHistory:",
      usersHistory,
      " \n\n   ✅ filteredScore:",
      filteredScore,
      " \n\n   ✅ filteredComment:",
      filteredComment,
      " \n\n   ✅ searchUserHistoryTable:",
      searchUserHistoryTable,
      " \n\n   ✅ show:",
      show,
      " \n\n   ✅ numberOfUsersHistoryTable:",
      numberOfUsersHistoryTable,
      " \n\n   ✅ deleteValue:",
      deleteValue,
      " \n\n"
    );
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mb-4">
              <CreateUserHistory
                userHistory={userHistory}
                onChangeFormUserHistory={this.onChangeFormUserHistory}
                createUserHistory={this.createUserHistory}
              ></CreateUserHistory>
            </div>
            <div className="col-md-4">
              <MonitorUserHistory
                numberOfUsersHistoryTable={numberOfUsersHistoryTable}
              ></MonitorUserHistory>
              <form
                className="form-inline mt-4"
                onSubmit={this.searchUserHistoryTable}
              >
                <div className="col-9 p-0 input-group">
                  <input
                    type="search"
                    className="form-control ds-input p-2"
                    placeholder="type score or comment..."
                    value={searchUserHistoryTable}
                    onChange={this.onChangeSearchScore}
                  />
                </div>
                <div className="input-group-append p-0 m-0">
                  <button
                    className="san-button-offset btn btn-success ml-1"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <BySearchScore
              searchUserHistoryTable={searchUserHistoryTable}
              filteredScore={filteredScore}
            ></BySearchScore>
            <BySearchComment
              searchUserHistoryTable={searchUserHistoryTable}
              filteredComment={filteredComment}
            ></BySearchComment>
            <Fade>
              <ListUsersHistory
                deleteValue={deleteValue}
                userHistory={userHistory}
                usersHistory={usersHistory}
                onChangeDeleteScore={this.onChangeDeleteScore}
                onChangeFormUserHistory={this.onChangeFormUserHistory}
              ></ListUsersHistory>
            </Fade>
          </div>
        </div>
      </div>
    );
  }
}
