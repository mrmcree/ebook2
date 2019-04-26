//mutation 负责修改state
import * as types from "./mutation-types";
const mutations = {
  [types.CHANGE_BOOK_CHAPTERS](state, value) {
    state.book.chapters = value;

  },
  [types.CHANGE_BOOK_TITLE](state, value) {
    state.book.title = value;
  },
  [types.CHANGE_BOOK_SOURCE](state, value) {
    state.book.source = value;
  },
  [types.CHANGE_BOOK_SOURCE_CURRENT](state, value) {
    state.book.sourceCurrent = value;
  },
  [types.EMPTY_BOOK_CONTENT](state, value) {
    state.book.content = []
  },
  [types.CHANGE_BOOK_CONTENT](state, value) {
    let { content, title } = state.book
    if (content.find(item => item.title === title)) {
      let index = content.findIndex(item => item.title === title)
      content[index].content = value.content
    } else {
      content.push({
        title: value.title,
        content: value.content
      })
    }
  }
};
export default mutations;
