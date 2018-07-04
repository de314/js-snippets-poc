import album from './input/album.json'
import comment from './input/comment.json'
import photo from './input/photo.json'
import post from './input/post.json'
import todo from './input/todo.json'
import user from './input/user.json'

const s = o => JSON.stringify(o, null, 2)

export default {
  input: {
    album: s(album),
    comment: s(comment),
    photo: s(photo),
    post: s(post),
    todo: s(todo),
    user: s(user),
  },
}
