(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{43:function(e,t,a){e.exports=a(99)},48:function(e,t,a){},49:function(e,t,a){},50:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){},64:function(e,t,a){},69:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){},89:function(e,t,a){},90:function(e,t,a){},91:function(e,t,a){},93:function(e,t,a){},94:function(e,t,a){},95:function(e,t,a){},96:function(e,t,a){},99:function(e,t,a){"use strict";a.r(t);var s=a(0),o=a.n(s),n=a(37),r=a.n(n),c=(a(48),a(2)),i=a(3),l=a(5),u=a(4),d=a(6),m=a(8),h=a(14),p=(a(49),a(50),function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{class:"home-container"},o.a.createElement("h1",null,"Home Page"))}}]),t}(s.Component)),b=a(21);b.initializeApp({apiKey:"AIzaSyAD0ttSvuW22OTa4SidFkKEJx7fBGjFvr0",authDomain:"check-it-out-efcdc.firebaseapp.com",databaseURL:"https://check-it-out-efcdc.firebaseio.com",projectId:"check-it-out-efcdc",storageBucket:"check-it-out-efcdc.appspot.com",messagingSenderId:"407557781729",appId:"1:407557781729:web:05052bbc5c9ac84f"});var g=b,f=(a(61),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleInputChange=function(e){var t=a.state.isChecked;a.setState({isChecked:!t}),!1===a.state.isChecked?a.props.addFilterCallback(e.target.name):a.props.removeFilterCallback(e.target.name)},a.state={isChecked:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("label",{className:"category-button ".concat(this.props.type)},o.a.createElement("input",{name:this.props.name,type:"checkbox",checked:this.state.isChecked,onChange:this.handleInputChange}),this.props.name)}}]),t}(s.Component)),k=(a(62),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).onSearchChange=function(e){a.setState({searchText:e.target.value}),a.props.searchBooksCallback(e.target.value)},a.state={searchText:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"search-bar-container"},o.a.createElement("label",{className:"search-label"},"Search Books:",o.a.createElement("input",{className:"search-input",placeholder:"Title, author",value:this.state.searchText,onChange:this.onSearchChange})))}}]),t}(s.Component)),C=(a(63),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={categories:[]},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.state.categories;g.firestore().collection("categories").get().then(function(a){a.forEach(function(e){t.push({name:e.data().name,type:e.data().type})});var s=t.map(function(t){return o.a.createElement(f,{key:t.name,name:t.name,type:t.type,addFilterCallback:e.props.addFilterCallback,removeFilterCallback:e.props.removeFilterCallback})});e.setState({categories:s})})}},{key:"render",value:function(){return o.a.createElement("div",{className:"filterpane-container"},o.a.createElement(k,{searchBooksCallback:this.props.searchBooksCallback}),o.a.createElement("div",{className:"categories-container"},o.a.createElement("p",null,o.a.createElement("strong",null,"Filter by Category:")),this.state.categories))}}]),t}(s.Component)),v=(a(64),function(e){function t(){var e,a;Object(c.a)(this,t);for(var s=arguments.length,o=new Array(s),n=0;n<s;n++)o[n]=arguments[n];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).onDelete=function(){a.props.deleteBookCallback(a.props.id)},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"bookitem"},o.a.createElement("section",{className:"title-author-container"},o.a.createElement(m.b,{to:"/books/".concat(this.props.id)},this.props.title),o.a.createElement("p",null," ",this.props.author),this.props.submittedBy?o.a.createElement("p",null,"Submitted by: ",this.props.submittedBy):null,"/books/"===this.props.match.url?o.a.createElement("span",{className:"delete-button",onClick:this.onDelete},o.a.createElement("small",null,"Delete from Library")):null),this.props.submittedBy?o.a.createElement("span",null,this.props.noteText):null,o.a.createElement("img",{src:this.props.thumbnail,alt:this.props.title,className:"book-item-thumbnail"}))}}]),t}(s.Component)),E=(a(69),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).deleteBook=function(e){window.confirm("Are you sure you want to delete this book?")&&(g.firestore().collection("books").doc(e).delete().then(function(){a.props.showStatusCallback({type:"success",message:"Successfully deleted book from library!"}),console.log("Document successfully deleted!")}).catch(function(e){console.error("Error removing document: ",e);var t={type:"error",message:e};a.props.showStatusCallback(t)}),a.onFilterResults())},a.compareTitles=function(e,t){var a=e.title.toUpperCase(),s=t.title.toUpperCase(),o=0;return a>s?o=1:a<s&&(o=-1),o},a.onAddFilter=function(e){var t=a.state.filters;t.includes(e)||t.push(e),a.setState({filters:t}),a.onFilterResults()},a.onRemoveFilter=function(e){var t=a.state.filters;if(t.includes(e)){var s=t.indexOf(e);-1!==s&&t.splice(s,1)}a.setState({filters:t}),a.onFilterResults()},a.onSearchBooks=function(e){var t=a.state.books,s=[];""!==e?t.forEach(function(t){(t.props.title.toLowerCase().includes(e.toLowerCase())||t.props.author.toLowerCase().includes(e.toLowerCase()))&&s.push(t)}):a.onFilterResults(),a.setState({books:s})},a.onFilterResults=function(e){var t=[],s=g.firestore().collection("books");a.state.filters.forEach(function(e){var t="categories."+e;s=s.where(t,"==",!0)}),s.get().then(function(e){e.forEach(function(e){t.push({title:e.data().title,author:e.data().author,thumbnail:e.data().thumbnail,id:e.data().id,categories:e.data().categories})}),t.sort(a.compareTitles);var s=a.mapBooks(t);a.setState({books:s})})},a.mapBooks=function(e){return e.map(function(e){return o.a.createElement(v,Object.assign({},a.props,{key:e.id,title:e.title,author:e.author,id:e.id,noteText:e.noteText,thumbnail:e.thumbnail,categories:e.categories,deleteBookCallback:a.deleteBook}))})},a.state={books:[],defaultBooks:[],filters:[]},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.state.books;g.firestore().collection("books").orderBy("title").get().then(function(a){a.forEach(function(e){t.push({title:e.data().title,author:e.data().author,id:e.data().id,thumbnail:e.data().thumbnail,categories:e.data().categories})});var s=e.mapBooks(t);e.setState({books:s,defaultBooks:s})})}},{key:"render",value:function(){return o.a.createElement("div",{className:"books-container"},o.a.createElement("div",{className:"booklist-container"},o.a.createElement("div",{className:"book-search"},o.a.createElement(m.b,{to:"/addbook/"},"Add a book to the library")),this.state.books),o.a.createElement("div",{className:"filter-pane-container"},o.a.createElement(C,Object.assign({},this.props,{addFilterCallback:this.onAddFilter,removeFilterCallback:this.onRemoveFilter,searchBooksCallback:this.onSearchBooks}))))}}]),t}(s.Component)),y=(a(70),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).handleInputChange=function(e){if(a.props.editing){var t=a.state.isChecked;a.setState({isChecked:!t}),a.props.updateSelectedCategoriesCallback(e.target.name,t)}},a.state={isChecked:a.props.selected},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:this.props.hidden?"hidden":"show-categories-container"},o.a.createElement("label",{className:this.state.isChecked?"show-category category-button selected":"show-category category-button unselected"},o.a.createElement("input",{name:this.props.name,type:"checkbox",checked:this.state.isChecked,onChange:this.handleInputChange,className:"checkbox-hidden"}),o.a.createElement("span",{className:this.props.editing?"checkmark":"checkmark hidden"}),this.props.name))}}]),t}(s.Component)),w=(a(71),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).changeNewCategory=function(e){a.setState({newCategory:e.target.value})},a.createNewCategory=function(){g.firestore().collection("categories").doc(a.state.newCategory).set({name:a.state.newCategory}).then(function(){a.props.showStatusCallback({type:"success",message:"Successfully created category!"}),console.log("Document successfully written!");var e=a.state.allCategoryItems;e.unshift(o.a.createElement(y,{key:a.state.newCategory,name:a.state.newCategory,selected:!1,editing:a.state.editing,updateSelectedCategoriesCallback:a.props.updateSelectedCategoriesCallback,recommendationsPage:a.props.recommendationsPage})),a.setState({allCategoryItems:e,newCategory:""})}).catch(function(e){var t={type:"error",message:e};a.props.showStatusCallback(t),console.error("Error writing document: ",e)})},a.listCategories=function(e){var t=[];a.props.selectedCategories.forEach(function(s){t.push(o.a.createElement(y,{key:s,name:s,selected:!0,editing:e,updateSelectedCategoriesCallback:a.props.updateSelectedCategoriesCallback}))});var s=!e;a.props.unselectedCategories.forEach(function(n){t.push(o.a.createElement(y,{key:n,name:n,selected:!1,editing:e,updateSelectedCategoriesCallback:a.props.updateSelectedCategoriesCallback,hidden:s}))}),a.setState({allCategoryItems:t})},a.saveCategories=function(){a.changeEditState(),"/addrec/"===!a.props.match.url&&a.props.saveSelectedCategoriesCallback()},a.editCategories=function(){a.changeEditState()},a.changeEditState=function(){var e=!a.state.editing;a.listCategories(e),a.setState({editing:!a.state.editing})},a.state={allCategoryItems:[],editing:!1,newCategory:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.listCategories(this.state.editing)}},{key:"render",value:function(){return o.a.createElement("div",{className:"categories-container"},o.a.createElement("span",{className:"categories-header"},o.a.createElement("strong",null,"Categories: "),this.state.editing?o.a.createElement("span",{className:"button",onClick:this.saveCategories},"Save"):o.a.createElement("span",{className:"button",onClick:this.editCategories},"Add/Edit")),o.a.createElement("div",{className:this.state.editing?"new-categories":"hidden"},o.a.createElement("span",null,"Don't see the category you want? ",o.a.createElement("span",{className:"create-category-label"},"Create a new category:"),o.a.createElement("input",{name:"add-category",value:this.state.newCategory,onChange:this.changeNewCategory}),o.a.createElement("span",{className:"create-category-submit",onClick:this.createNewCategory},"Create"))),o.a.createElement("div",{className:"category-items-container"},this.state.allCategoryItems))}}]),t}(s.Component)),S=(a(72),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).changeCategoryAssignment=function(e){g.firestore().collection("books").doc(a.props.match.params.id).update({categories:e}).then(function(){a.props.showStatusCallback({type:"success",message:"Successfully updated categories!"})}).catch(function(e){var t={type:"error",message:e};this.props.showStatusCallback(t)})},a.saveSelectedCategories=function(){var e={};a.state.selectedCategories.forEach(function(t){e[t]=!0}),a.changeCategoryAssignment(e)},a.updateSelectedCategories=function(e,t){var s=a.state.selectedCategories,o=a.state.unselectedCategories;if(t){o.push(e);var n=s.filter(function(t){return t!==e});a.setState({unselectedCategories:o,selectedCategories:n})}else{s.push(e);var r=o.filter(function(t){return t!==e});a.setState({selectedCategories:s,unselectedCategories:r})}},a.state={book:{},categories:[],selectedCategories:[],unselectedCategories:[]},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;g.firestore().collection("books").doc(this.props.match.params.id).get().then(function(t){if(t.exists){var a=t.data().categories,s=a?Object.keys(a):[];e.setState({book:t.data(),categories:s})}else{e.props.showStatusCallback({type:"error",message:"Book does not exist"})}}).catch(function(t){var a={type:"error",message:t.message};e.props.showStatusCallback(a),console.log("Error getting document:",t)});var t=[],a=[];g.firestore().collection("categories").get().then(function(s){s.forEach(function(s){e.state.categories.includes(s.data().name)?a.push(s.data().name):t.push(s.data().name)}),e.setState({selectedCategories:a,unselectedCategories:t})})}},{key:"render",value:function(){return this.state.book.title?o.a.createElement("div",{className:"show-book-container"},o.a.createElement("span",{className:"back-link",onClick:this.props.history.goBack},"Go back"),o.a.createElement("div",{className:"book-info"},o.a.createElement("img",{src:this.state.book.thumbnail,alt:this.state.book.title,className:"thumbnail"}),o.a.createElement("h2",{className:"title"},this.state.book.title),o.a.createElement("span",{className:"author"},o.a.createElement("strong",null,this.state.book.author)),o.a.createElement("span",{className:"publish-info"},"Published by: ",this.state.book.publisher,", ",this.state.book.publishedDate),o.a.createElement("span",{className:"description"},this.state.book.description),""!==this.state.book.previewLink?o.a.createElement("a",{className:"preview-link",href:this.state.book.previewLink,target:"blank"},"More info about this book (via Google)"):null,o.a.createElement("span",{className:"created-by"},o.a.createElement("strong",null,"Book added by:")," ",this.state.book.createdByName?this.state.book.createdByName:"")),o.a.createElement("div",{className:"user-note"},o.a.createElement("strong",null,"Notes on this book: "),o.a.createElement("span",{className:"note-text"},this.state.book.noteText)),o.a.createElement("div",{className:"book-categories-container"},this.state.unselectedCategories.length>0||this.state.selectedCategories.length>0?o.a.createElement(w,Object.assign({},this.props,{categories:this.state.categories,selectedCategories:this.state.selectedCategories,unselectedCategories:this.state.unselectedCategories,updateSelectedCategoriesCallback:this.updateSelectedCategories,saveSelectedCategoriesCallback:this.saveSelectedCategories,showStatusCallback:this.props.showStatusCallback})):null)):null}}]),t}(s.Component)),N=a(41),O=a.n(N),j=(a(89),a(90),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).changeNoteText=function(e){a.setState({noteText:e.target.value})},a.state={noteText:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"add-note-full-page"},o.a.createElement("div",{className:"add-note-container"},o.a.createElement("span",{className:"add-note-header"},"Add a note (optional):"),o.a.createElement("textarea",{className:"add-note-textarea",value:this.state.noteText,placeholder:"What do you like about this book?",onChange:this.changeNoteText}),o.a.createElement("div",{className:"buttons-container"},o.a.createElement("span",{className:"button note-button submit-button",onClick:function(){return e.props.addNoteCallback(e.state.noteText)}},"Add Note"),o.a.createElement("span",{className:"button note-button skip-button",onClick:this.props.skipNoteCallback},"Skip"))))}}]),t}(s.Component)),B=(a(91),function(e){var t=e.title,a=e.author,s=e.thumbnail,n=e.description,r=e.addBookCallback;return o.a.createElement("div",{className:"search-results"},o.a.createElement("div",{className:"search-results-image-and-button"},o.a.createElement("img",{src:s,alt:t,className:"search-result-thumbnail"}),o.a.createElement("span",{className:"add-button",onClick:function(){r(e)}},"Add to Library")),o.a.createElement("span",{className:"search-result-title"},t),o.a.createElement("span",{className:"search-result-author"}," ",a),o.a.createElement("span",{className:"search-result-description"},n))}),R="https://www.googleapis.com/books/v1/volumes",A=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).onHandleSearchClick=function(e){e.preventDefault(),a.getBooks()},a.onHandleSearchChange=function(e){a.setState({searchQuery:e.target.value})},a.addBook=function(e){var t=g.firestore().collection("books"),s={};a.props.categoriesSubmitted&&a.props.categoriesSubmitted.forEach(function(e){s[e]=!0}),t.doc(e.id).set({id:e.id,title:e.title,author:e.author,thumbnail:e.thumbnail,publishedDate:e.publishedDate,publisher:e.publisher,previewLink:e.previewLink,description:e.description,createdByEmail:g.auth().currentUser.email,createdByName:g.auth().currentUser.displayName,categories:s}).then(function(){if(console.log("added book"),a.props.hideAddBookCallback)return g.firestore().collection("recommendationRequests").doc(a.props.currentRequest).update({responses:g.firestore.FieldValue.arrayUnion(e.id)}).then(function(){console.log("Document successfully updated!"),a.setState({popUpAddNote:!0,addedBook:e.id})}).catch(function(e){console.error("Error updating document: ",e)});a.setState({shouldRedirect:!0,popUpAddNote:!0,addedBook:e.id});var t={type:"success",message:a.props.hideAddBookCallback?"Successfully added your response to recommendation request!":"Successfully added book to library! Add categories on this page."};a.props.showStatusCallback(t)}).catch(function(e){var t={type:"error",message:e};this.props.showStatusCallback(t)})},a.getBooks=function(){O.a.get("".concat(R,"?q=").concat(a.state.searchQuery,"&printType=books")).then(function(e){var t=e.data.items.map(function(e){return o.a.createElement(B,{key:e.id,id:e.id,title:e.volumeInfo.title,author:e.volumeInfo.authors?e.volumeInfo.authors[0]:"unknown",publishedDate:e.volumeInfo.publishedDate?e.volumeInfo.publishedDate:"unknown",publisher:e.volumeInfo.publisher?e.volumeInfo.publisher:"Unknown",thumbnail:e.volumeInfo.imageLinks?e.volumeInfo.imageLinks.smallThumbnail:"",description:e.volumeInfo.description?e.volumeInfo.description:"",previewLink:e.volumeInfo.previewLink?e.volumeInfo.previewLink:"",addBookCallback:a.addBook})});a.setState({results:t})}).catch(function(e){console.log(e)})},a.addNote=function(e){g.firestore().collection("books").doc(a.state.addedBook).update({noteText:e}).then(function(){console.log(e);var t={type:"success",message:a.props.hideAddBookCallback?"Successfully added your response to recommendation request!":"Successfully added book to library! Add categories on this page."};a.props.showStatusCallback(t),a.props.hideAddBookCallback?(a.setState({popUpAddNote:!1}),a.props.hideAddBookCallback(),window.location.reload()):a.setState({popUpAddNote:!1,shouldRedirect:!0})}).catch(function(e){var t={type:"error",message:e};this.props.showStatusCallback(t)})},a.state={searchQuery:"",results:[],shouldRedirect:!1,addedBook:null,popUpAddNote:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return this.state.shouldRedirect&&!this.state.popUpAddNote?o.a.createElement(h.a,{to:"/books/".concat(this.state.addedBook)}):this.state.popUpAddNote?o.a.createElement("div",{className:"add-book-container"},o.a.createElement(j,{addNoteCallback:this.addNote,skipNoteCallback:this.skipNote}),o.a.createElement("div",{className:"add-book-search-bar"},o.a.createElement("label",null,"/addbook/"===this.props.history.location.pathname?"Search for a new book:":"Add a new book as a response to this recommendation request:",o.a.createElement("input",{name:"search-api",placeholder:"Title",value:this.state.searchQuery,onChange:this.onHandleSearchChange}),o.a.createElement("span",{onClick:this.onHandleSearchClick,className:"button submit-button"},"Search"))),o.a.createElement("div",{className:"search-results-container"},this.state.results)):o.a.createElement("div",{className:"add-book-container"},o.a.createElement("div",{className:"add-book-search-bar"},o.a.createElement("label",null,"/addbook/"===this.props.history.location.pathname?"Search for a new book:":"Add a new book as a response to this recommendation request:",o.a.createElement("input",{name:"search-api",placeholder:"Title",value:this.state.searchQuery,onChange:this.onHandleSearchChange}),o.a.createElement("span",{onClick:this.onHandleSearchClick,className:"button submit-button"},"Search"))),o.a.createElement("div",{className:"search-results-container"},this.state.results))}}]),t}(s.Component),q=a(19),x=(a(93),function(e){function t(){var e,a;Object(c.a)(this,t);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(n)))).formatCategories=function(){return a.props.categories.map(function(e,t){return o.a.createElement("li",{className:"category-button",key:t},e)})},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.dateCreated.toDate(),a=q(t).format("MMM Do YYYY");return o.a.createElement("div",{className:"rec-item-link"},o.a.createElement("div",{className:"rec-item-container"},o.a.createElement("span",{className:"rec-name-date"},o.a.createElement(m.b,{to:"".concat(this.props.match.url).concat(this.props.id)},a,": Submitted by"," ".concat(this.props.requester)),this.props.user.email===this.props.userEmail?o.a.createElement("span",{className:"delete-rec-link",onClick:function(){return e.props.deleteRequestCallback(e.props.id)}},o.a.createElement("small",null,"Delete this request")):null),o.a.createElement("ul",{className:"rec-category-list"},this.formatCategories()),o.a.createElement("span",{className:"responses"},this.props.responses.length," ",1===this.props.responses.length?"response":"responses")))}}]),t}(s.Component)),D=(a(94),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).deleteRequest=function(e){window.confirm("Are you sure you want to delete this request?")&&(console.log("here"),g.firestore().collection("recommendationRequests").doc(e).delete().then(function(){a.props.showStatusCallback({type:"success",message:"Successfully deleted request!"}),window.location.reload()}).catch(function(e){console.error("Error removing document: ",e);var t={type:"error",message:e};a.props.showStatusCallback(t)}))},a.state={recommendationRequests:[]},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=[];g.firestore().collection("recommendationRequests").get().then(function(a){a.forEach(function(e){t.push({id:e.id,user:e.data().user,userEmail:e.data().userEmail,dateCreated:e.data().dateCreated,categories:e.data().categories,responses:e.data().responses})});var s=t.map(function(t){return o.a.createElement(x,Object.assign({},e.props,{key:t.id,id:t.id,requester:t.user,userEmail:t.userEmail,dateCreated:t.dateCreated,categories:t.categories,responses:t.responses,deleteRequestCallback:e.deleteRequest}))});e.setState({recommendationRequests:s})})}},{key:"render",value:function(){return o.a.createElement("div",{className:"recommendations-container"},o.a.createElement("div",{className:"new-recommendation-container"},o.a.createElement(m.b,{to:"/addrec/"},"Request a new recommendation")),this.state.recommendationRequests)}}]),t}(s.Component)),T=(a(95),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).saveSelectedCategories=function(){var e={};a.state.selectedCategories.forEach(function(t){e[t]=!0}),a.changeCategoryAssignment(e)},a.updateSelectedCategories=function(e,t){var s=a.state.selectedCategories,o=a.state.unselectedCategories;if(t){o.push(e);var n=s.filter(function(t){return t!==e});a.setState({unselectedCategories:o,selectedCategories:n})}else{s.push(e);var r=o.filter(function(t){return t!==e});a.setState({selectedCategories:s,unselectedCategories:r})}},a.saveCurrentRecRequest=function(){g.firestore().collection("recommendationRequests").add({user:a.props.user.displayName,userEmail:a.props.user.email,categories:a.state.selectedCategories,note:a.state.noteText,responses:[],dateCreated:g.firestore.FieldValue.serverTimestamp()}).then(function(e){a.props.showStatusCallback({type:"success",message:"Successfully submitted request!"}),a.setState({shouldRedirect:!0,newDoc:e.id})}).catch(function(e){var t={type:"error",message:e};a.props.showStatusCallback(t),console.error("Error writing document: ",e)})},a.updateTextArea=function(e){a.setState({noteText:e.target.value})},a.state={selectedCategories:[],unselectedCategories:[],categories:[],note:"",shouldRedirect:!1,newDoc:null},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=[],a=[];g.firestore().collection("categories").get().then(function(s){s.forEach(function(s){e.state.categories.includes(s.data().name)?a.push(s.data().name):t.push(s.data().name)}),e.setState({selectedCategories:a,unselectedCategories:t})})}},{key:"render",value:function(){return this.state.shouldRedirect&&this.state.newDoc?o.a.createElement(h.a,{to:"/recs/".concat(this.state.newDoc)}):o.a.createElement("div",{className:"add-rec-container"},o.a.createElement("div",{className:"add-rec-instructions"},o.a.createElement("p",null,o.a.createElement("strong",null,"Can't find the kind of book you're looking for in the existing Check It Out library?")),o.a.createElement("p",null,'To request recommendations, select the categories you would like the recommended books to have, and then click the "Submit" button to notify all users that you would like them to add new books that meet your criteria. You may also add a note to further describe the kind of books you\'re looking for.')),o.a.createElement("div",{className:"add-rec-categories-container"},o.a.createElement(w,Object.assign({},this.props,{categories:this.state.categories,selectedCategories:this.state.selectedCategories,unselectedCategories:this.state.unselectedCategories,updateSelectedCategoriesCallback:this.updateSelectedCategories,saveSelectedCategoriesCallback:this.saveSelectedCategories,showStatusCallback:this.props.showStatusCallback}))),o.a.createElement("div",{className:"message-text-area-container"},o.a.createElement("textarea",{className:"message-text-area",value:this.state.noteText,placeholder:"Additional notes",onChange:this.updateTextArea})),o.a.createElement("span",{className:"button save-button",onClick:this.saveCurrentRecRequest},"Submit Request"))}}]),t}(s.Component)),I=(a(96),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).formatCategories=function(){return a.state.recommendationRequest.categories.map(function(e,t){return o.a.createElement("li",{className:"category-button",key:t},e)})},a.mapBooks=function(e){return e.map(function(e){return o.a.createElement(v,Object.assign({},a.props,{key:e.id,title:e.title,author:e.author,id:e.id,thumbnail:e.thumbnail,categories:e.categories,deleteBookCallback:a.deleteBook,noteText:e.noteText,submittedBy:a.state.recommendationRequest.user}))})},a.onShowAddBookPage=function(){a.setState({showAddBook:!0})},a.onHideAddBookPage=function(){a.setState({showAddBook:!1})},a.state={recommendationRequest:{},formattedDate:"",books:[],showAddBook:!1},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;g.firestore().collection("recommendationRequests").doc(this.props.match.params.id).get().then(function(t){if(t.exists){var a=t.data().dateCreated.toDate(),s=q(a).format("MMM Do YYYY"),o=[],n=[],r=g.firestore().collection("books");t.data().responses.length>0?t.data().responses.forEach(function(a){r.where("id","==",a).get().then(function(a){a.forEach(function(e){n.push({title:e.data().title,author:e.data().author,id:e.data().id,thumbnail:e.data().thumbnail,categories:e.data().categories,noteText:e.data().noteText})}),o=e.mapBooks(n),e.setState({recommendationRequest:t.data(),formattedDate:s,books:o})}).catch(function(e){console.log("Error getting documents: ",e)})}):e.setState({recommendationRequest:t.data(),formattedDate:s,books:[]})}else{e.props.showStatusCallback({type:"error",message:"Recommendation request does not exist"})}}).catch(function(t){var a={type:"error",message:t.message};e.props.showStatusCallback(a),console.log("Error getting document:",t)})}},{key:"render",value:function(){return this.state.showAddBook?o.a.createElement("div",null,o.a.createElement("div",{className:"show-recommendation-container"},o.a.createElement("h2",null,"Request Details:"),o.a.createElement("span",{className:"rec-name-date-container"},"Submitted on ".concat(this.state.formattedDate," by ").concat(this.state.recommendationRequest.user),this.state.recommendationRequest.categories?o.a.createElement("ul",{className:"rec-category-list"},this.formatCategories()):null),o.a.createElement("div",{className:"note-container"},this.state.recommendationRequest.note)),o.a.createElement(A,Object.assign({},this.props,{hideAddBookCallback:this.onHideAddBookPage,categoriesSubmitted:this.state.recommendationRequest.categories,currentRequest:this.props.match.params.id}))):this.state.recommendationRequest.user?o.a.createElement("div",null,o.a.createElement("div",{className:"show-recommendation-container"},o.a.createElement("h2",null,"Request Details:"),o.a.createElement("span",{className:"rec-name-date-container"},"Submitted on ".concat(this.state.formattedDate," by ").concat(this.state.recommendationRequest.user),this.state.recommendationRequest.categories?o.a.createElement("ul",{className:"rec-category-list"},this.formatCategories()):null),o.a.createElement("div",{className:"note-container"},this.state.recommendationRequest.note)),o.a.createElement("div",{className:"book-items-container"},o.a.createElement("h2",{className:"show-recommendation-header"},"Responses:"),o.a.createElement("span",{className:"button submit-button",onClick:this.onShowAddBookPage},"Submit a New Book"),this.state.books!==[]?this.state.books:"null")):null}}]),t}(s.Component)),F=a(42);a(97);a(98);var U=g.auth(),L={googleProvider:new g.auth.GoogleAuthProvider};function M(){return o.a.createElement("h2",null,"Users")}var P=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).showNewStatus=function(e){a.setState({statusToShow:{message:e.message,type:e.type}}),setTimeout(a.resetStatus,8e3)},a.resetStatus=function(){a.setState({statusToShow:{message:"",type:"hidden"}})},a.checkAgainstDatabase=function(e){g.firestore().collection("users").doc(e.email).get().then(function(t){t.exists||this.addUserToDatabase(e)}).catch(function(e){console.log("Error getting document:",e)})},a.addUserToDatabase=function(e){g.firestore().collection("users").doc(e.email).set({name:e.displayName,email:e.email}).then(function(){console.log("Document successfully written!")}).catch(function(e){console.error("Error writing document: ",e)}),console.log("No such document!")},a.onSignIn=function(e){var t=new g.auth.GoogleAuthProvider;g.auth().signInWithPopup(t).then(function(e){var t=e.user;a.checkAgainstDatabase(t);a.showNewStatus({type:"success",message:"Successfully logged in"})}).catch(function(e){var t={type:"error",message:e.message};this.showNewStatus(t)})},a.onSignOut=function(){a.props.signOut(),window.confirm("You are now logged out of Check It Out. If you are on a shared computer, please also log out of Google by visiting google.com.")&&(window.location.href="https://www.google.com")},a.state={authUser:null,statusToShow:{message:"",type:"hidden"}},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.user;t.signOut;return o.a.createElement(m.a,null,o.a.createElement("div",null,o.a.createElement("nav",null,o.a.createElement("div",{className:"login"},a?o.a.createElement("span",{className:"login-span"},"Hello, ",a.displayName):o.a.createElement("span",{className:"login-span"},"Please sign in."),a?o.a.createElement("span",{className:"button",onClick:this.onSignOut},"Sign out"):o.a.createElement("span",{className:"button",onClick:this.onSignIn},"Sign in with Google")),o.a.createElement("h1",{className:"logo"},o.a.createElement(m.b,{to:"/"},"Check It Out")),o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement(m.b,{to:"/books/"},"Full Library")),o.a.createElement("li",null,o.a.createElement(m.b,{to:"/recs/"},"Recommendation Requests")))),o.a.createElement("div",{className:"status ".concat(this.state.statusToShow.type)},o.a.createElement("p",null,this.state.statusToShow.message)),o.a.createElement(h.d,null,o.a.createElement(h.b,{path:"/",exact:!0,component:p}),this.props.user?o.a.createElement(h.b,{path:"/books/",exact:!0,render:function(t){return o.a.createElement(E,Object.assign({},t,{showStatusCallback:e.showNewStatus}))}}):"Not logged in",o.a.createElement(h.b,{path:"/users/",component:M}),o.a.createElement(h.b,{path:"/books/:id",render:function(t){return o.a.createElement(S,Object.assign({},t,{showStatusCallback:e.showNewStatus}))}}),o.a.createElement(h.b,{path:"/addbook/",render:function(t){return o.a.createElement(A,Object.assign({},t,{showStatusCallback:e.showNewStatus}))}}),o.a.createElement(h.b,{path:"/recs/",exact:!0,render:function(t){return o.a.createElement(D,Object.assign({},t,e.props,{showStatusCallback:e.showNewStatus}))}}),o.a.createElement(h.b,{path:"/addrec/",render:function(t){return o.a.createElement(T,Object.assign({},t,e.props,{showStatusCallback:e.showNewStatus}))}}),o.a.createElement(h.b,{path:"/recs/:id",render:function(t){return o.a.createElement(I,Object.assign({},t,e.props,{showStatusCallback:e.showNewStatus}))}}))))}}]),t}(s.Component),H=Object(F.a)({providers:L,firebaseAppAuth:U})(P);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[43,1,2]]]);
//# sourceMappingURL=main.8cbc39e3.chunk.js.map