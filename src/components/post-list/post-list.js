/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
/* App imports */
import * as style from './post-list.module.less'
import TagList from '../tag-list'
import Utils from '../../utils'

const PostList = ({ posts, tagPagePath }) => (
  <div>
    {posts.map(post => {
      const { title, date, path, tags, cover } = post.node.frontmatter
      const { excerpt } = post.node
      return (
        <div key={title} className={style.post}>
          <div className={style.preview}>
            <Link to={Utils.resolvePageUrl(path)}><Img fixed={cover.childImageSharp.fixed} /></Link>
          </div>
          <div className={style.content}>
            <Link to={Utils.resolvePageUrl(path)}>
              <label>{date}</label>
              <h2>{title}</h2>
              <p>{excerpt}</p>
            </Link>
            <TagList tags={tags} tagPagePath={tagPagePath}/>
          </div>
        </div>
      )
    })}
  </div>
)

export default PostList;

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    node: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        cover: PropTypes.shape({
          fixed: PropTypes.object,
          fluid: PropTypes.object
        }).isRequired
      })
    })
  })),
  tagPagePath: PropTypes.string.isRequired
}