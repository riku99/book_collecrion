import { connect } from "react-redux";
import { Dispatch } from "redux";

import Logout from "../../components/sessions/logout";
import { logout } from "../../actions/sessions_action";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => {
    dispatch(logout.do());
  },
});

export type dispatchType = ReturnType<typeof mapDispatchToProps>;

export default connect(undefined, mapDispatchToProps)(Logout);
