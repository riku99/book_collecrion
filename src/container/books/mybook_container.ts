import { connect } from "react-redux";
import { Dispatch } from "redux";

import MyBook from "../../components/books/mybook";
import { getMyBook, deleteMyBook } from "../../actions/books_action";
import { changeRedirectState } from "../../actions/redirect_action";
import { initialState } from "../../reducer";

const mapStateToProps = (state: initialState) => ({
  mybook: state.myBook,
  message: state.message,
  redirectToNewPage: state.redirectToNewPage,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMyBook: (id: number) => dispatch(getMyBook.get(id)),
  deleteMyBook: (id: number) => dispatch(deleteMyBook.delete(id)),
  changeRedirectState: () => dispatch(changeRedirectState.toFalse()),
});

export type MyBookStateAndDispatchType = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(MyBook);
