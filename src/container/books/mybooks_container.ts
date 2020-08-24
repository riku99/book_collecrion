import { connect } from "react-redux";
import { Dispatch } from "redux";

import MyBooks from "../../components/books/mybooks";
import { getMyBooks } from "../../actions/books_action";
import { initialState } from "../../reducer";

const mapStateToProps = (state: initialState) => ({
  mybooks: state.myBooks,
  message: state.message,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMyBooks: () => {
    dispatch(getMyBooks.get());
  },
});

export type MyBooksStateAndDispatchType = ReturnType<
  typeof mapDispatchToProps
> &
  ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(MyBooks);
