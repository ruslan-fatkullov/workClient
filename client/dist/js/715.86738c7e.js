"use strict";(self["webpackChunkwork_project"]=self["webpackChunkwork_project"]||[]).push([[715],{6715:function(s,i,t){t.r(i),t.d(i,{default:function(){return A}});var e=t(3396),a=t(9242),o=t(7139);const r=s=>((0,e.dD)("data-v-b5a9a26e"),s=s(),(0,e.Cn)(),s),l=r((()=>(0,e._)("label",{for:"first-name"},"Имя",-1))),n=r((()=>(0,e._)("label",{for:"last-name"},"Фамилия",-1))),d=r((()=>(0,e._)("label",{for:"email"},"Email",-1))),p=["disabled"],m=r((()=>(0,e._)("label",{for:"password"},"Пароль",-1))),u=["disabled"],w=r((()=>(0,e._)("label",{for:"confirm-password"},"Повторите пароль",-1))),c={class:"resultString"},g={key:0},h={key:3,class:"spinner-border",style:{"margin-bottom":"10px"},role:"status"},f=r((()=>(0,e._)("span",{class:"sr-only"},null,-1))),_=[f],v=["disabled"],b={class:"signup-link"};function y(s,i,t,r,f,y){const k=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)("form",{class:"login-form",onSubmit:i[9]||(i[9]=(0,a.iM)((s=>y.login()),["prevent"]))},[(0,e._)("h2",null,(0,o.zw)(f.isLoginMode?"Авторизация":"Регистрация"),1),f.isLoginMode?(0,e.kq)("",!0):((0,e.wg)(),(0,e.iD)("div",{key:0,class:(0,o.C_)(["form-group",{active_label_style:f.firstName}])},[l,(0,e.wy)((0,e._)("input",{"onUpdate:modelValue":i[0]||(i[0]=s=>f.firstName=s),type:"text",class:"form-control",id:"first-name",name:"first-name",required:""},null,512),[[a.nr,f.firstName]])],2)),f.isLoginMode?(0,e.kq)("",!0):((0,e.wg)(),(0,e.iD)("div",{key:1,class:(0,o.C_)(["form-group",{active_label_style:f.lastName}])},[n,(0,e.wy)((0,e._)("input",{"onUpdate:modelValue":i[1]||(i[1]=s=>f.lastName=s),type:"text",class:"form-control",id:"last-name",name:"last-name",required:""},null,512),[[a.nr,f.lastName]])],2)),(0,e._)("div",{class:(0,o.C_)(["form-group",{active_label_style:f.email}])},[d,(0,e.wy)((0,e._)("input",{"onUpdate:modelValue":i[2]||(i[2]=s=>f.email=s),type:"email",placeholder:" ",class:"form-control",id:"email",name:"email",disabled:f.isRequest,required:""},null,8,p),[[a.nr,f.email]])],2),(0,e._)("div",{class:(0,o.C_)(["form-group pass",{active_label_style:f.password}]),ref:"validation_result"},[m,(0,e.wy)((0,e._)("input",{onKeyup:i[3]||(i[3]=s=>y.validate()),"onUpdate:modelValue":i[4]||(i[4]=s=>f.password=s),type:"password",class:"form-control",ref:"password",id:"password",name:"password",disabled:f.isRequest,required:""},null,40,u),[[a.nr,f.password]]),(0,e._)("div",{ref:"password_control",onClick:i[5]||(i[5]=s=>y.viewPassword()),class:"password-control"},null,512),(0,e._)("p",null,(0,o.zw)(f.passwordTips),1)],2),f.isLoginMode?(0,e.kq)("",!0):((0,e.wg)(),(0,e.iD)("div",{key:2,class:(0,o.C_)(["form-group",{active_label_style:f.password_confirmation}])},[w,(0,e.wy)((0,e._)("input",{"onUpdate:modelValue":i[6]||(i[6]=s=>f.password_confirmation=s),type:"password",class:"form-control",ref:"password_confirm",id:"confirm-password",name:"confirm-password",required:""},null,512),[[a.nr,f.password_confirmation]])],2)),(0,e._)("div",c,[f.isActiveResultString?((0,e.wg)(),(0,e.iD)("p",g,(0,o.zw)(f.resultString),1)):(0,e.kq)("",!0)]),f.loading?((0,e.wg)(),(0,e.iD)("div",h,_)):(0,e.kq)("",!0),(0,e._)("button",{type:"submit",class:"main_button login_button",disabled:f.isRequest},(0,o.zw)(f.isLoginMode?"Войти":"Зарегистрироваться"),9,v),f.sendEmailAgain?((0,e.wg)(),(0,e.iD)("button",{key:4,onClick:i[7]||(i[7]=s=>y.sendEmailConfirmLink()),class:"main_button login_button",style:{"margin-top":"5px"}}," Отправить ссылку на подтверждение повторно ")):(0,e.kq)("",!0),f.isLoginMode?((0,e.wg)(),(0,e.j4)(k,{key:5,class:"forgot-password",to:"/forgotPassword",exact:""},{default:(0,e.w5)((()=>[(0,e.Uk)("Забыли пароль?")])),_:1})):(0,e.kq)("",!0),(0,e._)("div",b,[(0,e.Uk)((0,o.zw)(f.isLoginMode?"Нет аккаунта?":"Уже есть аккаунт?")+" ",1),(0,e._)("a",{class:"",onClick:i[8]||(i[8]=s=>y.changeMode()),exact:""},(0,o.zw)(f.isLoginMode?"Зарегистрируйтесь":"Войти"),1)])],32)}var k=t(576),L={data(){return{isLoginMode:!0,firstName:"",lastName:"",email:"",password:"",password_confirmation:"",resultString:"",isActiveResultString:!0,viewInput:!0,sendEmailAgain:!1,loading:!1,isRequest:!1,isValidPassword:!1,passwordTips:""}},methods:{changeMode(){this.isLoginMode=!this.isLoginMode,this.passwordTips="",this.resultString="",this.email="",this.password="",this.firstName="",this.lastName="",this.password_confirmation=""},login(){if(this.isLoginMode){if(this.resultString="",this.loading=!0,this.isRequest=!0,""===this.email||""===this.password)return this.loading=!1,this.isRequest=!1,this.resultString="Заполните все поля",void(this.isActive=!0);k.Z.dispatch("loginUser",{email:this.email,password:this.password}).then((()=>{this.isRequest=!1,this.resultString=k.Z.getters.getLoginResultMessage,this.loading=!1,"not confirmed"===k.Z.getters.getLoginStatus&&(this.sendEmailAgain=!0,this.viewInput=!1),k.Z.dispatch("getUserByEmailAction")}))}else{if(!this.isValidPassword)return;this.loading=!0,k.Z.dispatch("registerUser",{firstName:this.firstName,lastName:this.lastName,email:this.email,password:this.password,password_confirmation:this.password_confirmation}).then((()=>{this.loading=!1,this.isActive=!0,this.resultString=k.Z.getters.getRegResultString})).catch((()=>{console.log("Ошибка")}))}},sendEmailConfirmLink(){k.Z.dispatch("sendEmailConfirmLink",{email:this.email}).then((()=>{this.resultString=k.Z.getters.getLoginResultMessage}))},validate(){if(!this.isLoginMode){if(this.$refs.validation_result.classList.remove("valid_pass"),this.isValidPassword=!1,0===this.password.length)return void(this.passwordTips="");let s=/^.{8,}$/;if(!s.test(this.password))return void(this.passwordTips="Пароль меньше 8 символов");let i=/^(?=.*?[A-Z]).{8,}$/;if(!i.test(this.password))return void(this.passwordTips="Пароль не содержит заглавных букв");let t=/^(?=.*?[a-z]).{8,}$/;if(!t.test(this.password))return void(this.passwordTips="Пароль не содержит строчных букв");let e=/^(?=.*?[0-9]).{8,}$/;if(!e.test(this.password))return void(this.passwordTips="Пароль не содержит цифр");this.$refs.validation_result.classList.add("valid_pass"),this.passwordTips="Пароль надежный",this.isValidPassword=!0}},viewPassword(){"password"==this.$refs.password.getAttribute("type")?(this.$refs.password_control.classList.add("view"),this.$refs.password.setAttribute("type","text"),this.$refs.password_confirm.setAttribute("type","text")):(this.$refs.password_control.classList.remove("view"),this.$refs.password.setAttribute("type","password"),this.$refs.password_confirm.setAttribute("type","password"))}}},q=t(89);const M=(0,q.Z)(L,[["render",y],["__scopeId","data-v-b5a9a26e"]]);var A=M}}]);
//# sourceMappingURL=715.86738c7e.js.map