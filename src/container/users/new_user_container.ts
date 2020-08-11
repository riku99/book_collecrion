import { connect } from "react-redux";
import { Dispatch } from "redux";

import NewUser from "../../components/users/new_user";
import { newUser } from "../../actions/users_action";
import { changeRedirectState } from "../../actions/redirect_action";
import { initialState } from "../../reducer";

const mapStateToProps = (state: initialState) => ({
  message: state.message,
  redirectToNewPage: state.redirectToNewPage,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  newUser: (
    username: string,
    password: string,
    password_confirmation: string
  ) => dispatch(newUser.new(username, password, password_confirmation)),
  changeRedirectState: () => dispatch(changeRedirectState.toFalse()),
});

export type stateType = ReturnType<typeof mapStateToProps>;

export type dispatchType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
