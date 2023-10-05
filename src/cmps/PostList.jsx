import dotsSvg from '/src/assets/icons/dots.svg'
import likeSvg from '/src/assets/icons/like.svg'
import commentSvg from '/src/assets/icons/comment.svg'
import sendSvg from '/src/assets/icons/share.svg'
import saveSvg from '/src/assets/icons/save.svg'


export function PostList({posts,onDeletePost}) {
    return (
        <>
            {posts.map(post => <PostPreview onDeletePost={onDeletePost}  key={post._id} post={post} />)}
        </>
    )
}

function PostPreview({ post,onDeletePost }) {
    return (
        <article className="post-preview">
            <PostPreviewHeader onDeletePost={onDeletePost} post={post} />
            <PostImage img={post.imgUrl} />
            <PostActions />
            <PostStats post={post} />
            <InputComment />
            <hr />
        </article>
    )
}

function PostPreviewHeader({ post,onDeletePost}) {
    
    return (
        <div className="post-preview-header">
            <div>
                <img src={post.by.imgUrl} alt="profile" />
                <strong className="userName-preview">{post.by.fullname}</strong>
            </div>

            <img title='Delete post' onClick={()=>onDeletePost(post._id)} src={dotsSvg} alt="" />
        </div>
    )
}
function PostImage({ img }) {
    console.log(img)
    return (
        <div className="post-img-container">
            <img className="post-img" src={img} alt="profile" />
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