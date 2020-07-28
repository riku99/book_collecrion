import { connect } from "react-redux";
import { Dispatch } from "redux";

import { getBooks } from "../actions/books_action";
import { initialState } from "../reducer";
import Books from "../components/books";

const mapStateToProps = (state: initialState) => {
  return {
    serchedBooks: state.serchedBooks,
    message: state.message,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getBooks: (keyword: string) => dispatch(getBooks.get(keyword)),
});

export type BooksPropsType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Books);
