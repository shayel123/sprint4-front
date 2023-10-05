import { useEffect } from "react"
import { postService } from "../services/post.service.local"
import { useSelector } from "react-redux"
import { loadPosts } from "../store/post.actions"
import dotsSvg from '/src/assets/icons/dots.svg'
import likeSvg from '/src/assets/icons/like.svg'
import commentSvg from '/src/assets/icons/comment.svg'
import sendSvg from '/src/assets/icons/share.svg'
import saveSvg from '/src/assets/icons/save.svg'
export function PostList({posts}) {
    console.log('1', posts)
    useEffect(() => {
        loadPosts()
    }, [])


    return (
        <>
            {posts.map(post => <PostPreview key={post._id} post={post} />)}
        </>
    )
}

function PostPreview({ post }) {
    return (
        <article className="post-preview">
            <PostPreviewHeader post={post} />
            <PostImage image={post.imgUrl} />
            <PostActions />
            <PostStats post={post} />
            <InputComment />
            <hr />
        </article>
    )
}

function PostPreviewHeader({ post }) {
    return (
        <div className="post-preview-header">
            <div>
                <img src={post.by.imgUrl} alt="profile" />
                <strong className="userName-preview">{post.by.fullname}</strong>
            </div>
            <img src={dotsSvg} alt="" />
        </div>
    )
}
function PostImage({ image }) {
    console.log(image)
    return (
        <div className="post-image-container">
            <img className="post-image" src={image} alt="profile" />
        </div>
    )
}
function PostActions() {
    return (

        <div className="actions-container">
            <div className="like-comment-send">
                <img src={likeSvg} alt="" />
                <img src={commentSvg} alt="" />
                <img src={sendSvg} alt="" />
            </div>
            <img src={saveSvg} alt="" />

        </div>
    )
}
function PostStats({post}){
    return (
        <>
        <p className="likes-stats">{post.likedBy.length} likes</p>
        <p className="name-stats"><strong className="name-color" > {post.by.fullname} </strong>{post.txt}</p>
        {post.comments?<p className="comments-stats">View all {post.comments.length} comments</p>:null}
        </>
    )
}
function InputComment(){
    return(
        // <h1>dfs</h1>
        <input className="comment-input" type="text" placeholder="Add a comment..." />
    )
}