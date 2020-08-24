import { connect } from "react-redux";
import { Dispatch } from "redux";

import { getBooks, registerBooks } from "../../actions/books_action";
import { initialState } from "../../reducer";
import Books from "../../components/books/books";

const mapStateToProps = (state: initialState) => {
  return {
    serchedBooks: state.serchedBooks,
    message: state.message,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getBooks: (keyword: string) => dispatch(getBooks.get(keyword)),
    registerBooks: (
      title: string,
      authors: string[] | null,
      image: string | null,
      memo: string
    ) =>
      dispatch(
        registerBooks.register({
          title: title,
          authors: authors,
          image: image,
          memo: memo,
        })
      ),
  };
};

export type BooksPropsType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Books);
