(this.webpackJsonpts_cv=this.webpackJsonpts_cv||[]).push([[9],{41:function(e,t,a){"use strict";var r=a(26),i=a(27),n=a(28),c=a.n(n),o=a(0),s=a.n(o),m=a(29),h=a(38),l=s.a.forwardRef((function(e,t){var a=e.bsPrefix,n=e.variant,o=e.size,l=e.active,f=e.className,d=e.block,g=e.type,u=e.as,x=Object(i.a)(e,["bsPrefix","variant","size","active","className","block","type","as"]),b=Object(m.a)(a,"btn"),T=c()(f,b,l&&"active",b+"-"+n,d&&b+"-block",o&&b+"-"+o);if(x.href)return s.a.createElement(h.a,Object(r.a)({},x,{as:u,ref:t,className:c()(T,x.disabled&&"disabled")}));t&&(x.ref=t),g?x.type=g:u||(x.type="button");var v=u||"button";return s.a.createElement(v,Object(r.a)({},x,{className:T}))}));l.displayName="Button",l.defaultProps={variant:"primary",active:!1,disabled:!1},t.a=l},42:function(e,t,a){"use strict";var r=a(26),i=a(27),n=a(28),c=a.n(n),o=a(0),s=a.n(o),m=a(29),h=a(31),l=function(e){return s.a.forwardRef((function(t,a){return s.a.createElement("div",Object(r.a)({},t,{ref:a,className:c()(t.className,e)}))}))},f=a(37),d=s.a.forwardRef((function(e,t){var a=e.bsPrefix,n=e.className,o=e.variant,h=e.as,l=void 0===h?"img":h,f=Object(i.a)(e,["bsPrefix","className","variant","as"]),d=Object(m.a)(a,"card-img");return s.a.createElement(l,Object(r.a)({ref:t,className:c()(o?d+"-"+o:d,n)},f))}));d.displayName="CardImg",d.defaultProps={variant:null};var g=d,u=l("h5"),x=l("h6"),b=Object(h.a)("card-body"),T=Object(h.a)("card-title",{Component:u}),v=Object(h.a)("card-subtitle",{Component:x}),y=Object(h.a)("card-link",{Component:"a"}),p=Object(h.a)("card-text",{Component:"p"}),_=Object(h.a)("card-header"),j=Object(h.a)("card-footer"),R=Object(h.a)("card-img-overlay"),D=s.a.forwardRef((function(e,t){var a=e.bsPrefix,n=e.className,h=e.bg,l=e.text,d=e.border,g=e.body,u=e.children,x=e.as,T=void 0===x?"div":x,v=Object(i.a)(e,["bsPrefix","className","bg","text","border","body","children","as"]),y=Object(m.a)(a,"card"),p=Object(o.useMemo)((function(){return{cardHeaderBsPrefix:y+"-header"}}),[y]);return s.a.createElement(f.a.Provider,{value:p},s.a.createElement(T,Object(r.a)({ref:t},v,{className:c()(n,y,h&&"bg-"+h,l&&"text-"+l,d&&"border-"+d)}),g?s.a.createElement(b,null,u):u))}));D.displayName="Card",D.defaultProps={body:!1},D.Img=g,D.Title=T,D.Subtitle=v,D.Body=b,D.Link=y,D.Text=p,D.Header=_,D.Footer=j,D.ImgOverlay=R;t.a=D},54:function(e,t,a){"use strict";a.r(t),a.d(t,"Projects",(function(){return P}));var r=a(0),i=a.n(r),n=a(26),c=a(27),o=a(28),s=a.n(o),m=a(39),h=a(29),l=a(30),f=i.a.createContext(null);f.displayName="AccordionContext";var d=f;var g=i.a.forwardRef((function(e,t){var a=e.as,o=void 0===a?"button":a,s=e.children,m=e.eventKey,h=e.onClick,f=Object(c.a)(e,["as","children","eventKey","onClick"]),g=function(e,t){var a=Object(r.useContext)(d),i=Object(r.useContext)(l.a);return function(r){i&&i(e===a?null:e,r),t&&t(r)}}(m,h);return"button"===o&&(f.type="button"),i.a.createElement(o,Object(n.a)({ref:t,onClick:g},f),s)})),u=a(46),x=i.a.forwardRef((function(e,t){var a=e.children,o=e.eventKey,s=Object(c.a)(e,["children","eventKey"]),m=Object(r.useContext)(d);return i.a.createElement(u.a,Object(n.a)({ref:t,in:m===o},s),i.a.createElement("div",null,i.a.Children.only(a)))}));x.displayName="AccordionCollapse";var b=x,T=i.a.forwardRef((function(e,t){var a=Object(m.a)(e,{activeKey:"onSelect"}),r=a.as,o=void 0===r?"div":r,f=a.activeKey,g=a.bsPrefix,u=a.children,x=a.className,b=a.onSelect,T=Object(c.a)(a,["as","activeKey","bsPrefix","children","className","onSelect"]),v=s()(x,Object(h.a)(g,"accordion"));return i.a.createElement(d.Provider,{value:f||null},i.a.createElement(l.a.Provider,{value:b||null},i.a.createElement(o,Object(n.a)({ref:t},T,{className:v}),u)))}));T.displayName="Accordion",T.Toggle=g,T.Collapse=b;var v=T,y=a(41),p=a(42),_=(a(33),a(47)),j=a(45),R={variant:void 0,active:!1,disabled:!1},D=i.a.forwardRef((function(e,t){var a=e.bsPrefix,o=e.active,m=e.disabled,f=e.className,d=e.variant,g=e.action,u=e.as,x=e.eventKey,b=e.onClick,T=Object(c.a)(e,["bsPrefix","active","disabled","className","variant","action","as","eventKey","onClick"]);a=Object(h.a)(a,"list-group-item");var v=Object(r.useCallback)((function(e){if(m)return e.preventDefault(),void e.stopPropagation();b&&b(e)}),[m,b]);return i.a.createElement(j.a,Object(n.a)({ref:t},T,{eventKey:Object(l.b)(x||null,T.href),as:u||(g?T.href?"a":"button":"div"),onClick:v,className:s()(f,a,o&&"active",m&&"disabled",d&&a+"-"+d,g&&a+"-action")}))}));D.defaultProps=R,D.displayName="ListGroupItem";var C=D,k={variant:void 0,horizontal:void 0},L=i.a.forwardRef((function(e,t){var a,r=Object(m.a)(e,{activeKey:"onSelect"}),o=r.className,l=r.bsPrefix,f=r.variant,d=r.horizontal,g=r.as,u=void 0===g?"div":g,x=Object(c.a)(r,["className","bsPrefix","variant","horizontal","as"]),b=Object(h.a)(l,"list-group");return a=d?!0===d?"horizontal":"horizontal-"+d:null,i.a.createElement(_.a,Object(n.a)({ref:t},x,{as:u,className:s()(o,b,f&&b+"-"+f,a&&b+"-"+a)}))}));L.defaultProps=k,L.displayName="ListGroup",L.Item=C;var O=L,E=[{TextLeft:"Day 24",TextCenter:"Zimbra:",TextRight:"Deployment",href:"https://github.com/kidfrom/docs/blob/master/EMAIL.md"},{TextLeft:"Day 36",TextCenter:"Odoo ERP:",TextRight:"Deployment",href:"https://github.com/tempatkerja/docker-odoo"},{TextLeft:"Day 86",TextCenter:"JavaScript",TextRight:"Calculator",href:"https://github.com/kidfrom/calculator_js"},{TextLeft:"Day 103",TextCenter:"JavaScript",TextRight:"Sudoku",href:"https://github.com/kidfrom/sudoku_js"},{TextLeft:"Day 108",TextCenter:"React JS with only Local Storage:",TextRight:"Guest List",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/offline-storage/learn_offline-storage"},{TextLeft:"Day 112",TextCenter:"React JS with only Local Storage:",TextRight:"Human Resource Management",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/hrs-mockup/learn_reactjs"},{TextLeft:"Day 117",TextCenter:"Express:",TextRight:"Client-side JWT Authentication",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/jwt"},{TextLeft:"Day 118",TextCenter:"Firebase, Firestore:",TextRight:"Parking Management System",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs-firebase/reactjs_firebase"},{TextLeft:"Day 123",TextCenter:"React-Router-DOM",TextRight:"Routes Config",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_sdr/reactjs_sdr"},{TextLeft:"Day 123",TextCenter:"Atomic Design:",TextRight:"Curriculum Vitae",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_cv/reactjs_cv"},{TextLeft:"Day 124",TextCenter:"Firebase, Firestore, Storage, Cloud Function:",TextRight:"Human Resource Management",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_hrsfirebase/reactjs_hrsfirebase"},{TextLeft:"Day 127",TextCenter:"ReactJS with only Passing State & Props:",TextRight:"Human Resource Management",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_statepropsonly/reactjs_statepropsonly"},{TextLeft:"Day 129",TextCenter:"ReactJS with only Passing State & Props:",TextRight:"Student Management System",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_studentdatabasestate/reactjs_studentdatabasestate"},{TextLeft:"Day 130",TextCenter:"Refactor React Context -> Redux:",TextRight:"Student Database",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_studentredux/reactjs_studentredux"},{TextLeft:"Day 131",TextCenter:"Refactor React Context -> Redux:",TextRight:"Human Resource Management",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_hrsredux/reactjs_hrsredux"},{TextLeft:"Day 135",TextCenter:"Refactor State & Props -> Firebase:",TextRight:"Student Database",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/reactjs_studentfirebase/reactjs_studentfirebase"},{TextLeft:"Day 137",TextCenter:"React Native w/ React-Navigation",href:"https://github.com/kidfrom/g2_react_native/tree/UI_filter_crud"},{TextLeft:"Day 141",TextCenter:"Fetch API:",TextRight:"React Native",href:"https://github.com/kidfrom/g2_react_native/tree/lifecycles/lifecycles"},{TextLeft:"Day 143",TextCenter:"Render Protected Routes:",TextRight:"React-Navigation",href:"https://github.com/kidfrom/g2_react_native/tree/state/state"},{TextLeft:"Day 144",TextCenter:"Redux-Persist:",TextRight:"React Native",href:"https://github.com/kidfrom/g2_react_native/tree/redux-persist/redux-persist"},{TextLeft:"Day 145",TextCenter:"Android Filesystem:",TextRight:"React Native",href:"https://github.com/kidfrom/g2_react_native/tree/storage/storage"},{TextLeft:"Day 148",TextCenter:"Android Camera:",TextRight:"React Native",href:"https://github.com/kidfrom/g2_react_native/tree/camera/camera"},{TextLeft:"Day 151",TextCenter:"Android Google Maps, Geolocation:",TextRight:"GoJek Clone",href:"https://github.com/kidfrom/gojek_clone"},{TextLeft:"Day 155",TextCenter:"Unified Modeling Language:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_1"},{TextLeft:"Day 156",TextCenter:"Encapsulation => Getters and Setters:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_2"},{TextLeft:"Day 157",TextCenter:"Control Flow:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_3"},{TextLeft:"Day 158",TextCenter:"Stack and Heap Memory:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_4"},{TextLeft:"Day 159",TextCenter:"Review Day 155 - 158:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_5"},{TextLeft:"Day 161",TextCenter:"TypeScript:",TextRight:"Curriculum Vitae",href:"https://github.com/kidfrom/bc_g2_learn_reactjs/tree/newcv/ts_cv"},{TextLeft:"Day 162",TextCenter:"Bubble Sort, Binary Search Algorithm:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_6"},{TextLeft:"Day 163",TextCenter:"Extends & Implements:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_7"},{TextLeft:"Day 164",TextCenter:"Regex & Exception Handling:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_8"},{TextLeft:"Day 165",TextCenter:"Normal Threads & ThreadPool:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_9"},{TextLeft:"Day 166",TextCenter:"Review Day 161 - 165:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_10"},{TextLeft:"Day 169",TextCenter:"Socket:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_11"},{TextLeft:"Day 170",TextCenter:"JSON:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_12"},{TextLeft:"Day 171",TextCenter:"JDBC:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_13"},{TextLeft:"Day 172",TextCenter:"FTP:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_14"},{TextLeft:"Day 173",TextCenter:"Review Day 169 - 172 Object Oriented:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_15"},{TextLeft:"Day 175",TextCenter:"@RestController Spring Boot:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_18"},{TextLeft:"Day 177",TextCenter:"Builder Pattern Design:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_19"},{TextLeft:"Day 178",TextCenter:"Review Day 173 - 177:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_20"},{TextLeft:"Day 181",TextCenter:"JdbcTemplate:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_21"},{TextLeft:"Day 182:",TextCenter:"MyBatis:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_22"},{TextLeft:"Day 183",TextCenter:"RabbitMQ:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_23"},{TextLeft:"Day 184",TextCenter:"Redis:",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_24"},{TextLeft:"Day 185",TextCenter:"Completable Future to multi threading the endpoint",TextRight:"Java",href:"https://github.com/kidfrom/g2_java/tree/main/Day_25"}],N=function(){return i.a.createElement(O,{variant:"flush"},i.a.createElement("p",{className:"p-3 mb-0 border-bottom"},i.a.createElement("b",null,"Ongoing progress:"),i.a.createElement("a",{href:"https://github.com/kidfrom/g2_java/tree/main/Bank_Account"},i.a.createElement("p",{className:"mx-3 my-0"},i.a.createElement("br",null),"Day 189 ",i.a.createElement("b",null,"Internet Banking Project")," Java (Spring) and TypeScript (ReactJS)")),i.a.createElement("p",{className:"mx-3 my-0"},"Presentation:"," ",i.a.createElement("a",{href:"https://lnkd.in/gGJ36Pz"},"https://lnkd.in/gGJ36Pz")),i.a.createElement("p",{className:"mx-3 my-0"},"API Documentation:"," ",i.a.createElement("a",{href:"https://lnkd.in/gFYxHAs"},"https://lnkd.in/gFYxHAs")),i.a.createElement("p",{className:"mx-3 my-0"},"To Do: ",i.a.createElement("a",{href:"https://lnkd.in/gHKUnrZ"},"https://lnkd.in/gHKUnrZ")),i.a.createElement("br",null),"Day 0 beginning on April 26th, 2020, the day I discovered GitHub:"),E.map((function(e,t){return i.a.createElement(O.Item,{key:e.TextLeft+t},i.a.createElement("a",{href:e.href},i.a.createElement("p",{className:"mx-3 my-0"},e.TextLeft," ",i.a.createElement("b",null,e.TextCenter)," ",e.TextRight)))})))},P=function(){return i.a.createElement(v,{defaultActiveKey:"0",className:"m-3"},i.a.createElement(p.a,null,i.a.createElement(p.a.Header,null,i.a.createElement(v.Toggle,{as:y.a,variant:"link",eventKey:"0"},"Progress")),i.a.createElement(v.Collapse,{eventKey:"0"},i.a.createElement(N,null))))};t.default=P}}]);
//# sourceMappingURL=9.e48f0716.chunk.js.map