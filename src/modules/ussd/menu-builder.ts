import UssdMenuBuilder from 'ussd-menu-builder'
import {menuPicker as menuService} from './menu-picker'
import { fetchComprehensiveMotor, fetchComprehensiveMotorByID, fetchThirdPartyMotor, fetchThirdPartyMotorByID } from './operations/general.Insurance';

export let menu = new UssdMenuBuilder()

let sessions = {};
menu.sessionConfig({
    start: function (sessionId, key) {
        return new Promise((resolve, reject) => {
            if (!(sessionId in sessions)) sessions[sessionId] = {};
            resolve("");
        });
    },
    set: (sessionId, key, value, callback) => {
        // store key-value pair in current session
        return new Promise((resolve, reject) => {
            sessions[sessionId][key] = value;
            callback();
        });
    },
    get: function (sessionId, key) {
        return new Promise((resolve, reject) => {
            let value = sessions[sessionId][key];
            resolve(value);
        });
    },
    end: function (sessionId, callback) {
        // clear current session
        // this is called by menu.end()
        return new Promise((resolve, reject) => {
            delete sessions[sessionId];
            callback();
        });
    }
});

menu.startState({
  run: () => {
    menu.con(menuService.getMenu('user_exists', '1'))
  },
  next: menuService.getMenuTags('user_exists', '1')
});
 
menu.state('back_to_main', {
    run: () => {
      // CLEAR SESSION
      menu.session.set('route', null)
      menu.session.set('route-sub', null)
      menu.session.set('route-sub-id', null)
      menu.session.set('route-id', null)
      menu.con(menuService.getMenu('choose_service', '2'))
    },
    next: menuService.getMenuTags('choose_service', '2')
});

menu.state('entry.pin', {
    run: () => { 
      //TODO: validate pin 
      menu.con(menuService.getMenu('choose_service', '2'))
    },
    next: menuService.getMenuTags('choose_service', '2')
});

// menu.state('insure', {
//   run: () => {
//       menu.con(menuService.getMenu('insure', '3'))
//   },
//   next: menuService.getMenuTags('insure', '3')
// });
// menu.state('invest', {
//   run: () => {
//       menu.con(menuService.getMenu('invest', '3'))
//   },
//   next: menuService.getMenuTags('invest', '3')
// });
menu.state('my_portfolio', {
  run: () => {
      menu.session.set('route', null)
      menu.con(menuService.getMenu('my_portfolio', '3'))
  },
  next: menuService.getMenuTags('my_portfolio', '3')
});

menu.state('my_general_insurance', {
  run: () => {
    menu.session.set('route', 'my_general_insurance')
    menu.con(menuService.getMenu('my_general_insurance', '4'))
  },
  next: menuService.getMenuTags('my_general_insurance', '4')
});
menu.state('products_display', {
 run:()=>{
 
   menu.session.get('route').then(route =>{
    console.log("Route is: ", route);
    const selected = menu.val;
    menu.session.set('route-id', selected)
    // FETCH OPERATION
    routeHandler[route][selected].fetch("phone", "name").then(res => {
      menu.session.set('res', res)
      const len = res.length
      if(len === 0){
        // TODO Display user has no policy
        console.log("user has no policy");
        
      } else {
  
        if(len === 1){
          console.log("go to products_display_one");
         // console.log(menu);
       //   menu[menu.args.phoneNumber]='products_display_one';
          menu.session.set('short-circuit',1)
          .then(menu.go('products_display_one'))
         
          
          
         // menu.runState(menu.states.find(state =>state.name='products_display_one' ));
        // menu.runState(menu.states['products_display_one'] );
          

        } else {
          console.log("go to products_display_many");
        //  console.log(menu);
        //  menu[menu.args.phoneNumber]='products_display_many';
          menu.go('products_display_many');
        //  menu.runState(menu.states['products_display_many'] );
        }
  
      }
    })
  });
  

  
 },
 next:  {...menuService.getMenuTags('products_display_one', '5'), ...menuService.getMenuTags('products_display_many', '5') } 
});
menu.state('products_display_one', {
  run: () => {

    menu.session.get('route').then(route =>{
    menu.session.get('route-id').then(routeID =>{
      menu.session.get('short-circuit').then(shortCircuit =>{
      const selected = menu.val;
      console.log("selected", selected,shortCircuit);
       menu.session.get('res').then(res =>{
        
        if(shortCircuit){//from short circuit
          console.log("from short circuit - only one item", selected,shortCircuit);
          menu.session.set('short-circuit',false);
          res =res[0];
        
        }else{  //from multi screen
          console.log("from multi screen", selected);
          res =res[parseInt(selected)-1];
    
        }
       
        console.log("DID IT", res);
        menu.con(menuService.getMenuFunctionTitle(
           routeHandler[route][routeID].label,
            res,
            'products_display_one',
            "5"
          ))
        });
        });
      });
     
    });
 
},
next: menuService.getMenuTags('products_display_one', '5')
});
menu.state('products_display_many', {
  run: () => {

    menu.session.get('route').then(route =>{
      menu.session.get('route-id').then(routeID =>{
    const selected = menu.val;
    menu.session.get('res').then(res =>{

      console.log("DID IT", res);
    menu.con(menuService.getMenuFunctionTitle(
       routeHandler[route][routeID].label,
        res,
        'products_display_many',
        "5"
      ))

    });
    
  });
});
  },
  next: menuService.getMenuTags('products_display_many', '5')

});

const routeHandler = {
  "my_general_insurance": {
    "1": {
      product: "Third Party Motor",
      label: "third_party_motor",
      fetch: fetchThirdPartyMotor,
      fetchID: fetchThirdPartyMotorByID
    },
    "2": {
      product: "Comprehensive Motor",
      label: "comprehensive_motor",
      fetch: fetchComprehensiveMotor,
      fetchID: fetchComprehensiveMotorByID
    }
  }
}
