import { connect } from "react-redux";
import { Dispatch } from "redux";

import Login from "../../components/sessions/login";
import { login } from "../../actions/sessions_action";
import { changeRedirectState } from "../../actions/redirect_action";
import { initialState } from "../../reducer";

const mapStateToProps = (state: initialState) => ({
  message: state.message,
  redirectToNewPage: state.redirectToNewPage,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (
    username: string,
    password: string,
    password_confirmation: string
  ) => {
    dispatch(login.create(username, password, password_confirmation));
  },
  changeRedirectState: () => {
    dispatch(changeRedirectState.toFalse());
  },
});

export type stateType = ReturnType<typeof mapStateToProps>;
export type dispatchType = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
