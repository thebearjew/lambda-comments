import React, { Component, PropTypes } from 'react'
import { autobind } from 'core-decorators'
import Comment from './comment'
import PostCommentForm from './postCommentForm'
import { header, commentsContainer } from './comments.css'

export default class Comments extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    postComment: PropTypes.func.isRequired,
  }

  @autobind
  submit (data) {
    const {
      location: {
        pathname,
      },
      postComment,
    } = this.props
    postComment({
      url: `${window.document.location.origin}${pathname}`,
      pathname,
      ...data,
    })
  }

  render () {
    const { comments } = this.props
    return (
      <div>
        <div className={header}>{comments.length} comments</div>
        <div className={commentsContainer}>
          {comments.map(comment => {
            const { id } = comment
            return (
              <Comment key={id} comment={comment} />
            )
          })}
        </div>
        <PostCommentForm onSubmit={this.submit} />
      </div>
    )
  }

}
