//action 负责异步操作
import * as types from "./mutation-types";
import * as api from '../api/api'
export const switchBookSource = (
  { commit, state },
  { id }
) => {
  return new Promise((resolve, reject) => {
    api.bookhy(id).then(result => {
    commit(types.CHANGE_BOOK_SOURCE, result.data);
    
    api.bookmulu(result.data[state.book.sourceCurrent]._id).then(res => {
      console.log(res)
      commit(types.CHANGE_BOOK_CHAPTERS, res.data.chapters);
      resolve(res)
    })
  })
  })
};
