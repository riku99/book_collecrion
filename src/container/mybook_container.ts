import { connect } from "react-redux";
import { Dispatch } from "redux";

import MyBook from "../components/mybook";
import { getMyBook } from "../actions/books_action";
import { initialState } from "../reducer";

const mapStateToProps = (state: initialState) => ({
  mybook: state.myBook,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMyBook: (id: number) => dispatch(getMyBook.get(id)),
});

export type MyBookStateAndDispatchType = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(MyBook);
