import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getComments as getCommentsAction } from '../actions/comments'
import Comments from './comments'

@connect(
  state => ({ comments: state.comments }),
  { getComments: getCommentsAction }
)
export default class CommentsContainer extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    getComments: PropTypes.func.isRequired,
    comments: PropTypes.object,
  }

  componentDidMount () {
    const { getComments, location: { pathname } } = this.props
    getComments({ url: pathname })
  }

  render () {
    const {
      params,
      location,
      comments: {
        comments,
        loading,
        error,
      },
    } = this.props
    if (loading) {
      return (
        <div>
          Loading comments...
        </div>
      )
    }
    if (error) {
      return (
        <div>
          Error loading comments.
        </div>
      )
    }
    if (!comments) {
      return null
    }
    return (
      <Comments params={params} location={location} comments={comments} />
    )
  }

}
