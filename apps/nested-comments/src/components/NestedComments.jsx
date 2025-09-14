import React, { useState } from "react";
import "./NestedComments.css";

function NestedComments() {
  const [comment, setComment] = useState("");
  const [commentsData, setCommentData] = useState([]);
  function handleInputCommentChange(e) {
    if (!e.target.value || e.target.value === "") return;
    setComment(e.target.value);
  }
  function addComment() {
    setCommentData((prev) => {
      return [
        {
          title: comment,
          id: Date.now().toString(),
          isLiked: false,
          children: [],
        },
        ...prev,
      ];
    });
    setComment("");
  }
  function handleReplyCommentChange(replyText, id) {
    setCommentData((prev) => updateReplyData(prev, id, replyText));
  }
  function handleDeleteCommentChange(id) {
    setCommentData((prev) => deleteNode(prev, id));
  }
  function deleteNode(nodes, targetId) {
    // quick top-level check
    const foundTop = nodes.some((n) => n.id === targetId);
    if (foundTop) {
      return nodes.filter((n) => n.id !== targetId); // fast path
    }
    // otherwise recurse (remove from deeper children)
    return nodes.map((n) =>
      n.children?.length
        ? { ...n, children: deleteNode(n.children, targetId) }
        : n
    );
  }
  function updateReplyData(prev, id, replyText) {
    return prev.map((item) => {
      if (item.id === id) {
        const obj = {
          title: replyText,
          id: Date.now().toString(),
          isLiked: false,
          children: [],
        };
        return {
          ...item,
          children: [obj, ...(item.children || [])],
        };
      }
      if (item.children?.length) {
        const newItem = updateReplyData(item.children, id, replyText);
        return { ...item, children: newItem };
      }
      return item;
    });
  }
  function handleKeyUpInput(e) {
    if (!comment || comment === "") return;
    if (e.key === "Enter") {
      addComment();
    }
  }

  return (
    <div className="nestedCommentContainer">
      <AddComment
        comment={comment}
        handleInputCommentChange={handleInputCommentChange}
        addComment={addComment}
        handleKeyUpInput={handleKeyUpInput}
      />
      <div className="nestedCommentSection">
        {commentsData.map((comment, index) => {
          return (
            <Comment
              key={comment.id}
              node={comment}
              index={index}
              level={0}
              handleReplyCommentChange={handleReplyCommentChange}
              handleDeleteCommentChange={handleDeleteCommentChange}
            />
          );
        })}
      </div>
    </div>
  );
}

function AddComment({
  comment,
  handleInputCommentChange,
  addComment,
  handleKeyUpInput,
}) {
  return (
    <div className="commentInputContainer">
      <input
        value={comment}
        name="commentInput"
        id="commentInput"
        onChange={handleInputCommentChange}
        onKeyUp={handleKeyUpInput}
        placeholder="Write a comment..."
      />
      <button disabled={comment.length === 0} onClick={addComment}>
        POST
      </button>
    </div>
  );
}

function Comment({
  node,
  index,
  level,
  handleReplyCommentChange,
  handleDeleteCommentChange,
}) {
  const [replyInput, setReplyInput] = useState("");
  const [isReplySelected, setIsreplySelected] = useState(false);
  const [isLiked, setisLiked] = useState(false);

  function handleKeyUpInput(e, replyInput, id) {
    if (!replyInput || replyInput === "") return;
    if (e.key === "Enter") {
      setReplyInput("");
      setIsreplySelected(false);
      handleReplyCommentChange(replyInput, id);
    }
  }
  function handleReplyAddComment(replyInput, id) {
    setReplyInput("");
    setIsreplySelected(false);
    handleReplyCommentChange(replyInput, id);
  }
  return (
    <div style={{ paddingTop: 10 }}>
      <div className="commentBox">
        <img
          src={
            "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          }
          width={50}
          height={50}
          className="commentMdeia"
        />
        <div className="commentData">
          <p className="commentText">{node.title}</p>
          {!isReplySelected && (
            <div className="likeReplySection">
              <span>Like</span>
              <span
                style={{ marginLeft: "10px" }}
                onClick={() => setIsreplySelected(!isReplySelected)}
              >
                Reply
              </span>
              <span
                style={{ marginLeft: "10px" }}
                onClick={() => handleDeleteCommentChange(node.id)}
              >
                Delete
              </span>
            </div>
          )}
          {isReplySelected && (
            <div className="commentReplyContainer">
              <input
                value={replyInput}
                name={"replyInput" + index}
                id={"replyInput" + index}
                onChange={(e) => setReplyInput(e.target.value)}
                placeholder="Reply to a comment..."
                onKeyUp={(e) => handleKeyUpInput(e, replyInput, node.id)}
              />
              <button
                disabled={replyInput.length === 0}
                onClick={() => handleReplyAddComment(replyInput, node.id)}
              >
                Add
              </button>
              <button onClick={() => setIsreplySelected(!isReplySelected)}>
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="LikedHeartSection">
          <svg
            className={`heart ${isLiked ? "filled" : ""}`}
            viewBox="0 0 24 24"
            width="50"
            height="50"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setisLiked(!isLiked)}
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
       2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
       C13.09 3.81 14.76 3 16.5 3 
       19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>
      </div>

      {node.children?.length > 0 && (
        <div
          className="childrenBox"
          style={{
            paddingLeft: "20px",
            paddingTop: "10px",
            borderLeft: "1px dashed grey",
          }}
        >
          {node.children.map((item, i) => (
            <Comment
              key={item.id ?? index}
              node={item}
              index={i}
              level={level + 1}
              handleReplyCommentChange={handleReplyCommentChange}
              handleDeleteCommentChange={() =>
                handleDeleteCommentChange(item.id)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NestedComments;
