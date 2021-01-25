(()=>{"use strict";const t=document.querySelector(".profile__edit-button"),e=document.querySelector(".profile__add-button"),s=document.forms.editform,i=document.forms.addcardform,r=document.forms.avatarform,n={formSelector:".popup__form",inputSelector:".popup__form-input",submitButtonSelector:".popup__form-submit-button",inactiveButtonClass:"popup__form-submit-button_disabled",inputErrorClass:"popup__form-input_type_error",errorClass:"popup__form-error_visible"};class o{constructor(t,e,s,{handleCardClick:i,handleCardRemove:r,handleLikeClick:n}){this._myID=t,this._data=e,this._title=e.name,this._image=e.link,this._cardSelector=s,this._handleCardClick=i,this._handleCardRemove=r,this._handleLikeClick=n}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}getCardID(){return this._data._id}_isLikedByMe(t){return t.likes.some((t=>t._id===this._myID))}isMy(){return this._data.owner._id===this._myID}refreshLikes(t){this._isLikedByMe(t)?(this.liked=!0,this._enableLike()):(this.liked=!1,this._disableLike()),this._likeCounter=t.likes.length,this._element.querySelector(".card__like-number").textContent=this._likeCounter}_enableLike(){this._like.classList.add("card__like_active")}_disableLike(){this._like.classList.contains("card__like_active")&&this._like.classList.remove("card__like_active")}handleCardRemove(){this._element.remove()}addCard(t,e){t.container.prepend(e)}_setEventListeners(){this._element.querySelector(".card__like").addEventListener("click",(t=>{this._handleLikeClick(t)})),this.isMy()&&this._element.querySelector(".card__trash-button").addEventListener("click",(t=>{this._handleCardRemove(t.target.closest(".card"))})),this._element.querySelector(".card__image").addEventListener("click",(()=>{this._handleCardClick(this._image,this._title)}))}generateCard(){this._element=this._getTemplate(),this._like=this._element.querySelector(".card__like");const t=this._element.querySelector(".card__image");return t.src=this._image,t.alt=this._title,this._element.querySelector(".card__title").textContent=this._title,this.isMy()&&this._element.querySelector(".card__trash-button").classList.remove("card__trash-button_hidden"),this.refreshLikes(this._data),this._setEventListeners(),this._element}}class a{constructor(t,e){this._formElement=e,this._inputList=Array.from(e.querySelectorAll(t.inputSelector)),this._inactiveButtonClass=t.inactiveButtonClass,this._buttonElement=e.querySelector(t.submitButtonSelector),this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass}_enableButton(){this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.removeAttribute("disabled")}_disableButton(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.setAttribute("disabled","")}_hasInvalidInput(){return this._inputList.some((t=>!t.validity.valid))}_toggleButtonState(){this._hasInvalidInput()?this._disableButton():this._enableButton()}_showInputError(t){const e=this._formElement.querySelector(`.${t.id}-error`);t.classList.add(this._inputErrorClass),e.textContent=t.validationMessage,e.classList.add(this._errorClass)}_hideInputError(t){const e=this._formElement.querySelector(`.${t.id}-error`);t.classList.remove(this._inputErrorClass),e.textContent="",e.classList.remove(this._errorClass)}_isValid(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}_setEventListeners(){this._inputList.forEach((t=>{t.addEventListener("input",(()=>{this._isValid(t),this._toggleButtonState()}))}))}enableValidation(){this._setEventListeners(),this._formElement.addEventListener("submit",(t=>{t.preventDefault(),this._disableButton()})),this._toggleButtonState()}}class l{constructor({items:t,renderer:e},s){this._items=t,this._renderer=e.bind(this),this.container=document.querySelector(s)}addItem(t){this._renderer(t)}clear(){this.container.innerHTML=""}renderItems(){this.clear(),this._items.forEach((t=>{this._renderer(t)}))}}class d{constructor(t){this._popup=document.querySelector(t),this._closeButton=this._popup.querySelector(".popup__close-button"),this._handleEscClose=t=>{"Escape"===t.key&&this.close()},this._handleOverlayClose=t=>{t.target.classList.contains("popup")&&this.close()}}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}setEventListeners(){this._popup.addEventListener("click",this._handleOverlayClose),this._closeButton.addEventListener("click",(()=>this.close()))}}class u extends d{constructor(t,{handleFormSubmit:e}){super(t),this._handleFormSubmit=e,this._form=this._popup.querySelector(".popup__form"),this._fields=Array.from(this._form.querySelectorAll(".popup__form-input")),this._submitButton=this._form.querySelector(".popup__form-submit-button")}setInputValues(t){this._fields.forEach((e=>{t[e.name]&&(e.value=t[e.name])}))}setButtonLoading(){this._submitButton.innerHTML="Сохранение...",this._submitButton.classList.add("popup__form-submit-button_loading")}resetButton(){this._submitButton.innerHTML="Сохранить",this._submitButton.classList.remove("popup__form-submit-button_loading")}_getInputValues(){const t={};return this._fields.forEach((e=>t[e.name]=e.value)),t}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(t=>{t.preventDefault();const e=this._getInputValues();this._handleFormSubmit(e)}))}close(){super.close(),this._form.reset(),this.resetButton()}}new a(n,s).enableValidation(),new a(n,i).enableValidation(),new a(n,r).enableValidation();const h=new class{constructor({baseUrl:t,headers:e}){this._baseUrl=t,this._headers=e,this._token=e.authorization}_apiRequest(t,e,s){return"GET"===e?fetch(`${this._baseUrl}${t}`,{method:e,headers:this._headers}).then((t=>t.ok?t.json():Promise.reject(`Ошибка: ${t.status}`))):fetch(`${this._baseUrl}${t}`,{method:e,headers:this._headers,body:JSON.stringify(s)}).then((t=>t.ok?t.json():Promise.reject(`Ошибка: ${t.status}`)))}getUserInfo(){return this._apiRequest("/users/me","GET")}updateUserInfo(t){return this._apiRequest("/users/me","PATCH",{name:t.name,about:t.about})}setNewAvatar(t){return this._apiRequest("/users/me/avatar","PATCH",{avatar:t})}getInitialCards(){return this._apiRequest("/cards","GET")}addNewCard(t){return this._apiRequest("/cards","POST",{name:t.name,link:t.link})}addCardLike(t){return this._apiRequest(`/cards/likes/${t}`,"PUT")}removeCardLike(t){return this._apiRequest(`/cards/likes/${t}`,"DELETE")}removeCard(t){return this._apiRequest(`/cards/${t}`,"DELETE")}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-19",headers:{authorization:"0ea9232f-20d8-4231-b26e-2828aaef49f5","Content-Type":"application/json"}}),_=new class{constructor(t,e,s,{handleEditButton:i}){this._avatar=document.querySelector(t),this._avatarEditIcon=document.querySelector(e),this._handleEditButton=i,this._avatarButtonVisible=s,this._showEditIcon=()=>{this._avatarEditIcon.classList.add(this._avatarButtonVisible)},this._hideEditIcon=t=>{this._avatarEditIcon.classList.remove(this._avatarButtonVisible)}}enableEditButton(){this._avatar.addEventListener("mouseover",this._showEditIcon),this._avatarEditIcon.addEventListener("mouseout",this._hideEditIcon),this._avatarEditIcon.addEventListener("click",this._handleEditButton)}setNewAvatar(t){return new Promise(((e,s)=>{this._avatar.src=t.avatar,this._avatar.onerror=s,this._avatar.onload=e}))}}(".profile__avatar",".profile__avatar-edit-button","profile__avatar-edit-button_visible",{handleEditButton:()=>{c.open()}});_.enableEditButton();const c=new u("#popup-avatar",{handleFormSubmit:t=>{c.setButtonLoading(),h.setNewAvatar(t.avatar).then((t=>{_.setNewAvatar(t)})).then((()=>{c.close()})).catch((t=>{console.log(`Почему-то не получилось обновить аватар: ${t}`),c.resetButton()}))}});c.setEventListeners();const p=new u("#popup-profile",{handleFormSubmit:t=>{p.setButtonLoading(),h.updateUserInfo(t).then((t=>{C.setUserInfo(t)})).then((()=>{p.close()})).catch((t=>{console.log(`Почему-то не получилось установить пользователя: ${t}`),p.resetButton()}))}});p.setEventListeners(),t.addEventListener("click",(function(){p.setInputValues(C.getUserInfo()),p.open()}));const m=new u("#popup-addcard",{handleFormSubmit:t=>{t.name=t.place,delete t.place,m.setButtonLoading(),h.addNewCard(t).then((t=>{L.addItem(t)})).then((()=>{m.close()})).catch((t=>{console.log(`Почему-то не получилось создать новую карточку: ${t}`),m.resetButton()}))}});m.setEventListeners(),e.addEventListener("click",(function(){m.open()}));const v=new class extends u{constructor(t,{handleFormSubmit:e}){super(t,{handleFormSubmit:e})}open(t){super.open(),this._data=t}resetButton(){this._submitButton.innerHTML="Да",this._submitButton.classList.remove("popup__form-submit-button_loading")}close(){super.close(),this.resetButton()}setEventListeners(){this._popup.addEventListener("click",this._handleOverlayClose),this._closeButton.addEventListener("click",(()=>this.close())),this._form.addEventListener("submit",(t=>{t.preventDefault(),this._handleFormSubmit(this._data)}))}}("#popup-delete-card",{handleFormSubmit:({card:t,id:e})=>{v.setButtonLoading(),h.removeCard(e).then((()=>{t.handleCardRemove()})).then((()=>{v.close()})).catch((t=>{console.log(`Почему-то не получилось удалить карточку: ${t}`),v.resetButton()}))}});v.setEventListeners();const b=new class extends d{constructor(t,e,s){super(t),this._popupPicture=this._popup.querySelector(e),this._popupTitle=this._popup.querySelector(s)}open(t,e){this._popupPicture.src=t,this._popupPicture.alt=e,this._popupTitle.textContent=e,super.open()}}("#popup-bigpicture",".popup__picture",".popup__pic-title");b.setEventListeners();let E="",L={};const C=new class{constructor(t,e){this._name=document.querySelector(t),this._about=document.querySelector(e)}getUserInfo(){const t={};return t.name=this._name.textContent,t.about=this._about.textContent,t}setUserInfo(t){this._name.textContent=t.name,this._about.textContent=t.about}}(".profile__name",".profile__about");Promise.all([h.getUserInfo(),h.getInitialCards()]).then((t=>(C.setUserInfo(t[0]),_.setNewAvatar(t[0]),E=t[0]._id,t[1]))).then((t=>{L=new l({items:t,renderer:t=>{const e=new o(E,t,".tempcard",{handleCardClick:(t,e)=>{b.open(t,e)},handleCardRemove:()=>{const t=e.getCardID();v.open({card:e,id:t})},handleLikeClick:t=>{e.liked?h.removeCardLike(e.getCardID()).then((t=>{e.refreshLikes(t)})).catch((t=>{console.log(`Почему-то не получилось удалить лайк: ${t}`)})):h.addCardLike(e.getCardID()).then((t=>{e.refreshLikes(t)})).catch((t=>{console.log(`Почему-то не получилось поставить лайк: ${t}`)}))}}),s=e.generateCard();e.addCard(L,s)}},".cards__list"),L.renderItems()}))})();