const posts = [];

let currentId = 0;
const $posts = $('.posts');

const createPost = function(text) {
  const post = {
    id: currentId,
    text: text,
    comments: new Array
  }

  currentId ++;
  posts.push(post);
}

const createComment = function(userName, text) {
  const comment = {
    id: currentId,
    text: text,
    user: userName
  }

  currentId ++;
  return comment;
}

const renderPosts = function () {
  $posts.empty();
  for (let i = 0; i < posts.length; i++) {
   let $post =  $('<div class="post" data-id=' + posts[i].id + '><p><a href="#" class="remove-post">Remove</a> ' + posts[i].text + 
    '</p> <div class="comments"></div> <form><input type="text" class="user-name" placeholder="User Name" /><input type="text" class="comment-text form-control" placeholder="Your Comment" /></form></div>');
    addComments($post , posts[i])
    $posts.append($post);
  }
}

const addComments = function (post, currentPost) {
  for (let i = 0; i < currentPost.comments.length; i++) {
    post.find('.comments').append($('<p class="comment" data-id=' + currentPost.comments[i].id + '><a href="#" class="remove-comment">Remove</a> ' +
    currentPost.comments[i].user + ': ' + currentPost.comments[i].text + ' </p>'))
  }
}

const findPost = function (id) {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      return posts[i];
    }
  }
}

const findComment = function (post , commentId) {
  for (let i = 0; i < post.comments.length; i ++) {
    if (commentId === post.comments[i].id) {
      return post.comments[i];
    }
  }
}

const removePost = function (id) {
  const post = findPost(id);
  posts.splice(posts.indexOf(post), 1);
}

const removeComment = function (postId, commentId) {
  const post = findPost(postId);
  const comment = findComment(post, commentId);
  post.comments.splice(post.comments.indexOf(comment), 1);
}

$posts.on("click", ".remove-comment", function() {
  let commentId = $(this).closest('.comment').data('id');
  let postId = $(this).closest('.post').data('id');
  removeComment(postId, commentId);
  renderPosts();
})

$posts.on("click", ".remove-post", function() {
  let id = $(this).closest(".post").data("id");
  removePost(id);
  renderPosts();
})

$(".add-post").on("click", function () {
  let text = $("#post-name").val();
  createPost(text);
  renderPosts();
})

$posts.on("keyup", ".comment-text", function () {
  if (event.keyCode === 13) {
    let id = $(this).closest(".post").data('id');
    let text = $(this).val();
    let user = $(this).closest(".post").find(".user-name").val();
    findPost(id).comments.push(createComment(user, text));
    renderPosts();
  }
})

$(function(){
  $('.posts').sortable();
  $('.posts').disableSelection();
})

// $( function() {
//   $( ".post" ).dialog();
// } );