"use strict";(self.webpackChunkespressit_social_media_app=self.webpackChunkespressit_social_media_app||[]).push([[784],{448:function(e,t,s){s(2791);t.Z=s.p+"static/media/close.fabc6ea21c817cc4963edd0088b74410.svg"},7784:function(e,t,s){s.r(t),s.d(t,{default:function(){return f}});var n=s(4165),i=s(2982),o=s(5861),a=s(885),c=s(2791),r=s(4122),l=s(448),d=s(7317),m=s(2672),v=s(184),u=function(e){var t=e.user,s=e.viewing,n=e.handleUpVotePost,i=e.handleDownVotePost,o=e.handleFavoritePost,a=e.handleStopViewingPost,c=s,u=t;return c.whoLiked.includes(u.uid)?(0,v.jsxs)("div",{className:"view-nav-container",children:[(0,v.jsxs)("div",{className:"upvote-downvote-view-container",children:[(0,v.jsx)("img",{id:"svg-upvote",className:"upvote-svg",src:d.Z,alt:"upvote arrow",onClick:function(){return n(s)},"data-testid":"post-upvote-test"}),(0,v.jsx)("p",{className:"vote-counter-text",children:c.likes-c.dislikes>0?c.likes-c.dislikes:0}),(0,v.jsx)("img",{id:"svg-downvote",className:"not-downvoted",src:m.Z,alt:"downvote arrow",onClick:function(){return i(s)},"data-testid":"post-downvote-test"})]}),(0,v.jsx)("img",{className:"favorite-view-svg",src:r.Z,alt:"favorite icon",onClick:function(){return o(c)},"data-testid":"post-favorite-test"}),(0,v.jsxs)("div",{className:"close-view-container",onClick:function(){return a()},children:[(0,v.jsx)("img",{className:"close-view-svg",src:l.Z,alt:"close view icon","data-testid":"post-close-test"}),(0,v.jsx)("p",{className:"close-view-text",children:"Close"})]})]}):c.whoDisliked.includes(u.uid)?(0,v.jsxs)("div",{className:"view-nav-container",children:[(0,v.jsxs)("div",{className:"upvote-downvote-view-container",children:[(0,v.jsx)("img",{id:"svg-upvote",className:"not-upvoted",src:d.Z,alt:"upvote arrow",onClick:function(){return n(s)},"data-testid":"post-upvote-test"}),(0,v.jsx)("p",{className:"vote-counter-text",children:c.likes-c.dislikes>0?c.likes-c.dislikes:0}),(0,v.jsx)("img",{id:"svg-downvote",className:"downvote-svg",src:m.Z,alt:"downvote arrow",onClick:function(){return i(s)},"data-testid":"post-downvote-test"})]}),(0,v.jsx)("img",{className:"favorite-view-svg",src:r.Z,alt:"favorite icon",onClick:function(){return o(c)},"data-testid":"post-favorite-test"}),(0,v.jsxs)("div",{className:"close-view-container",onClick:function(){return a()},children:[(0,v.jsx)("img",{className:"close-view-svg",src:l.Z,alt:"close view icon","data-testid":"post-close-test"}),(0,v.jsx)("p",{className:"close-view-text",children:"Close"})]})]}):(0,v.jsxs)("div",{className:"view-nav-container",children:[(0,v.jsxs)("div",{className:"upvote-downvote-view-container",children:[(0,v.jsx)("img",{id:"svg-upvote",className:"upvote-svg",src:d.Z,alt:"upvote arrow",onClick:function(){return n(s)},"data-testid":"post-upvote-test"}),(0,v.jsx)("p",{className:"vote-counter-text",children:c.likes-c.dislikes>0?c.likes-c.dislikes:0}),(0,v.jsx)("img",{id:"svg-downvote",className:"downvote-svg",src:m.Z,alt:"downvote arrow",onClick:function(){return i(s)},"data-testid":"post-downvote-test"})]}),(0,v.jsx)("img",{className:"favorite-view-svg",src:r.Z,alt:"favorite icon",onClick:function(){return o(c)},"data-testid":"post-favorite-test"}),(0,v.jsxs)("div",{className:"close-view-container",onClick:function(){return a()},children:[(0,v.jsx)("img",{className:"close-view-svg",src:l.Z,alt:"close view icon","data-testid":"post-close-test"}),(0,v.jsx)("p",{className:"close-view-text",children:"Close"})]})]})},h=s(4191),p=s.n(h),x=function(e){var t=e.user,s=e.viewing,n=e.commentList,i=e.handleUpVoteComment,o=e.handleDownVoteComment,a=s,c=t,r=n.sort((function(e,t){return e.likes>t.likes?-1:e.likes<t.likes?1:0}));return(0,v.jsx)("div",{className:"comment-list",children:Array.isArray(r)&&n.map((function(e){return e.whoLiked.includes(c.uid)?(0,v.jsxs)("div",{className:"comment",children:[(0,v.jsxs)("div",{className:"comment-info",children:[(0,v.jsx)("p",{className:"comment-account-time-text",children:(0,v.jsx)("strong",{children:e.account})}),(0,v.jsx)("p",{className:"comment-text",children:e.comment})]}),(0,v.jsxs)("div",{className:"comment-interaction-container",children:[(0,v.jsx)("img",{id:"svg-upvote",className:"upvote-svg",src:d.Z,alt:"upvote arrow",onClick:function(){return i(a,e)},"data-testid":"upvote-test"}),(0,v.jsx)("p",{className:"upvote-count-text",children:e.likes-e.dislikes>0?e.likes-e.dislikes:0}),(0,v.jsx)("img",{id:"svg-downvote",className:"not-downvoted",src:m.Z,alt:"downvote arrow",onClick:function(){return o(a,e)},"data-testid":"downvote-test"})]})]},p()()):e.whoDisliked.includes(c.uid)?(0,v.jsxs)("div",{className:"comment",children:[(0,v.jsxs)("div",{className:"comment-info",children:[(0,v.jsx)("p",{className:"comment-account-time-text",children:(0,v.jsx)("strong",{children:e.account})}),(0,v.jsx)("p",{className:"comment-text",children:e.comment})]}),(0,v.jsxs)("div",{className:"comment-interaction-container",children:[(0,v.jsx)("img",{id:"svg-upvote",className:"not-upvoted",src:d.Z,alt:"upvote arrow",onClick:function(){return i(a,e)},"data-testid":"upvote-test"}),(0,v.jsx)("p",{className:"upvote-count-text",children:e.likes-e.dislikes>0?e.likes-e.dislikes:0}),(0,v.jsx)("img",{id:"svg-downvote",className:"downvote-svg",src:m.Z,alt:"downvote arrow",onClick:function(){return o(a,e)},"data-testid":"downvote-test"})]})]},p()()):(0,v.jsxs)("div",{className:"comment",children:[(0,v.jsxs)("div",{className:"comment-info",children:[(0,v.jsx)("p",{className:"comment-account-time-text",children:(0,v.jsx)("strong",{children:e.account})}),(0,v.jsx)("p",{className:"comment-text",children:e.comment})]}),(0,v.jsxs)("div",{className:"comment-interaction-container",children:[(0,v.jsx)("img",{id:"svg-upvote",className:"upvote-svg",src:d.Z,alt:"upvote arrow",onClick:function(){return i(a,e)},"data-testid":"upvote-test"}),(0,v.jsx)("p",{className:"upvote-count-text",children:e.likes-e.dislikes>0?e.likes-e.dislikes:0}),(0,v.jsx)("img",{id:"svg-downvote",className:"downvote-svg",src:m.Z,alt:"downvote arrow",onClick:function(){return o(a,e)},"data-testid":"downvote-test"})]})]},p()())}))})},w=s(865),j=function(e){var t=e.user,s=(e.viewing,e.handleAddCommentToPost),n=function(e){var t=document.querySelector("#validation-text");t&&(t.textContent="Thank you for contributing! :); your comment was saved.",t.classList.add("text-authenticated"),setTimeout((function(){t.textContent="",t.className=""}),5e3)),s(e)};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{className:"add-comment-container",children:[(0,v.jsx)("textarea",{className:"comment-input",placeholder:"Add Comment"}),(0,v.jsx)("button",{className:"submit-comment-button",type:"button",onClick:function(){return function(){if("string"!==typeof t){var e=new w,s=document.querySelector("#validation-text"),i=document.querySelector(".comment-input").value;if(0===i.trim().length&&s)return s.textContent="Your comment must contain characters and not just white space",s.classList.add("text-not-authenticated"),void setTimeout((function(){s&&(s.textContent="",s.className="")}),5e3);if(i.length<2&&s)return s.textContent="Your comment was ".concat(i.length," character, comments must be at least 2 characters in length"),s.classList.add("text-not-authenticated"),void setTimeout((function(){s&&(s.textContent="",s.className="")}),5e3);if(i.length>1e3&&s)return s.textContent="Your comment was ".concat(i.length," characters, comments cannot exceed our 1000 character limit"),s.classList.add("text-not-authenticated"),void setTimeout((function(){s&&(s.textContent="",s.className="")}),5e3);var o=e.clean(i).trim();n(o)}else alert("only signed in users can leave comments :)")}()},children:"Submit Comment"})]}),(0,v.jsx)("p",{id:"validation-text"})]})},g=s(2426),N=s(9062),f=function(e){var t=e.user,s=e.viewing,r=e.handleUpVotePost,l=e.handleDownVotePost,d=e.handleFavoritePost,m=e.handleStopViewingPost,h=e.handleUpVoteComment,p=e.handleDownVoteComment,w=s,f=t,k=(0,c.useState)({post:s}),C=(0,a.Z)(k,2),Z=(C[0],C[1]),V=(0,g.ZF)({apiKey:"AIzaSyDsPecBa3Ch5uDw4UzHiJWAjKEYOKCrNdA",authDomain:"espressit.firebaseapp.com",projectId:"espressit",storageBucket:"espressit.appspot.com",messagingSenderId:"1094129721341",appId:"1:1094129721341:web:dc2bdc0a2b322504b04394"}),P=(0,N.ad)(V),b=function(e){!function(){var t=(0,o.Z)((0,n.Z)().mark((function t(){var s,o,a,c,r,l,d,m;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return s=(0,N.JU)(P,"users",f.uid),t.next=3,(0,N.QT)(s);case 3:if(!(o=t.sent).exists()){t.next=20;break}return a={account:o.data().username,author:f.uid,comment:e,dislikes:0,likes:1,pid:w.pid,time:(new Date).toLocaleString(),whoDisliked:[],whoLiked:[f.uid]},c=(0,N.JU)(P,"posts",w.pid),t.next=9,(0,N.r7)(c,{comments:[].concat((0,i.Z)(w.comments),[a])});case 9:return w.comments=[].concat((0,i.Z)(w.comments),[a]),Z({post:w}),r=(0,N.JU)(P,"users",f.uid),t.next=14,(0,N.QT)(r);case 14:if(!(l=t.sent).exists()){t.next=19;break}return d=l.data(),m=(0,N.JU)(P,"users",f.uid),t.next=19,(0,N.r7)(m,{comments:[].concat((0,i.Z)(d.comments),[a])});case 19:case 20:case 21:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()};return(0,c.useEffect)((function(){!function(){var e=(0,o.Z)((0,n.Z)().mark((function e(){var t,s,i;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,N.JU)(P,"posts",w.pid),e.next=3,(0,N.QT)(t);case 3:if(!(s=e.sent).exists()){e.next=8;break}return i=s.data(),e.next=8,(0,N.r7)(t,{views:i.views+=1});case 8:case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()();var e=document.querySelector(".create-post-container");return e&&(e.classList.remove("create-post-container"),e.classList.add("hidden-create-post-container")),function(){e&&(e.classList.add("create-post-container"),e.classList.remove("hidden-create-post-container"))}}),[]),0===w.imgURL.length&&0===w.link.length?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(u,{user:t,viewing:s,handleUpVotePost:r,handleDownVotePost:l,handleFavoritePost:d,handleStopViewingPost:m}),(0,v.jsxs)("div",{className:"post-view-container",children:[(0,v.jsx)("div",{className:"post-view",children:(0,v.jsxs)("div",{className:"content-view-container",children:[(0,v.jsx)("h5",{className:"post-account-time",children:"".concat(w.account)}),(0,v.jsx)("h1",{className:"post-view-title",children:w.title}),(0,v.jsx)("h6",{className:"post-view-link",children:w.link}),(0,v.jsx)("h3",{className:"post-view-description",children:w.body}),(0,v.jsx)("p",{className:"post-views-text",children:(0,v.jsxs)("em",{children:[w.views," Views"]})})]})}),(0,v.jsx)(j,{user:t,viewing:s,handleAddCommentToPost:b}),(0,v.jsx)(x,{user:t,viewing:s,commentList:w.comments,handleUpVoteComment:h,handleDownVoteComment:p})]})]}):0===w.imgURL.length&&0!==w.link.length?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(u,{user:t,viewing:s,handleUpVotePost:r,handleDownVotePost:l,handleFavoritePost:d,handleStopViewingPost:m}),(0,v.jsxs)("div",{className:"post-view-container",children:[(0,v.jsx)("div",{className:"post-view",children:(0,v.jsxs)("div",{className:"content-view-container",children:[(0,v.jsx)("h5",{className:"post-account-time",children:"".concat(w.account)}),(0,v.jsx)("h1",{className:"post-view-title",children:w.title}),(0,v.jsx)("a",{className:"post-view-link",href:w.link,children:w.link}),(0,v.jsx)("h3",{className:"post-view-description",children:w.body}),(0,v.jsx)("p",{className:"post-views-text",children:(0,v.jsxs)("em",{children:[w.views," Views"]})})]})}),(0,v.jsx)(j,{user:t,viewing:s,handleAddCommentToPost:b}),(0,v.jsx)(x,{user:t,viewing:s,commentList:w.comments,handleUpVoteComment:h,handleDownVoteComment:p})]})]}):0!==w.imgURL.length&&0===w.link.length?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(u,{user:t,viewing:s,handleUpVotePost:r,handleDownVotePost:l,handleFavoritePost:d,handleStopViewingPost:m}),(0,v.jsxs)("div",{className:"post-view-container",children:[(0,v.jsx)("div",{className:"post-view",children:(0,v.jsxs)("div",{className:"content-view-container",children:[(0,v.jsx)("h5",{className:"post-account-time",children:"".concat(w.account)}),(0,v.jsx)("h1",{className:"post-view-title",children:w.title}),(0,v.jsx)("img",{className:"post-view-img",alt:"user post",src:w.imgURL}),(0,v.jsx)("h3",{className:"post-view-description",children:w.body}),(0,v.jsx)("p",{className:"post-views-text",children:(0,v.jsxs)("em",{children:[w.views," Views"]})})]})}),(0,v.jsx)(j,{user:t,viewing:s,handleAddCommentToPost:b}),(0,v.jsx)(x,{user:t,viewing:s,commentList:w.comments,handleUpVoteComment:h,handleDownVoteComment:p})]})]}):(0,v.jsx)("p",{children:"Error, we're not sure what happened there :/"})}}}]);
//# sourceMappingURL=784.88a1a09f.chunk.js.map