(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{42:function(e,t,a){e.exports=a(90)},47:function(e,t,a){},48:function(e,t,a){},49:function(e,t,a){},60:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){},68:function(e,t,a){},69:function(e,t,a){},86:function(e,t,a){},87:function(e,t,a){},90:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(36),r=a.n(c),s=(a(47),a(2)),l=a(3),i=a(5),u=a(4),h=a(6),m=a(10),d=a(14),b=(a(48),a(49),function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return console.log(this.props.match),o.a.createElement("div",null,"Home Page")}}]),t}(n.Component)),p=a(20);p.initializeApp({apiKey:"AIzaSyAD0ttSvuW22OTa4SidFkKEJx7fBGjFvr0",authDomain:"check-it-out-efcdc.firebaseapp.com",databaseURL:"https://check-it-out-efcdc.firebaseio.com",projectId:"check-it-out-efcdc",storageBucket:"check-it-out-efcdc.appspot.com",messagingSenderId:"407557781729",appId:"1:407557781729:web:05052bbc5c9ac84f"});var f=p,k=(a(60),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handleInputChange=function(e){var t=a.state.isChecked;a.setState({isChecked:!t}),!1===a.state.isChecked?a.props.addFilterCallback(e.target.name):a.props.removeFilterCallback(e.target.name)},a.state={isChecked:!1},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("label",{className:"category-checkbox"},o.a.createElement("input",{name:this.props.name,type:"checkbox",checked:this.state.isChecked,onChange:this.handleInputChange}),this.props.name)}}]),t}(n.Component)),v=(a(61),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onSearchChange=function(e){a.setState({searchText:e.target.value}),a.props.searchBooksCallback(e.target.value)},a.state={searchText:""},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"search-bar-container"},o.a.createElement("label",{className:"search-label"},"Search Books:",o.a.createElement("input",{className:"search-input",placeholder:"Title, author",value:this.state.searchText,onChange:this.onSearchChange})))}}]),t}(n.Component)),g=(a(62),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={categories:[]},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.state.categories;f.firestore().collection("categories").get().then(function(a){a.forEach(function(e){t.push({name:e.data().name,type:e.data().type})});var n=t.map(function(t){return o.a.createElement(k,{key:t.name,name:t.name,type:t.type,addFilterCallback:e.props.addFilterCallback,removeFilterCallback:e.props.removeFilterCallback})});e.setState({categories:n})})}},{key:"render",value:function(){return o.a.createElement("div",{className:"filterpane-container"},o.a.createElement(v,{searchBooksCallback:this.props.searchBooksCallback}),o.a.createElement("div",{className:"categories-container"},o.a.createElement("p",null,"Filter by Category:"),this.state.categories))}}]),t}(n.Component)),E=(a(63),function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"bookitem"},o.a.createElement(m.b,{to:"".concat(this.props.match.url).concat(this.props.title)},this.props.title),o.a.createElement("p",null," ",this.props.author))}}]),t}(n.Component)),O=(a(68),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onAddFilter=function(e){var t=a.state.filters;t.includes(e)||t.push(e),a.setState({filters:t}),a.onFilterResults()},a.onRemoveFilter=function(e){var t=a.state.filters;if(t.includes(e)){var n=t.indexOf(e);-1!==n&&t.splice(n,1)}a.setState({filters:t}),a.onFilterResults()},a.onSearchBooks=function(e){var t=a.state.books,n=[];""!==e?t.forEach(function(t){(t.props.title.toLowerCase().includes(e.toLowerCase())||t.props.author.toLowerCase().includes(e.toLowerCase()))&&n.push(t)}):a.onFilterResults(),a.setState({books:n})},a.onFilterResults=function(e){var t=[],n=f.firestore().collection("books");a.state.filters.forEach(function(e){var t="categories."+e;n=n.where(t,"==",!0)}),n.get().then(function(e){e.forEach(function(e){t.push({title:e.data().title,author:e.data().author})});var n=t.map(function(e){return o.a.createElement(E,Object.assign({},a.props,{key:e.title,title:e.title,author:e.author}))});a.setState({books:n})})},a.state={books:[],defaultBooks:[],filters:[]},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.state.books;f.firestore().collection("books").get().then(function(a){a.forEach(function(e){t.push({title:e.data().title,author:e.data().author})});var n=t.map(function(t){return o.a.createElement(E,Object.assign({},e.props,{key:t.title,title:t.title,author:t.author}))});e.setState({books:n,defaultBooks:n})})}},{key:"render",value:function(){return o.a.createElement("div",{className:"books-container"},o.a.createElement("div",{className:"booklist-container"},o.a.createElement("div",{className:"book-search"},o.a.createElement(m.b,{to:"/addbook/"},"Add a book to the library")),this.state.books),o.a.createElement(g,{addFilterCallback:this.onAddFilter,removeFilterCallback:this.onRemoveFilter,searchBooksCallback:this.onSearchBooks}))}}]),t}(n.Component)),j=(a(69),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={book:{}},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){var e=this;f.firestore().collection("books").doc(this.props.match.params.id).get().then(function(t){t.exists?e.setState({book:t.data()}):console.log("No such document!")}).catch(function(e){console.log("Error getting document:",e)})}},{key:"render",value:function(){return o.a.createElement("div",{className:"show-book-container"},o.a.createElement(m.b,{to:"/books/",className:"back-link"},"Back to book list"),o.a.createElement("div",{className:"book-info"},o.a.createElement("img",{src:this.state.book.thumbnail,alt:this.state.book.title,className:"thumbnail"}),o.a.createElement("h2",{className:"title"},this.state.book.title),o.a.createElement("span",{className:"author"},o.a.createElement("strong",null,this.state.book.author)),o.a.createElement("span",{className:"publish-info"},"Published by: ",this.state.book.publisher,", ",this.state.book.publishedDate),o.a.createElement("span",{className:"description"},this.state.book.description),o.a.createElement("span",{className:"created-by"},o.a.createElement("strong",null,"Book added by:")," ",this.state.book.createdByName?this.state.book.createdByName:"")))}}]),t}(n.Component)),y=a(40),C=a.n(y),N=(a(86),a(87),function(e){var t=e.title,a=e.author,n=e.thumbnail,c=e.description,r=e.addBookCallback;return o.a.createElement("div",{className:"search-results"},o.a.createElement("div",{className:"search-results-image-and-button"},o.a.createElement("img",{src:n,alt:t,className:"search-result-thumbnail"}),o.a.createElement("span",{className:"add-button",onClick:function(){r(e)}},"Add to Library")),o.a.createElement("span",{className:"search-result-title"},t),o.a.createElement("span",{className:"search-result-author"}," ",a),o.a.createElement("span",{className:"search-result-description"},c))}),w="https://www.googleapis.com/books/v1/volumes",S=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).onHandleSearchClick=function(e){e.preventDefault(),a.getBooks()},a.onHandleSearchChange=function(e){a.setState({searchQuery:e.target.value})},a.addBook=function(e){f.firestore().collection("books").doc(e.title).set({title:e.title,author:e.author,thumbnail:e.thumbnail,publishedDate:e.publishedDate,publisher:e.publisher,previewLink:e.previewLink,description:e.description,createdByEmail:f.auth().currentUser.email,createdByName:f.auth().currentUser.displayName}).then(function(){a.setState({shouldRedirect:!0,addedBook:e.title}),console.log("Document successfully written!")}).catch(function(e){console.error("Error writing document: ",e)})},a.getBooks=function(){C.a.get("".concat(w,"?q=").concat(a.state.searchQuery,"&printType=books")).then(function(e){var t=e.data.items.map(function(e){return o.a.createElement(N,{key:e.id,title:e.volumeInfo.title,author:e.volumeInfo.authors?e.volumeInfo.authors[0]:"unknown",publishedDate:e.volumeInfo.publishedDate?e.volumeInfo.publishedDate:"unknown",publisher:e.volumeInfo.publisher?e.volumeInfo.publisher:"Unknown",thumbnail:e.volumeInfo.imageLinks?e.volumeInfo.imageLinks.smallThumbnail:"",description:e.volumeInfo.description?e.volumeInfo.description:"",previewLink:e.volumeInfo.previewLink?e.volumeInfo.previewLink:"",addBookCallback:a.addBook})});a.setState({results:t,movieSearch:"",clickSearch:!0})}).catch(function(e){console.log(e)})},a.state={searchQuery:"",results:[],shouldRedirect:!1,addedBook:""},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return this.state.shouldRedirect?o.a.createElement(d.a,{to:"/books/".concat(this.state.addedBook)}):o.a.createElement("div",{className:"add-book-container"},o.a.createElement("div",{className:"add-book-search-bar"},o.a.createElement("label",null,"Search for a new book:",o.a.createElement("input",{name:"search-api",placeholder:"Title",value:this.state.searchQuery,onChange:this.onHandleSearchChange}),o.a.createElement("span",{onClick:this.onHandleSearchClick,className:"submit-button"},"Search"))),o.a.createElement("div",{className:"search-results-container"},this.state.results))}}]),t}(n.Component),B=a(41);a(88);a(89);var I=f.auth(),F={googleProvider:new f.auth.GoogleAuthProvider};function D(){return o.a.createElement("h2",null,"Users")}var L=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).checkAgainstDatabase=function(e){f.firestore().collection("users").doc(e.email).get().then(function(t){t.exists?console.log("Document data:",t.data()):this.addUserToDatabase(e)}).catch(function(e){console.log("Error getting document:",e)})},a.addUserToDatabase=function(e){f.firestore().collection("users").doc(e.email).set({name:e.displayName,email:e.email}).then(function(){console.log("Document successfully written!")}).catch(function(e){console.error("Error writing document: ",e)}),console.log("No such document!")},a.onSignIn=function(e){var t=new f.auth.GoogleAuthProvider;f.auth().signInWithPopup(t).then(function(e){var t=e.user;a.checkAgainstDatabase(t)}).catch(function(e){console.log(e)})},a.state={authUser:null},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.user,a=e.signOut;return o.a.createElement(m.a,null,o.a.createElement("div",null,o.a.createElement("nav",null,o.a.createElement("div",{className:"login"},t?o.a.createElement("span",{className:"login-span"},"Hello, ",t.displayName):o.a.createElement("span",{className:"login-span"},"Please sign in."),t?o.a.createElement("span",{className:"login-button",onClick:a},"Sign out"):o.a.createElement("span",{className:"login-button",onClick:this.onSignIn},"Sign in with Google")),o.a.createElement("h1",{className:"logo"},"Check It Out"),o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement(m.b,{to:"/"},"Home")),o.a.createElement("li",null,o.a.createElement(m.b,{to:"/books/"},"Full Library")),o.a.createElement("li",null,o.a.createElement(m.b,{to:"/users/"},"Users")))),o.a.createElement("div",{className:"status"}),o.a.createElement(d.d,null,o.a.createElement(d.b,{path:"/",exact:!0,component:b}),o.a.createElement(d.b,{path:"/books/",exact:!0,render:function(e){return o.a.createElement(O,e)}}),o.a.createElement(d.b,{path:"/users/",component:D}),o.a.createElement(d.b,{path:"/books/:id",render:function(e){return o.a.createElement(j,e)}}),o.a.createElement(d.b,{path:"/addbook/",component:S}))))}}]),t}(n.Component),A=Object(B.a)({providers:F,firebaseAppAuth:I})(L);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[42,1,2]]]);
//# sourceMappingURL=main.f283c27a.chunk.js.map